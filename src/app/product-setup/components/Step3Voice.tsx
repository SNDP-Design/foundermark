'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormData } from './ProductSetupWizard';
import { Check } from 'lucide-react';

const tones = [
  { key: 'tone-confident', value: 'confident', label: 'Confident', description: 'Bold, direct, and decisive. Speaks with authority.', example: '"Stop wasting time on setup. BuildFast gets you to launch in 3 days."' },
  { key: 'tone-friendly', value: 'friendly', label: 'Friendly', description: 'Warm, approachable, and conversational.', example: '"Hey founders — we know how overwhelming the early days can be. We built this for you."' },
  { key: 'tone-technical', value: 'technical', label: 'Technical', description: 'Precise, detailed, developer-first language.', example: '"Pre-configured Next.js + Prisma + Stripe + Resend — production-ready from day one."' },
  { key: 'tone-inspiring', value: 'inspiring', label: 'Inspiring', description: 'Motivational, visionary, founder-to-founder.', example: '"Every great product started with a founder who refused to waste time on the wrong problems."' },
  { key: 'tone-witty', value: 'witty', label: 'Witty', description: 'Clever, playful, and memorable — with a hint of humor.', example: '"Boilerplate: the thing nobody wants to write and everyone needs. We wrote it for you."' },
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
        <h2 className="text-[17px] font-bold mb-[4px]" style={{ color: '#ededed' }}>Tone of voice & channels</h2>
      </div>

      {/* Tone selector */}
      <div>
        <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-2" style={{ color: '#8a8a8a' }}>
          Tone of voice
        </label>
        <div className="space-y-2">
          {tones.map((tone) => {
            const selected = watch('tone') === tone.value;
            return (
              <label key={tone.key} className="cursor-pointer block">
                <input type="radio" value={tone.value} className="sr-only" {...register('tone', { required: 'Select a tone of voice' })} />
                <div
                  className="flex items-start gap-4 p-4 rounded-[10px] transition-all duration-150"
                  style={{
                    border: `1px solid ${selected ? '#5a5a5a' : '#1f1f1f'}`,
                    background: selected ? '#1c1c1c' : '#161616',
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
                    style={{
                      borderColor: selected ? '#ededed' : '#3a3a3a',
                      background: selected ? '#ededed' : 'transparent',
                    }}
                  >
                    {selected && <Check size={10} style={{ color: '#0a0a0a' }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold" style={{ color: selected ? '#ededed' : '#8a8a8a' }}>{tone.label}</span>
                      <span className="text-[11px]" style={{ color: '#8a8a8a' }}>— {tone.description}</span>
                    </div>
                    <p className="text-[11px] italic" style={{ color: '#8a8a8a' }}>{tone.example}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Channel preferences */}
      <div>
        <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }}>Primary channels</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {channels.map((ch) => {
            const active = selectedChannels.includes(ch.value);
            return (
              <button
                key={ch.key}
                type="button"
                onClick={() => toggleChannel(ch.value)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-[12px] font-medium transition-all duration-150"
                style={{
                  border: `1px solid ${active ? '#5a5a5a' : '#1f1f1f'}`,
                  background: active ? '#1c1c1c' : '#161616',
                  color: active ? '#ededed' : '#8a8a8a',
                }}
              >
                {active && <Check size={12} style={{ color: '#4ade80' }} />}
                {ch.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content goal */}
      <div>
        <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }}>Primary content goal</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {contentGoals.map((goal) => (
            <label key={goal.key} className="cursor-pointer">
              <input type="radio" value={goal.value} className="sr-only" {...register('contentGoal')} />
              <span
                className="block px-3 py-2.5 rounded-[8px] text-[12px] font-medium text-center transition-all duration-150"
                style={{
                  border: `1px solid ${form.watch('contentGoal') === goal.value ? '#5a5a5a' : '#1f1f1f'}`,
                  background: form.watch('contentGoal') === goal.value ? '#1c1c1c' : '#161616',
                  color: form.watch('contentGoal') === goal.value ? '#ededed' : '#8a8a8a',
                }}
              >
                {goal.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}