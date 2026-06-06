'use client';

import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { ProductFormData } from './ProductSetupWizard';

const industries = [
  { key: 'ind-dev', value: 'developer-tools', label: 'Developer Tools' },
  { key: 'ind-saas', value: 'b2b-saas', label: 'B2B SaaS' },
  { key: 'ind-ecom', value: 'ecommerce', label: 'E-commerce' },
  { key: 'ind-fin', value: 'fintech', label: 'Fintech' },
  { key: 'ind-health', value: 'healthtech', label: 'Healthtech' },
  { key: 'ind-edu', value: 'edtech', label: 'EdTech' },
  { key: 'ind-market', value: 'marketing', label: 'Marketing & Growth' },
  { key: 'ind-hr', value: 'hr-tools', label: 'HR & People Tools' },
  { key: 'ind-other', value: 'other', label: 'Other' },
];

interface Props {
  form: UseFormReturn<ProductFormData>;
}

export default function Step1Basics({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[17px] font-bold mb-[4px]" style={{ color: '#ededed' }}>Tell us about your product</h2>
        <p className="text-[13px]" style={{ color: '#8a8a8a' }}>This information shapes every piece of content the AI generates for you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }} htmlFor="productName">
            Product name
          </label>
          <input id="productName" type="text" className="input-base" placeholder="e.g. BuildFast" {...register('productName', { required: 'Product name is required' })} />
          {errors.productName && <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{errors.productName.message}</p>}
        </div>
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }} htmlFor="websiteUrl">Website URL</label>
          <input id="websiteUrl" type="url" className="input-base" placeholder="https://yourproduct.com" {...register('websiteUrl')} />
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }} htmlFor="description">
          Product description
        </label>
        <p className="text-[11px] mb-[6px]" style={{ color: '#8a8a8a' }}>2–4 sentences about what your product does and who it's for</p>
        <textarea
          id="description" rows={4} className="input-base resize-none"
          placeholder="BuildFast is a boilerplate toolkit that lets indie developers launch a production-ready SaaS in days…"
          {...register('description', { required: 'Description is required', minLength: { value: 50, message: 'Please write at least 50 characters' } })}
        />
        {errors.description && <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }}>
          Industry
        </label>
        <p className="text-[11px] mb-2" style={{ color: '#8a8a8a' }}>Helps the AI use the right vocabulary and benchmarks</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {industries.map((ind) => (
            <label key={ind.key} className="cursor-pointer">
              <input type="radio" value={ind.value} className="sr-only" {...register('industry', { required: 'Select an industry' })} />
              <span
                className="block px-3 py-2.5 rounded-[8px] text-[12px] font-medium text-center transition-all duration-150"
                style={{
                  border: `1px solid ${form.watch('industry') === ind.value ? '#5a5a5a' : '#1f1f1f'}`,
                  background: form.watch('industry') === ind.value ? '#1c1c1c' : '#161616',
                  color: form.watch('industry') === ind.value ? '#ededed' : '#8a8a8a',
                }}
              >
                {ind.label}
              </span>
            </label>
          ))}
        </div>
        {errors.industry && <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{errors.industry.message}</p>}
      </div>
    </div>
  );
}