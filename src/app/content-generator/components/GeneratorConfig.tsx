'use client';

import React from 'react';
import { Sparkles, Loader2, Zap } from 'lucide-react';
import { GeneratorConfig as ConfigType, ProductSetupData } from './GeneratorWorkspace';

const contentTypes = [
  { key: 'ct-social', value: 'social-post', label: 'Social Post' },
  { key: 'ct-ad', value: 'ad-copy', label: 'Ad Copy' },
  { key: 'ct-email', value: 'email-subject', label: 'Email Subject' },
  { key: 'ct-tagline', value: 'tagline', label: 'Tagline' },
  { key: 'ct-blog', value: 'blog-intro', label: 'Blog Intro' },
];

const channels = [
  { key: 'ch-li', value: 'linkedin', label: 'LinkedIn' },
  { key: 'ch-tw', value: 'twitter', label: 'Twitter / X' },
  { key: 'ch-ig', value: 'instagram', label: 'Instagram' },
  { key: 'ch-em', value: 'email', label: 'Email' },
  { key: 'ch-fb', value: 'facebook', label: 'Facebook Ads' },
  { key: 'ch-ph', value: 'producthunt', label: 'Product Hunt' },
];

const tones = [
  { key: 'tn-conf', value: 'confident', label: 'Confident' },
  { key: 'tn-fri', value: 'friendly', label: 'Friendly' },
  { key: 'tn-tech', value: 'technical', label: 'Technical' },
  { key: 'tn-insp', value: 'inspiring', label: 'Inspiring' },
  { key: 'tn-wit', value: 'witty', label: 'Witty' },
];

const lengths = [
  { key: 'len-short', value: 'short', label: 'Short', hint: '< 150 chars' },
  { key: 'len-med', value: 'medium', label: 'Medium', hint: '150–400 chars' },
  { key: 'len-long', value: 'long', label: 'Long', hint: '400–800 chars' },
];

interface Props {
  config: ConfigType;
  onChange: (c: ConfigType) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  productSetup: ProductSetupData | null;
  isLoadingSetup: boolean;
}

