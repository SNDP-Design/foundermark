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
    <div className="card-base p-6 space-y-6 sticky top-6">
      <div>
        <h2 className="text-sm font-bold text-foreground mb-0.5">What do you want to create?</h2>
        <p className="text-xs text-muted-foreground">Configure your content below, then generate.</p>
      </div>

      {/* Content type */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Content Type</label>
        <div className="flex flex-wrap gap-2">
          {contentTypes.map((ct) => (
            <button
              key={ct.key}
              type="button"
              onClick={() => set('contentType', ct.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                config.contentType === ct.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              {ct.label}
            </button>
          ))}
        </div>
      </div>

      {/* Channel */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Channel / Platform</label>
        <div className="flex flex-wrap gap-2">
          {channels.map((ch) => (
            <button
              key={ch.key}
              type="button"
              onClick={() => set('channel', ch.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                config.channel === ch.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brief */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" htmlFor="brief">
          What should this content be about?
        </label>
        <p className="text-xs text-muted-foreground mb-2">Give the AI context — a topic, angle, announcement, or goal.</p>
        <textarea
          id="brief"
          rows={5}
          className="input-base resize-none text-sm"
          placeholder="e.g. We just crossed 500 beta signups. Write a LinkedIn post celebrating this milestone and explaining what we learned about getting early users without paid ads…"
          value={config.brief}
          onChange={(e) => set('brief', e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">{config.brief.length} characters</p>
      </div>

      {/* Tone override */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Tone Override</label>
        <p className="text-xs text-muted-foreground mb-2">Overrides your default profile tone for this generation</p>
        <select
          value={config.toneOverride}
          onChange={(e) => set('toneOverride', e.target.value)}
          className="input-base text-sm"
        >
          {tones.map((t) => (
            <option key={t.key} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Length */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Content Length</label>
        <div className="grid grid-cols-3 gap-2">
          {lengths.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => set('length', l.value)}
              className={`flex flex-col items-center px-2 py-2.5 rounded-xl border text-center transition-all duration-150 ${
                config.length === l.value
                  ? 'border-primary bg-secondary' :'border-border hover:border-violet-700/50'
              }`}
            >
              <span className={`text-xs font-semibold ${config.length === l.value ? 'text-secondary-foreground' : 'text-foreground'}`}>
                {l.label}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">{l.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Credits indicator */}
      <div className="bg-muted rounded-xl px-3 py-2.5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">This generation uses</span>
        <span className="text-xs font-bold text-foreground">3 credits · 153 remaining</span>
      </div>

      {/* Generate button */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !config.brief.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2 text-sm min-h-[44px]"
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