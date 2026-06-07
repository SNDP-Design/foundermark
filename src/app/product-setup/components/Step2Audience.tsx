'use client';

import React from 'react';
import { useFormReturn } from 'react-hook-form';
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
  form: useFormReturn<ProductFormData>;
}

export default function Step2Audience({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[17px] font-bold mb-[4px]" style={{ color: '#111111' }}>Who are you building for?</h2>
        <p className="text-[13px]" style={{ color: '#6b7280' }}>Knowing your audience helps the AI write copy that speaks directly to the right people.</p>
      </div>

      <div>
        <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-2" style={{ color: '#6b7280' }}>
          Primary audience role
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {audienceRoles.map((role) => (
            <label key={role.key} className="cursor-pointer">
              <input type="radio" value={role.value} className="sr-only" {...register('audienceRole', { required: 'Select a primary role' })} />
              <span
                className="block px-3 py-2.5 rounded-[8px] text-[12px] font-medium text-center transition-all duration-150"
                style={{
                  border: `1px solid ${form.watch('audienceRole') === role.value ? '#9ca3af' : '#e5e7eb'}`,
                  background: form.watch('audienceRole') === role.value ? '#f3f4f6' : '#fafafa',
                  color: form.watch('audienceRole') === role.value ? '#111111' : '#6b7280',
                }}
              >
                {role.label}
              </span>
            </label>
          ))}
        </div>
        {errors.audienceRole && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.audienceRole.message}</p>}
      </div>

      <div>
        <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#6b7280' }}>
          Current product stage
        </label>
        <p className="text-[11px] mb-2" style={{ color: '#9ca3af' }}>The AI adjusts urgency and messaging based on your stage</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {stages.map((stage) => (
            <label key={stage.key} className="cursor-pointer">
              <input type="radio" value={stage.value} className="sr-only" {...register('stage', { required: 'Select your current stage' })} />
              <span
                className="block px-3 py-3 rounded-[8px] text-center transition-all duration-150"
                style={{
                  border: `1px solid ${form.watch('stage') === stage.value ? '#9ca3af' : '#e5e7eb'}`,
                  background: form.watch('stage') === stage.value ? '#f3f4f6' : '#fafafa',
                }}
              >
                <span className="block text-[12px] font-semibold" style={{ color: form.watch('stage') === stage.value ? '#111111' : '#6b7280' }}>{stage.label}</span>
                <span className="block text-[10px] mt-0.5" style={{ color: '#9ca3af' }}>{stage.description}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.stage && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.stage.message}</p>}
      </div>

      <div>
        <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#6b7280' }} htmlFor="differentiators">
          Key differentiators
        </label>
        <p className="text-[11px] mb-[6px]" style={{ color: '#9ca3af' }}>What makes your product different from alternatives? List 2–3 things.</p>
        <textarea
          id="differentiators" rows={3} className="input-base resize-none"
          placeholder="1. Pre-wired auth + payments out of the box. 2. Opinionated stack. 3. Built for solo founders."
          {...register('differentiators', { required: 'Key differentiators are required' })}
        />
        {errors.differentiators && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.differentiators.message}</p>}
      </div>

    </div>
  );
}