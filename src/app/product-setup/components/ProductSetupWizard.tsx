'use client';

import React, { useState, useEffect } from 'react';
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
      productName: '',
      tagline: '',
      websiteUrl: '',
      industry: 'developer-tools',
      description: '',
      targetAudience: '',
      audienceRole: 'developer',
      stage: 'beta',
      differentiators: '',
      painPoints: '',
      tone: 'confident',
      channels: ['linkedin', 'twitter'],
      contentGoal: 'drive-signups',
    },
  });

  useEffect(() => {
    const loadExistingSetup = async () => {
      if (!user) { setIsLoading(false); return; }
      try {
        const { data, error } = await supabase
          .from('product_setup')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.log('Load product setup error:', error.message);
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

  const handleNext = async () => {
    let fieldsToValidate: (keyof ProductFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ['productName', 'tagline', 'industry', 'description'];
    if (currentStep === 1) fieldsToValidate = ['targetAudience', 'stage', 'differentiators'];

    const valid = await form.trigger(fieldsToValidate);
    if (valid) setCurrentStep(s => s + 1);
  };

  const handleBack = () => setCurrentStep(s => s - 1);

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!user) { toast.error('You must be logged in to save your product profile.'); return; }
    setIsSubmitting(true);
    try {
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
      toast.error(error?.message || 'Failed to save product profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  });

  if (isLoading) {
    return (
      <div className="card-base p-10 text-center">
        <Loader2 size={24} className="animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground mt-3">Loading your product profile…</p>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="card-base p-10 text-center slide-up">
        <div className="w-16 h-16 rounded-full bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
          <Check size={28} className="text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Profile saved!</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          FounderMark now knows your product, audience, and voice. Head to the Content Generator to create your first batch.
        </p>
        <a href="/content-generator" className="btn-primary text-sm inline-flex items-center gap-2">
          Generate Content Now <ChevronRight size={15} />
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="card-base p-5">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, i) => (
            <React.Fragment key={step.key}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                  i < currentStep
                    ? 'bg-primary text-primary-foreground'
                    : i === currentStep
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {i < currentStep ? <Check size={14} /> : i + 1}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-xs font-semibold ${i <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 rounded-full transition-all duration-300 ${
                  i < currentStep ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="card-base p-6">
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
          className="btn-ghost flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={15} /> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={handleNext} className="btn-primary text-sm flex items-center gap-2">
              Continue <ChevronRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary text-sm flex items-center gap-2 min-w-[140px] justify-center"
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