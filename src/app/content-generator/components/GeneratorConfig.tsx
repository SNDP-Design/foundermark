'use client';

import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { GeneratorConfig as ConfigType } from './GeneratorWorkspace';

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
}

export default function GeneratorConfig({ config, onChange, onGenerate, isGenerating }: Props) {
  const set = (key: keyof ConfigType, value: string) => onChange({ ...config, [key]: value });

  return (
    <div className="rounded-[14px] p-6 space-y-6 sticky top-6" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
      <div>
        <h2 className="text-[15px] font-bold tracking-[-0.2px] mb-[4px]" style={{ color: '#ededed' }}>What do you want to create?</h2>
        <p className="text-[12px]" style={{ color: '#8a8a8a' }}>Configure your content below, then generate.</p>
      </div>

      {/* Content type */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] mb-2" style={{ color: '#8a8a8a' }}>Content Type</label>
        <div className="flex flex-wrap gap-2">
          {contentTypes.map((ct) => (
            <button
              key={ct.key}
              type="button"
              onClick={() => set('contentType', ct.value)}
              className="px-3 py-1.5 rounded-[8px] text-[12px] font-semibold transition-all duration-150"
              style={{
                background: config.contentType === ct.value ? '#ededed' : '#161616',
                color: config.contentType === ct.value ? '#0a0a0a' : '#8a8a8a',
                border: `1px solid ${config.contentType === ct.value ? '#ededed' : '#1f1f1f'}`,
              }}
            >
              {ct.label}
            </button>
          ))}
        </div>
      </div>

      {/* Channel */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] mb-2" style={{ color: '#8a8a8a' }}>Channel / Platform</label>
        <div className="flex flex-wrap gap-2">
          {channels.map((ch) => (
            <button
              key={ch.key}
              type="button"
              onClick={() => set('channel', ch.value)}
              className="px-3 py-1.5 rounded-[8px] text-[12px] font-semibold transition-all duration-150"
              style={{
                background: config.channel === ch.value ? '#ededed' : '#161616',
                color: config.channel === ch.value ? '#0a0a0a' : '#8a8a8a',
                border: `1px solid ${config.channel === ch.value ? '#ededed' : '#1f1f1f'}`,
              }}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brief */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] mb-1" style={{ color: '#8a8a8a' }} htmlFor="brief">
          What should this content be about?
        </label>
        <p className="text-[11px] mb-2" style={{ color: '#8a8a8a' }}>Give the AI context — a topic, angle, announcement, or goal.</p>
        <textarea
          id="brief"
          rows={5}
          className="input-base resize-none text-[13px]"
          placeholder="e.g. We just crossed 500 beta signups. Write a LinkedIn post celebrating this milestone…"
          value={config.brief}
          onChange={(e) => set('brief', e.target.value)}
        />
        <p className="text-[11px] mt-1" style={{ color: '#8a8a8a' }}>{config.brief.length} characters</p>
      </div>

      {/* Tone override */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] mb-2" style={{ color: '#8a8a8a' }}>Tone Override</label>
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
        <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] mb-2" style={{ color: '#8a8a8a' }}>Content Length</label>
        <div className="grid grid-cols-3 gap-2">
          {lengths.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => set('length', l.value)}
              className="flex flex-col items-center px-2 py-2.5 rounded-[10px] text-center transition-all duration-150"
              style={{
                border: `1px solid ${config.length === l.value ? '#5a5a5a' : '#1f1f1f'}`,
                background: config.length === l.value ? '#1c1c1c' : '#161616',
              }}
            >
              <span className="text-[12px] font-semibold" style={{ color: config.length === l.value ? '#ededed' : '#8a8a8a' }}>
                {l.label}
              </span>
              <span className="text-[10px] mt-0.5" style={{ color: '#8a8a8a' }}>{l.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Credits indicator */}
      <div className="rounded-[10px] px-3 py-2.5 flex items-center justify-between" style={{ background: '#161616', border: '1px solid #1f1f1f' }}>
        <span className="text-[11px]" style={{ color: '#8a8a8a' }}>This generation uses</span>
        <span className="text-[11px] font-bold" style={{ color: '#ededed' }}>3 credits · 153 remaining</span>
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