'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import Step1Basics from './Step1Basics';
import Step2Audience from './Step2Audience';
import Step3Voice from './Step3Voice';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type ProductFormData = {
  productName: string;
  tagline: string;
  websiteUrl: string;
  industry: string;
  description: string;
  targetAudience: string;
  audienceRole: string;
  stage: string;
  differentiators: string;
  painPoints: string;
  tone: string;
  channels: string[];
  contentGoal: string;
};

const steps = [
  { key: 'step-basics', label: 'Basics', description: 'Product identity' },
  { key: 'step-audience', label: 'Audience', description: "Who you\'re targeting" },
  { key: 'step-voice', label: 'Voice & Channels', description: 'Tone and distribution' },
];

export default function ProductSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [existingId, setExistingId] = useState<string | null>(null);
  const { user } = useAuth();
  const supabase = createClient();

  const form = useForm<ProductFormData>({
    mode: 'onBlur',
    defaultValues: {
      productName: '', tagline: '', websiteUrl: '', industry: 'developer-tools',
      description: '', targetAudience: '', audienceRole: 'developer', stage: 'beta',
      differentiators: '', painPoints: '', tone: 'confident',
      channels: ['linkedin', 'twitter'], contentGoal: 'drive-signups',
    },
  });

  // Ensure user_profiles row exists (required by FK constraint on product_setup)
  const ensureUserProfile = useCallback(async () => {
    if (!user) return false;
    try {
      const { data: existing } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (!existing) {
        const { error } = await supabase.from('user_profiles').insert({
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          avatar_url: user.user_metadata?.avatar_url || '',
        });
        if (error && error.code !== '23505') {
          // 23505 = unique_violation (already exists, safe to ignore)
          console.log('Profile ensure error:', error.message);
          return false;
        }
      }
      return true;
    } catch (err: any) {
      console.log('Profile ensure error:', err.message);
      return false;
    }
  }, [user, supabase]);

  useEffect(() => {
    const loadExistingSetup = async () => {
      if (!user) { setIsLoading(false); return; }
      try {
        const { data, error } = await supabase
          .from('product_setup')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.log('Product setup load error:', error.message);
        }

        if (data) {
          setExistingId(data.id);
          form.reset({
            productName: data.product_name || '',
            tagline: data.tagline || '',
            websiteUrl: data.website_url || '',
            industry: data.industry || 'developer-tools',
            description: data.description || '',
            targetAudience: data.target_audience || '',
            audienceRole: data.audience_role || 'developer',
            stage: data.stage || 'beta',
            differentiators: data.differentiators || '',
            painPoints: data.pain_points || '',
            tone: data.tone || 'confident',
            channels: data.channels || ['linkedin', 'twitter'],
            contentGoal: data.content_goal || 'drive-signups',
          });
        }
      } catch (err: any) {
        console.log('Product setup load error:', err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadExistingSetup();
  }, [user]);

  // Save current step data to Supabase (partial save / auto-persist)
  const saveProgress = useCallback(async (data: ProductFormData) => {
    if (!user) return;
    try {
      const profileOk = await ensureUserProfile();
      if (!profileOk) return;

      const payload = {
        user_id: user.id,
        product_name: data.productName,
        tagline: data.tagline,
        website_url: data.websiteUrl,
        industry: data.industry,
        description: data.description,
        target_audience: data.targetAudience,
        audience_role: data.audienceRole,
        stage: data.stage,
        differentiators: data.differentiators,
        pain_points: data.painPoints,
        tone: data.tone,
        channels: data.channels,
        content_goal: data.contentGoal,
      };

      if (existingId) {
        const { error } = await supabase
          .from('product_setup')
          .update(payload)
          .eq('id', existingId);
        if (error) console.log('Auto-save error:', error.message);
      } else {
        const { data: inserted, error } = await supabase
          .from('product_setup')
          .insert(payload)
          .select('id')
          .single();
        if (error) {
          console.log('Auto-save insert error:', error.message);
        } else if (inserted) {
          setExistingId(inserted.id);
        }
      }
    } catch (err: any) {
      console.log('Auto-save error:', err.message);
    }
  }, [user, existingId, ensureUserProfile, supabase]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof ProductFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ['productName', 'tagline', 'industry', 'description'];
    if (currentStep === 1) fieldsToValidate = ['targetAudience', 'stage', 'differentiators'];
    const valid = await form.trigger(fieldsToValidate);
    if (valid) {
      // Auto-save progress when advancing steps
      await saveProgress(form.getValues());
      setCurrentStep(s => s + 1);
    }
  };

  const handleBack = () => setCurrentStep(s => s - 1);

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!user) { toast.error('You must be logged in to save your product profile.'); return; }
    setIsSubmitting(true);
    try {
      const profileOk = await ensureUserProfile();
      if (!profileOk) {
        toast.error('Could not verify your account. Please try again.');
        return;
      }

      const payload = {
        user_id: user.id,
        product_name: data.productName,
        tagline: data.tagline,
        website_url: data.websiteUrl,
        industry: data.industry,
        description: data.description,
        target_audience: data.targetAudience,
        audience_role: data.audienceRole,
        stage: data.stage,
        differentiators: data.differentiators,
        pain_points: data.painPoints,
        tone: data.tone,
        channels: data.channels,
        content_goal: data.contentGoal,
      };

      if (existingId) {
        const { error } = await supabase
          .from('product_setup')
          .update(payload)
          .eq('id', existingId);
        if (error) throw error;
      } else {
        const { data: inserted, error } = await supabase
          .from('product_setup')
          .insert(payload)
          .select('id')
          .single();
        if (error) throw error;
        setExistingId(inserted.id);
      }

      setCompleted(true);
      toast.success(`Product profile saved! Your AI content will now be tailored to ${data.productName}.`);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save product profile.');
    } finally {
      setIsSubmitting(false);
    }
  });

  if (isLoading) {
    return (
      <div className="rounded-[14px] p-10 text-center" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <Loader2 size={24} className="animate-spin mx-auto" style={{ color: '#8a8a8a' }} />
        <p className="text-[13px] mt-3" style={{ color: '#8a8a8a' }}>Loading your product profile…</p>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="rounded-[14px] p-10 text-center slide-up" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)' }}
        >
          <Check size={28} style={{ color: '#4ade80' }} />
        </div>
        <h2 className="text-[20px] font-bold mb-2" style={{ color: '#ededed' }}>Profile saved!</h2>
        <p className="text-[13px] mb-6 max-w-sm mx-auto" style={{ color: '#8a8a8a' }}>
          FounderMark now knows your product, audience, and voice. Head to the Content Generator to create your first batch.
        </p>
        <a href="/content-generator" className="btn-primary text-[13px] inline-flex items-center gap-2">
          Generate Content Now <ChevronRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="rounded-[14px] p-5" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, i) => (
            <React.Fragment key={step.key}>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-200"
                  style={{
                    background: i < currentStep ? '#ededed' : i === currentStep ? '#ededed' : '#1f1f1f',
                    color: i <= currentStep ? '#0a0a0a' : '#8a8a8a',
                    boxShadow: i === currentStep ? '0 0 0 4px rgba(237,237,237,0.1)' : 'none',
                  }}
                >
                  {i < currentStep ? <Check size={13} /> : i + 1}
                </div>
                <div className="hidden sm:block">
                  <p className="text-[12px] font-semibold" style={{ color: i <= currentStep ? '#ededed' : '#8a8a8a' }}>{step.label}</p>
                  <p className="text-[11px]" style={{ color: '#8a8a8a' }}>{step.description}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-[1px] mx-4 rounded-full transition-all duration-300"
                  style={{ background: i < currentStep ? '#ededed' : '#1f1f1f' }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: '#1f1f1f' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, background: '#ededed' }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-[14px] p-6" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        {currentStep === 0 && <Step1Basics form={form} />}
        {currentStep === 1 && <Step2Audience form={form} />}
        {currentStep === 2 && <Step3Voice form={form} />}
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="btn-ghost flex items-center gap-2 text-[13px] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ color: '#8a8a8a' }}
        >
          <ChevronLeft size={14} /> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[11px]" style={{ color: '#8a8a8a' }}>Step {currentStep + 1} of {steps.length}</span>
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={handleNext} className="btn-primary text-[13px] flex items-center gap-2">
              Continue <ChevronRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary text-[13px] flex items-center gap-2 min-w-[140px] justify-center"
            >
              {isSubmitting ? (
                <><Loader2 size={14} className="animate-spin" /> Saving…</>
              ) : (
                <><Check size={14} /> Save Profile</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}