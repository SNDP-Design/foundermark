'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormData } from './ProductSetupWizard';
import { Check } from 'lucide-react';

const tones = [
  {
    key: 'tone-confident',
    value: 'confident',
    label: 'Confident',
    description: 'Bold, direct, and decisive. Speaks with authority.',
    example: '"Stop wasting time on setup. BuildFast gets you to launch in 3 days."',
  },
  {
    key: 'tone-friendly',
    value: 'friendly',
    label: 'Friendly',
    description: 'Warm, approachable, and conversational.',
    example: '"Hey founders — we know how overwhelming the early days can be. We built this for you."',
  },
  {
    key: 'tone-technical',
    value: 'technical',
    label: 'Technical',
    description: 'Precise, detailed, developer-first language.',
    example: '"Pre-configured Next.js + Prisma + Stripe + Resend — production-ready from day one."',
  },
  {
    key: 'tone-inspiring',
    value: 'inspiring',
    label: 'Inspiring',
    description: 'Motivational, visionary, founder-to-founder.',
    example: '"Every great product started with a founder who refused to waste time on the wrong problems."',
  },
  {
    key: 'tone-witty',
    value: 'witty',
    label: 'Witty',
    description: 'Clever, playful, and memorable — with a hint of humor.',
    example: '"Boilerplate: the thing nobody wants to write and everyone needs. We wrote it for you. You\'re welcome."',
  },
];

const channels = [
  { key: 'ch-linkedin', value: 'linkedin', label: 'LinkedIn' },
  { key: 'ch-twitter', value: 'twitter', label: 'Twitter / X' },
  { key: 'ch-instagram', value: 'instagram', label: 'Instagram' },
  { key: 'ch-email', value: 'email', label: 'Email' },
  { key: 'ch-facebook', value: 'facebook', label: 'Facebook Ads' },
  { key: 'ch-producthunt', value: 'producthunt', label: 'Product Hunt' },
];

const contentGoals = [
  { key: 'goal-signups', value: 'drive-signups', label: 'Drive signups' },
  { key: 'goal-awareness', value: 'build-awareness', label: 'Build awareness' },
  { key: 'goal-community', value: 'grow-community', label: 'Grow community' },
  { key: 'goal-revenue', value: 'convert-to-paid', label: 'Convert to paid' },
  { key: 'goal-waitlist', value: 'build-waitlist', label: 'Build waitlist' },
];

interface Props {
  form: UseFormReturn<ProductFormData>;
}

export default function Step3Voice({ form }: Props) {
  const { register, setValue, watch } = form;
  const selectedChannels = watch('channels') || [];

  const toggleChannel = (value: string) => {
    const current = selectedChannels;
    if (current.includes(value)) {
      setValue('channels', current.filter(c => c !== value));
    } else {
      setValue('channels', [...current, value]);
    }
  };

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-0.5">Tone of voice & channels</h2>
        <p className="text-sm text-muted-foreground">Choose how the AI should sound and where you plan to publish.</p>
      </div>

      {/* Tone selector */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Tone of voice <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-muted-foreground mb-3">This shapes the writing style for ALL generated content</p>
        <div className="space-y-2">
          {tones.map((tone) => {
            const selected = watch('tone') === tone.value;
            return (
              <label key={tone.key} className="cursor-pointer block">
                <input
                  type="radio"
                  value={tone.value}
                  className="sr-only"
                  {...register('tone', { required: 'Select a tone of voice' })}
                />
                <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-150 ${
                  selected
                    ? 'border-primary bg-secondary' :'border-border hover:border-violet-200 hover:bg-violet-50/30'
                }`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    selected ? 'border-primary bg-primary' : 'border-input'
                  }`}>
                    {selected && <Check size={10} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-semibold ${selected ? 'text-secondary-foreground' : 'text-foreground'}`}>
                        {tone.label}
                      </span>
                      <span className="text-xs text-muted-foreground">— {tone.description}</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic">{tone.example}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Channel preferences */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">
          Primary channels
        </label>
        <p className="text-xs text-muted-foreground mb-2">Where do you plan to publish most of your content? Select all that apply.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {channels.map((ch) => {
            const active = selectedChannels.includes(ch.value);
            return (
              <button
                key={ch.key}
                type="button"
                onClick={() => toggleChannel(ch.value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'border-primary bg-secondary text-secondary-foreground'
                    : 'border-border hover:border-violet-200 text-muted-foreground hover:text-foreground'
                }`}
              >
                {active && <Check size={13} className="text-primary" />}
                {ch.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content goal */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">
          Primary content goal
        </label>
        <p className="text-xs text-muted-foreground mb-2">What outcome are you trying to drive with your marketing content right now?</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {contentGoals.map((goal) => (
            <label key={goal.key} className="cursor-pointer">
              <input
                type="radio"
                value={goal.value}
                className="sr-only"
                {...register('contentGoal')}
              />
              <span className={`block px-3 py-2.5 rounded-xl border text-sm font-medium text-center transition-all duration-150 ${
                form.watch('contentGoal') === goal.value
                  ? 'border-primary bg-secondary text-secondary-foreground' :'border-border hover:border-violet-200 hover:bg-violet-50/40 text-muted-foreground'
              }`}>
                {goal.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}