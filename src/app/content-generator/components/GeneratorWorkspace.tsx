'use client';

import React, { useState, useEffect, useRef } from 'react';
import GeneratorConfig from './GeneratorConfig';
import GeneratorOutput from './GeneratorOutput';
import { useChat } from '@/lib/hooks/useChat';
import { toast } from 'sonner';

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

const contentTypeLabels: Record<string, string> = {
  'social-post': 'social media post',
  'ad-copy': 'ad copy',
  'email-subject': 'email subject line',
  'tagline': 'product tagline',
  'blog-intro': 'blog introduction',
};

const channelLabels: Record<string, string> = {
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  instagram: 'Instagram',
  email: 'Email',
  facebook: 'Facebook Ads',
  producthunt: 'Product Hunt',
};

const lengthInstructions: Record<string, string> = {
  short: 'Keep it under 150 characters.',
  medium: 'Aim for 150–400 characters.',
  long: 'Aim for 400–800 characters.',
};

function buildPrompt(config: GeneratorConfig): string {
  const contentLabel = contentTypeLabels[config.contentType] || config.contentType;
  const channelLabel = channelLabels[config.channel] || config.channel;
  const lengthHint = lengthInstructions[config.length] || '';

  return `You are an expert marketing copywriter for startups and founders.

Generate exactly 3 distinct variants of a ${contentLabel} for ${channelLabel}.

Brief / Context:
${config.brief}

Tone: ${config.toneOverride}
${lengthHint}

Rules:
- Each variant must be meaningfully different in angle, hook, or structure.
- Write only the final copy — no labels, no explanations, no meta-commentary.
- Separate each variant with exactly this delimiter on its own line: ---VARIANT---

Output format (strictly follow):
[Variant 1 text]
---VARIANT---
[Variant 2 text]
---VARIANT---
[Variant 3 text]`;
}

function parseVariants(raw: string): GeneratedVariant[] {
  const parts = raw.split('---VARIANT---').map(s => s.trim()).filter(Boolean);
  // Ensure we always have 3 variants
  while (parts.length < 3) {
    parts.push(parts[0] || 'Unable to generate this variant. Please try again.');
  }
  return parts.slice(0, 3).map((text, i) => ({
    id: `var-${Date.now()}-${i}`,
    text,
    characterCount: text.length,
  }));
}

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
  const pendingRegenId = useRef<string | null>(null);

  const { response, isLoading, error, sendMessage } = useChat(
    'GEMINI',
    'gemini/gemini-2.5-flash',
    false
  );

  // Show toast on AI error
  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to generate content. Please try again.');
      setIsGenerating(false);
    }
  }, [error]);

  // Handle AI response — full generation
  useEffect(() => {
    if (!isLoading && response && isGenerating) {
      const parsed = parseVariants(response);
      setVariants(parsed);
      setHasGenerated(true);
      setIsGenerating(false);
    }
  }, [isLoading, response]);

  // Handle AI response — single variant regeneration
  useEffect(() => {
    if (!isLoading && response && pendingRegenId.current) {
      const regenId = pendingRegenId.current;
      pendingRegenId.current = null;
      const newText = response.trim();
      setVariants(prev =>
        prev
          ? prev.map(v =>
              v.id === regenId
                ? { ...v, text: newText, characterCount: newText.length }
                : v
            )
          : prev
      );
      toast.success('Variant regenerated');
    }
  }, [isLoading, response]);

  const handleGenerate = () => {
    if (!config.brief.trim()) return;
    setIsGenerating(true);
    setVariants(null);
    pendingRegenId.current = null;

    const prompt = buildPrompt(config);
    sendMessage(
      [
        { role: 'system', content: 'You are an expert marketing copywriter for startups and founders. Follow the output format exactly.' },
        { role: 'user', content: prompt },
      ],
      { temperature: 0.85, max_tokens: 1500 }
    );
  };

  const handleRegenerateVariant = (variantId: string) => {
    if (!config.brief.trim()) return;
    pendingRegenId.current = variantId;

    const contentLabel = contentTypeLabels[config.contentType] || config.contentType;
    const channelLabel = channelLabels[config.channel] || config.channel;
    const lengthHint = lengthInstructions[config.length] || '';

    const prompt = `You are an expert marketing copywriter for startups and founders.

Write a single fresh variant of a ${contentLabel} for ${channelLabel}.

Brief / Context:
${config.brief}

Tone: ${config.toneOverride}
${lengthHint}

Output only the final copy — no labels, no explanations.`;

    sendMessage(
      [
        { role: 'system', content: 'You are an expert marketing copywriter. Output only the final copy, nothing else.' },
        { role: 'user', content: prompt },
      ],
      { temperature: 0.9, max_tokens: 600 }
    );
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