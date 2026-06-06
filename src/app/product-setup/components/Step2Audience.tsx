'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ProductFormData } from './ProductSetupWizard';

const stages = [
  { key: 'stage-idea', value: 'idea', label: 'Idea', description: 'Pre-build, validating' },
  { key: 'stage-build', value: 'building', label: 'Building', description: 'In development' },
  { key: 'stage-beta', value: 'beta', label: 'Beta', description: 'Early users' },
  { key: 'stage-launch', value: 'launched', label: 'Launched', description: 'Live & growing' },
  { key: 'stage-scale', value: 'scaling', label: 'Scaling', description: 'Post-PMF' },
];

const audienceRoles = [
  { key: 'role-dev', value: 'developer', label: 'Developers' },
  { key: 'role-founder', value: 'founder', label: 'Founders' },
  { key: 'role-pm', value: 'product-manager', label: 'Product Managers' },
  { key: 'role-marketer', value: 'marketer', label: 'Marketers' },
  { key: 'role-designer', value: 'designer', label: 'Designers' },
  { key: 'role-ops', value: 'operations', label: 'Operations' },
  { key: 'role-smb', value: 'small-business', label: 'Small Business Owners' },
  { key: 'role-consumer', value: 'consumer', label: 'Consumers / End Users' },
];

interface Props {
  form: ReturnType<typeof useFormContext<ProductFormData>>;
}

export default function Step2Audience({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-0.5">Who are you building for?</h2>
        <p className="text-sm text-muted-foreground">Knowing your audience helps the AI write copy that speaks directly to the right people.</p>
      </div>

      {/* Target audience description */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="targetAudience">
          Target audience <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-muted-foreground mb-1.5">Describe who your ideal customer is in 1–2 sentences</p>
        <textarea
          id="targetAudience"
          rows={3}
          className="input-base resize-none"
          placeholder="Indie developers and small teams (1–5 people) who want to launch a SaaS product quickly without spending weeks on boilerplate infrastructure…"
          {...register('targetAudience', {
            required: 'Target audience is required',
            minLength: { value: 20, message: 'Please be more specific — at least 20 characters' },
          })}
        />
        {errors.targetAudience && <p className="text-xs text-rose-500 mt-1.5">{errors.targetAudience.message}</p>}
      </div>

      {/* Audience role */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Primary audience role <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {audienceRoles.map((role) => (
            <label key={role.key} className="cursor-pointer">
              <input
                type="radio"
                value={role.value}
                className="sr-only"
                {...register('audienceRole', { required: 'Select a primary role' })}
              />
              <span className={`block px-3 py-2.5 rounded-xl border text-sm font-medium text-center transition-all duration-150 ${
                form.watch('audienceRole') === role.value
                  ? 'border-primary bg-secondary text-secondary-foreground' :'border-border hover:border-violet-200 hover:bg-violet-50/40 text-muted-foreground'
              }`}>
                {role.label}
              </span>
            </label>
          ))}
        </div>
        {errors.audienceRole && <p className="text-xs text-rose-500 mt-1.5">{errors.audienceRole.message}</p>}
      </div>

      {/* Product stage */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">
          Current product stage <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-muted-foreground mb-2">The AI adjusts urgency and messaging based on your stage</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {stages.map((stage) => (
            <label key={stage.key} className="cursor-pointer">
              <input
                type="radio"
                value={stage.value}
                className="sr-only"
                {...register('stage', { required: 'Select your current stage' })}
              />
              <span className={`block px-3 py-3 rounded-xl border text-center transition-all duration-150 ${
                form.watch('stage') === stage.value
                  ? 'border-primary bg-secondary' :'border-border hover:border-violet-200 hover:bg-violet-50/40'
              }`}>
                <span className={`block text-sm font-semibold ${
                  form.watch('stage') === stage.value ? 'text-secondary-foreground' : 'text-foreground'
                }`}>{stage.label}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">{stage.description}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.stage && <p className="text-xs text-rose-500 mt-1.5">{errors.stage.message}</p>}
      </div>

      {/* Key differentiators */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="differentiators">
          Key differentiators <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-muted-foreground mb-1.5">What makes your product different from alternatives? List 2–3 things.</p>
        <textarea
          id="differentiators"
          rows={3}
          className="input-base resize-none"
          placeholder="1. Pre-wired auth + payments out of the box. 2. Opinionated stack so you don't have to make decisions. 3. Built for solo founders, not enterprise teams."
          {...register('differentiators', { required: 'Key differentiators are required' })}
        />
        {errors.differentiators && <p className="text-xs text-rose-500 mt-1.5">{errors.differentiators.message}</p>}
      </div>

      {/* Pain points */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="painPoints">
          Pain points you solve
        </label>
        <p className="text-xs text-muted-foreground mb-1.5">What frustrations or problems does your product eliminate for your audience?</p>
        <textarea
          id="painPoints"
          rows={3}
          className="input-base resize-none"
          placeholder="Founders waste 2–4 weeks setting up authentication, payment infrastructure, and email before they can start building their actual product…"
          {...register('painPoints')}
        />
      </div>
    </div>
  );
}