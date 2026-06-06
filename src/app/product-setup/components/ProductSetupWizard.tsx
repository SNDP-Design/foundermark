'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import Step1Basics from './Step1Basics';
import Step2Audience from './Step2Audience';
import Step3Voice from './Step3Voice';

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
  { key: 'step-audience', label: 'Audience', description: 'Who you\'re targeting' },
  { key: 'step-voice', label: 'Voice & Channels', description: 'Tone and distribution' },
];

export default function ProductSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const form = useForm<ProductFormData>({
    mode: 'onBlur',
    defaultValues: {
      productName: 'BuildFast',
      tagline: 'Ship your SaaS in days, not months',
      websiteUrl: 'https://buildfast.io',
      industry: 'developer-tools',
      description: 'BuildFast is a boilerplate toolkit for indie developers and small teams who want to launch their SaaS product quickly without reinventing the wheel.',
      targetAudience: 'Indie developers, solo founders, and small teams building SaaS products',
      audienceRole: 'developer',
      stage: 'beta',
      differentiators: 'Pre-built auth, payments, and email — all wired together out of the box',
      painPoints: 'Founders waste weeks on infrastructure instead of building their core product',
      tone: 'confident',
      channels: ['linkedin', 'twitter'],
      contentGoal: 'drive-signups',
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof ProductFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ['productName', 'tagline', 'industry', 'description'];
    if (currentStep === 1) fieldsToValidate = ['targetAudience', 'stage', 'differentiators'];

    const valid = await form.trigger(fieldsToValidate);
    if (valid) setCurrentStep(s => s + 1);
  };

  const handleBack = () => setCurrentStep(s => s - 1);

  // Backend integration point: PUT /api/product/profile
  const handleSubmit = form.handleSubmit(async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setIsSubmitting(false);
    setCompleted(true);
    toast.success('Product profile saved! Your AI content will now be tailored to BuildFast.');
  });

  if (completed) {
    return (
      <div className="card-base p-10 text-center slide-up">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <Check size={28} className="text-emerald-600" />
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