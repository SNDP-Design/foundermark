'use client';

import React, { useState } from 'react';
import { Copy, Check, Bookmark, RefreshCw, Sparkles, FileText } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/LoadingSkeleton';
import { toast } from 'sonner';
import { GeneratedVariant } from './GeneratorWorkspace';

const typeLabels: Record<string, string> = {
  'social-post': 'Social Post',
  'ad-copy': 'Ad Copy',
  'email-subject': 'Email Subject',
  'tagline': 'Tagline',
  'blog-intro': 'Blog Intro',
};

const channelLabels: Record<string, string> = {
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  instagram: 'Instagram',
  email: 'Email',
  facebook: 'Facebook Ads',
  producthunt: 'Product Hunt',
};

interface Props {
  variants: GeneratedVariant[] | null;
  isGenerating: boolean;
  hasGenerated: boolean;
  contentType: string;
  channel: string;
  onRegenerateVariant: (id: string) => void;
}

export default function GeneratorOutput({
  variants,
  isGenerating,
  hasGenerated,
  contentType,
  channel,
  onRegenerateVariant,
}: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [activeVariant, setActiveVariant] = useState(0);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success('Removed from library');
      } else {
        next.add(id);
        toast.success('Saved to library');
      }
      return next;
    });
  };

  const handleRegenerate = async (id: string) => {
    setRegeneratingId(id);
    await new Promise(r => setTimeout(r, 1200));
    onRegenerateVariant(id);
    setRegeneratingId(null);
    toast.success('Variant regenerated');
  };

  if (!hasGenerated && !isGenerating) {
    return (
      <div className="card-base h-full min-h-[480px] flex items-center justify-center">
        <EmptyState
          icon={Sparkles}
          title="No content generated yet"
          description="Fill in the config on the left and click Generate Content. The AI will create 3 unique variants for you to choose from."
          action={{ label: 'Start with an example brief', onClick: () => {} }}
        />
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="card-base p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles size={13} className="text-primary animate-pulse" />
          </div>
          <span className="text-sm font-semibold text-foreground">Generating 3 variants…</span>
        </div>
        {[0, 1, 2].map((i) => (
          <div key={`skel-${i}`} className="border border-border rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full ml-auto" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-3 w-20" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!variants) return null;

  return (
    <div className="card-base p-6 space-y-5 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-foreground">3 variants generated</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Pick the one that fits best, or regenerate any variant</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={contentType as 'social-post' | 'ad-copy' | 'email-subject' | 'tagline' | 'blog-intro'}>
            {typeLabels[contentType] || contentType}
          </Badge>
          <Badge variant={channel as 'linkedin' | 'twitter' | 'instagram' | 'email' | 'facebook'}>
            {channelLabels[channel] || channel}
          </Badge>
        </div>
      </div>

      {/* Variant tabs */}
      <div className="flex bg-muted rounded-xl p-1 gap-1">
        {variants.map((v, i) => (
          <button
            key={`vtab-${v.id}`}
            onClick={() => setActiveVariant(i)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-150 ${
              activeVariant === i
                ? 'bg-card text-foreground shadow-card'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Variant {i + 1}
            {savedIds.has(v.id) && (
              <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            )}
          </button>
        ))}
      </div>

      {/* Active variant */}
      {variants.map((variant, i) => (
        <div
          key={variant.id}
          className={`${activeVariant === i ? 'block fade-in' : 'hidden'}`}
        >
          <div className="border border-border rounded-2xl overflow-hidden">
            {/* Variant content */}
            <div className="p-5">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{variant.text}</p>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-muted/50 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-tabular">{variant.characterCount} chars</span>
                {savedIds.has(variant.id) && (
                  <span className="text-xs font-semibold text-primary flex items-center gap-1">
                    <Check size={11} /> Saved to library
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleRegenerate(variant.id)}
                  disabled={regeneratingId === variant.id}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-150 disabled:opacity-50"
                  aria-label="Regenerate this variant"
                  title="Regenerate this variant"
                >
                  <RefreshCw size={14} className={regeneratingId === variant.id ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={() => handleSave(variant.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
                    savedIds.has(variant.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label={savedIds.has(variant.id) ? 'Remove from library' : 'Save to library'}
                  title={savedIds.has(variant.id) ? 'Remove from library' : 'Save to library'}
                >
                  <Bookmark size={14} />
                </button>
                <button
                  onClick={() => handleCopy(variant.id, variant.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-violet-700 transition-all duration-150 active:scale-95"
                  aria-label="Copy to clipboard"
                >
                  {copiedId === variant.id ? (
                    <><Check size={12} /> Copied!</>
                  ) : (
                    <><Copy size={12} /> Copy</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Save all */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          {savedIds.size} of {variants.length} variants saved to library
        </p>
        <button
          onClick={() => {
            variants.forEach(v => {
              setSavedIds(prev => {
                const next = new Set(prev);
                next.add(v.id);
                return next;
              });
            });
            toast.success('All 3 variants saved to library');
          }}
          className="text-xs font-semibold text-primary hover:text-violet-700 transition-colors flex items-center gap-1"
        >
          <FileText size={12} /> Save all to library
        </button>
      </div>
    </div>
  );
}