export default function GeneratorConfig({ config, onChange, onGenerate, isGenerating, productSetup, isLoadingSetup }: Props) {
  const set = (key: keyof ConfigType, value: string) => onChange({ ...config, [key]: value });

  const isChannelFromSetup = productSetup?.channels?.includes(config.channel);
  const isToneFromSetup = productSetup?.tone === config.toneOverride;

  return (
    <div className="rounded-[14px] p-6 space-y-6 sticky top-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)', border: '1px solid #e5e7eb' }}>
      <div>
        <h2 className="text-[15px] font-bold tracking-[-0.2px] mb-[4px]" style={{ color: '#111111' }}>What do you want to create?</h2>
        <p className="text-[12px]" style={{ color: '#6b7280' }}>Configure your content below, then generate.</p>
      </div>

      {/* Product Setup banner */}
      {isLoadingSetup ? (
        <div className="rounded-[10px] px-3 py-2.5 flex items-center gap-2" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <Loader2 size={12} className="animate-spin shrink-0" style={{ color: '#9ca3af' }} />
          <span className="text-[11px]" style={{ color: '#9ca3af' }}>Loading your product profile…</span>
        </div>
      ) : productSetup?.productName ? (
        <div className="rounded-[10px] px-3 py-2.5 flex items-start gap-2" style={{ background: 'rgba(22, 163, 74, 0.06)', border: '1px solid rgba(22, 163, 74, 0.18)' }}>
          <Zap size={12} className="shrink-0 mt-0.5" style={{ color: '#16a34a' }} />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold" style={{ color: '#16a34a' }}>Auto-filled from Product Setup</p>
            <p className="text-[11px] mt-0.5 truncate" style={{ color: '#6b7280' }}>
              Generating for <span style={{ color: '#111111' }}>{productSetup.productName}</span> · tone &amp; channel pre-selected
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-[10px] px-3 py-2.5 flex items-start gap-2" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <Zap size={12} className="shrink-0 mt-0.5" style={{ color: '#9ca3af' }} />
          <p className="text-[11px]" style={{ color: '#6b7280' }}>
            Complete the{' '}
            <a href="/product-setup" className="underline" style={{ color: '#111111' }}>Product Setup</a>
            {' '}to auto-fill tone &amp; channel preferences.
          </p>
        </div>
      )}

      {/* Channel */}
      {config.contentType === 'social-post' && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.4px]" style={{ color: '#9ca3af' }}>Channel / Platform</label>
            {isChannelFromSetup && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-[4px] font-medium" style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a' }}>
                from setup
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {channels.map((ch) => {
              const isPreferred = productSetup?.channels?.includes(ch.value);
              return (
                <button
                  key={ch.key}
                  type="button"
                  onClick={() => set('channel', ch.value)}
                  className="px-3 py-1.5 rounded-[8px] text-[12px] font-semibold transition-all duration-150 relative"
                  style={{
                    background: config.channel === ch.value ? '#111111' : '#f3f4f6',
                    color: config.channel === ch.value ? '#ffffff' : isPreferred ? '#111111' : '#6b7280',
                    border: `1px solid ${config.channel === ch.value ? '#111111' : isPreferred ? '#d1d5db' : '#e5e7eb'}`,
                  }}
                >
                  {ch.label}
                </button>
              );
            })}
          </div>
          {productSetup?.channels && productSetup.channels.length > 0 && (
            <p className="text-[10px] mt-1.5" style={{ color: '#9ca3af' }}>
              Highlighted channels are from your Product Setup preferences.
            </p>
          )}
        </div>
      )}

      {/* Brief */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] mb-1" style={{ color: '#9ca3af' }} htmlFor="brief">
          What should this content be about?
        </label>
        <p className="text-[11px] mb-2" style={{ color: '#9ca3af' }}>Give the AI context — a topic, angle, announcement, or goal.</p>
        <textarea
          id="brief"
          rows={5}
          className="input-base resize-none text-[13px]"
          placeholder={
            productSetup?.productName
              ? `e.g. We just crossed 500 beta signups for ${productSetup.productName}. Write a LinkedIn post celebrating this milestone…`
              : 'e.g. We just crossed 500 beta signups. Write a LinkedIn post celebrating this milestone…'
          }
          value={config.brief}
          onChange={(e) => set('brief', e.target.value)}
        />
        <p className="text-[11px] mt-1" style={{ color: '#9ca3af' }}>{config.brief.length} characters</p>
      </div>

      {/* Tone override */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.4px]" style={{ color: '#9ca3af' }}>Tone Override</label>
          {isToneFromSetup && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-[4px] font-medium" style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a' }}>
              from setup
            </span>
          )}
        </div>
        <select
          value={config.toneOverride}
          onChange={(e) => set('toneOverride', e.target.value)}
          className="input-base text-[13px]"
        >
          {tones.map((t) => (
            <option key={t.key} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Length */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] mb-2" style={{ color: '#9ca3af' }}>Content Length</label>
        <div className="grid grid-cols-3 gap-2">
          {lengths.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => set('length', l.value)}
              className="flex flex-col items-center px-2 py-2.5 rounded-[10px] text-center transition-all duration-150"
              style={{
                border: `1px solid ${config.length === l.value ? '#9ca3af' : '#e5e7eb'}`,
                background: config.length === l.value ? '#f3f4f6' : '#fafafa',
              }}
            >
              <span className="text-[12px] font-semibold" style={{ color: config.length === l.value ? '#111111' : '#6b7280' }}>
                {l.label}
              </span>
              <span className="text-[10px] mt-0.5" style={{ color: '#9ca3af' }}>{l.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Credits indicator */}
      <div className="rounded-[10px] px-3 py-2.5 flex items-center justify-between" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
        <span className="text-[11px]" style={{ color: '#9ca3af' }}>This generation uses</span>
        <span className="text-[11px] font-bold" style={{ color: '#111111' }}>3 credits · 153 remaining</span>
      </div>

      {/* Generate button */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !config.brief.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2 text-[14px] min-h-[44px] rounded-[10px]"
      >
        {isGenerating ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            <span>Generating 3 variants…</span>
          </>
        ) : (
          <>
            <Sparkles size={15} />
            <span>Generate Content</span>
          </>
        )}
      </button>
    </div>
  );
}