'use client';

import React, { useState } from 'react';
import GeneratorConfig from './GeneratorConfig';
import GeneratorOutput from './GeneratorOutput';

export type GeneratorConfig = {
  contentType: string;
  channel: string;
  brief: string;
  toneOverride: string;
  length: string;
};

export type GeneratedVariant = {
  id: string;
  text: string;
  characterCount: number;
};

const mockVariants: Record<string, GeneratedVariant[]> = {
  'social-post-linkedin': [
    {
      id: 'var-001',
      text: "We've been building in public for 60 days — and here's the honest truth about what's working.\n\nWe launched BuildFast to solve the problem every solo developer faces: spending 3–4 weeks on auth, payments, and email before you can even start building your real product.\n\nSince launch:\n→ 500+ developers signed up\n→ 12 products shipped using our boilerplate\n→ Average time-to-launch: 4 days (vs. industry average of 3 weeks)\n\nThe thing nobody tells you about building a dev tool? Your users will teach you more in 30 days than 6 months of planning ever could.\n\nIf you're a developer tired of reinventing the wheel, BuildFast is for you. Link in bio. 🚀",
      characterCount: 612,
    },
    {
      id: 'var-002',
      text: "Hot take: most developers don't have a skills problem. They have a time problem.\n\nYou know how to build auth. You know how to wire up Stripe. You know how to configure email. But doing all of that before you can ship your actual idea? That's 3 weeks of momentum you can't get back.\n\nThat's exactly why we built BuildFast — a production-ready SaaS boilerplate that comes pre-wired with everything you need so you can focus on your actual product.\n\nWe're in beta. 200 credits free. No credit card required. Come try it → buildfast.io",
      characterCount: 501,
    },
    {
      id: 'var-003',
      text: "To every developer who has ever set up authentication for the 5th time:\n\nWe see you. We've been you.\n\nBuildFast is the boilerplate we wish existed when we started. Auth, payments, email, admin dashboard — all wired together, production-ready, in one repo.\n\nShip your SaaS in days, not months.\n\n🔗 buildfast.io — free beta, 200 credits to get started.",
      characterCount: 328,
    },
  ],
  default: [
    {
      id: 'var-d01',
      text: "Stop spending weeks on boilerplate. BuildFast gives developers a production-ready SaaS foundation — auth, payments, email, and admin — so you can focus on what makes your product unique.\n\nShip in days, not months. Try free → buildfast.io",
      characterCount: 234,
    },
    {
      id: 'var-d02',
      text: "Every hour you spend on infrastructure is an hour you're not spending on your product.\n\nBuildFast eliminates boilerplate so you can launch faster. Pre-built auth, Stripe integration, and email — all ready to go.\n\nFree beta. No credit card. buildfast.io",
      characterCount: 228,
    },
    {
      id: 'var-d03',
      text: "Developers: your next SaaS could be live in 4 days.\n\nBuildFast is the production-ready boilerplate you've been putting off building. Everything wired together. Everything working. Just add your idea.\n\n→ buildfast.io",
      characterCount: 202,
    },
  ],
};

export default function GeneratorWorkspace() {
  const [config, setConfig] = useState<GeneratorConfig>({
    contentType: 'social-post',
    channel: 'linkedin',
    brief: '',
    toneOverride: 'confident',
    length: 'medium',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<GeneratedVariant[] | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Backend integration point: POST /api/content/generate
  const handleGenerate = async () => {
    if (!config.brief.trim()) return;
    setIsGenerating(true);
    setVariants(null);
    await new Promise(r => setTimeout(r, 2200));
    const key = `${config.contentType}-${config.channel}`;
    setVariants(mockVariants[key] || mockVariants.default);
    setHasGenerated(true);
    setIsGenerating(false);
  };

  const handleRegenerateVariant = async (variantId: string) => {
    // Backend integration point: POST /api/content/regenerate-variant
    setVariants(prev => prev ? prev.map(v =>
      v.id === variantId ? { ...v, text: v.text + ' [Regenerated]' } : v
    ) : prev);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-6 items-start">
      <div className="lg:col-span-2">
        <GeneratorConfig
          config={config}
          onChange={setConfig}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>
      <div className="lg:col-span-3">
        <GeneratorOutput
          variants={variants}
          isGenerating={isGenerating}
          hasGenerated={hasGenerated}
          contentType={config.contentType}
          channel={config.channel}
          onRegenerateVariant={handleRegenerateVariant}
        />
      </div>
    </div>
  );
}