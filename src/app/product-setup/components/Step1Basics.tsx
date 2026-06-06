'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
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
        <h2 className="text-lg font-bold text-foreground mb-0.5">Tell us about your product</h2>
        <p className="text-sm text-muted-foreground">This information shapes every piece of content the AI generates for you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Product name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="productName">
            Product name <span className="text-rose-500">*</span>
          </label>
          <input
            id="productName"
            type="text"
            className="input-base"
            placeholder="e.g. BuildFast"
            {...register('productName', { required: 'Product name is required' })}
          />
          {errors.productName && <p className="text-xs text-rose-500 mt-1.5">{errors.productName.message}</p>}
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="websiteUrl">
            Website URL
          </label>
          <p className="text-xs text-muted-foreground mb-1.5">Optional — helps the AI reference your brand</p>
          <input
            id="websiteUrl"
            type="url"
            className="input-base"
            placeholder="https://yourproduct.com"
            {...register('websiteUrl')}
          />
        </div>
      </div>

      {/* Tagline */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="tagline">
          One-line tagline <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-muted-foreground mb-1.5">How do you describe your product in a single sentence?</p>
        <input
          id="tagline"
          type="text"
          className="input-base"
          placeholder="e.g. Ship your SaaS in days, not months"
          {...register('tagline', { required: 'Tagline is required', maxLength: { value: 120, message: 'Keep it under 120 characters' } })}
        />
        {errors.tagline && <p className="text-xs text-rose-500 mt-1.5">{errors.tagline.message}</p>}
      </div>

      {/* Industry */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">
          Industry <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-muted-foreground mb-2">Helps the AI use the right vocabulary and benchmarks</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {industries.map((ind) => (
            <label key={ind.key} className="cursor-pointer">
              <input
                type="radio"
                value={ind.value}
                className="sr-only"
                {...register('industry', { required: 'Select an industry' })}
              />
              <span className={`block px-3 py-2.5 rounded-xl border text-sm font-medium text-center transition-all duration-150 ${
                form.watch('industry') === ind.value
                  ? 'border-primary bg-secondary text-secondary-foreground' :'border-border hover:border-violet-200 hover:bg-violet-50/40 text-muted-foreground'
              }`}>
                {ind.label}
              </span>
            </label>
          ))}
        </div>
        {errors.industry && <p className="text-xs text-rose-500 mt-1.5">{errors.industry.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="description">
          Product description <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-muted-foreground mb-1.5">2–4 sentences about what your product does and who it's for</p>
        <textarea
          id="description"
          rows={4}
          className="input-base resize-none"
          placeholder="BuildFast is a boilerplate toolkit that lets indie developers launch a production-ready SaaS in days. It includes pre-built auth, payments, email, and a full admin dashboard…"
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 50, message: 'Please write at least 50 characters' },
          })}
        />
        {errors.description && <p className="text-xs text-rose-500 mt-1.5">{errors.description.message}</p>}
      </div>
    </div>
  );
}