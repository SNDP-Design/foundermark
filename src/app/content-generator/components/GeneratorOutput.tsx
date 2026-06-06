'use client';

import React, { useState } from 'react';
import { Copy, Check, Bookmark, RefreshCw, Sparkles, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/LoadingSkeleton';
import { GeneratedVariant } from './GeneratorWorkspace';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [activeVariant, setActiveVariant] = useState(0);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [allSaved, setAllSaved] = useState(false);
  const { user } = useAuth();
  const supabase = createClient();

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleSave = async (variant: GeneratedVariant) => {
    if (!user) return;
    const id = variant.id;
    if (savedIds.has(id)) {
      setSavedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
      return;
    }
    setSavingIds(prev => { const next = new Set(prev); next.add(id); return next; });
    try {
      // Ensure user profile exists (required by FK constraint)
      await supabase.from('user_profiles').upsert(
        { id: user.id, email: user.email ?? '', full_name: user.user_metadata?.full_name ?? '' },
        { onConflict: 'id', ignoreDuplicates: true }
      );

      const { error } = await supabase.from('library_items').insert({
        user_id: user.id,
        content_type: contentType,
        channel: channel,
        channel_label: channelLabels[channel] || channel,
        text: variant.text,
        product: '',
        favorited: false,
      });
      if (error) {
        toast.error('Failed to save to library. Please try again.');
      } else {
        setSavedIds(prev => { const next = new Set(prev); next.add(id); return next; });
        toast.success('Saved to library!');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSavingIds(prev => { const next = new Set(prev); next.delete(id); return next; });
    }
  };

  const handleSaveAll = async () => {
    if (!user || !variants || isSavingAll || allSaved) return;
    setIsSavingAll(true);
    try {
      // Ensure user profile exists (required by FK constraint)
      await supabase.from('user_profiles').upsert(
        { id: user.id, email: user.email ?? '', full_name: user.user_metadata?.full_name ?? '' },
        { onConflict: 'id', ignoreDuplicates: true }
      );

      const rows = variants.map((variant) => ({
        user_id: user.id,
        content_type: contentType,
        channel: channel,
        channel_label: channelLabels[channel] || channel,
        text: variant.text,
        product: '',
        favorited: false,
      }));
      const { error } = await supabase.from('library_items').insert(rows);
      if (error) {
        toast.error('Failed to save variants. Please try again.');
      } else {
        const allIds = new Set(variants.map((v) => v.id));
        setSavedIds(allIds);
        setAllSaved(true);
        toast.success('All 3 variants saved to your library!');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSavingAll(false);
    }
  };

  const handleRegenerate = async (id: string) => {
    setRegeneratingId(id);
    await new Promise(r => setTimeout(r, 1200));
    onRegenerateVariant(id);
    setRegeneratingId(null);
  };

  if (!hasGenerated && !isGenerating) {
    return (
      <div className="rounded-[14px] min-h-[480px] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <div className="text-center px-8">
          <div className="w-12 h-12 rounded-[12px] flex items-center justify-center mx-auto mb-4" style={{ background: '#161616', border: '1px solid #1f1f1f' }}>
            <Sparkles size={20} style={{ color: '#8a8a8a' }} />
          </div>
          <h3 className="text-[16px] font-bold mb-2" style={{ color: '#ededed' }}>No content generated yet</h3>
          <p className="text-[13px] max-w-[280px]" style={{ color: '#8a8a8a' }}>
            Fill in the config on the left and click Generate Content. The AI will create 3 unique variants for you.
          </p>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="rounded-[14px] p-6 space-y-5" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#1f1f1f' }}>
            <Sparkles size={13} className="animate-pulse" style={{ color: '#ededed' }} />
          </div>
          <span className="text-[13px] font-semibold" style={{ color: '#ededed' }}>Generating 3 variants…</span>
        </div>
        {[0, 1, 2].map((i) => (
          <div key={`skel-${i}`} className="rounded-[12px] p-5 space-y-3" style={{ border: '1px solid #1f1f1f' }}>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    );
  }

  if (!variants) return null;

  return (
    <div className="rounded-[14px] p-6 space-y-5 fade-in" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-bold tracking-[-0.2px]" style={{ color: '#ededed' }}>3 variants generated</h2>
          <p className="text-[12px] mt-[2px]" style={{ color: '#8a8a8a' }}>Pick the one that fits best, or regenerate any variant</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
            {typeLabels[contentType] || contentType}
          </span>
          <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
            {channelLabels[channel] || channel}
          </span>
          {/* Save All to Library button */}
          <button
            onClick={handleSaveAll}
            disabled={isSavingAll || allSaved || !user}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-all duration-150"
            style={{
              background: allSaved ? '#ededed' : '#161616',
              border: `1px solid ${allSaved ? '#ededed' : '#1f1f1f'}`,
              color: allSaved ? '#0a0a0a' : '#8a8a8a',
              opacity: isSavingAll ? 0.7 : 1,
              cursor: allSaved ? 'default' : 'pointer',
            }}
          >
            {isSavingAll ? (
              <Loader2 size={11} className="animate-spin" />
            ) : allSaved ? (
              <Check size={11} />
            ) : (
              <Bookmark size={11} />
            )}
            {isSavingAll ? 'Saving…' : allSaved ? 'Saved to Library' : 'Save to Library'}
          </button>
        </div>
      </div>

      {/* Variant tabs */}
      <div className="flex rounded-[10px] p-[3px] gap-[2px]" style={{ background: '#161616', border: '1px solid #1f1f1f' }}>
        {variants.map((v, i) => (
          <button
            key={`vtab-${v.id}`}
            onClick={() => setActiveVariant(i)}
            className="flex-1 py-2 text-[12px] font-semibold rounded-[8px] transition-all duration-150"
            style={{
              background: activeVariant === i ? 'linear-gradient(#1c1c1c, #141414)' : 'transparent',
              color: activeVariant === i ? '#ededed' : '#8a8a8a',
              boxShadow: activeVariant === i ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'none',
            }}
          >
            Variant {i + 1}
            {savedIds.has(v.id) && (
              <span className="ml-1.5 w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#4ade80' }} />
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
          <div className="rounded-[12px] overflow-hidden" style={{ border: '1px solid #1f1f1f' }}>
            <div className="p-5">
              <p className="text-[13px] leading-relaxed whitespace-pre-wrap" style={{ color: '#ededed' }}>{variant.text}</p>
            </div>
            <div className="px-5 py-3 flex items-center justify-between" style={{ background: '#0a0a0a', borderTop: '1px solid #1f1f1f' }}>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-tabular" style={{ color: '#8a8a8a' }}>{variant.characterCount} chars</span>
                {savedIds.has(variant.id) && (
                  <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: '#4ade80' }}>
                    <Check size={11} /> Saved
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRegenerate(variant.id)}
                  disabled={regeneratingId === variant.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-all duration-150"
                  style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}
                >
                  <RefreshCw size={11} className={regeneratingId === variant.id ? 'animate-spin' : ''} />
                  Regenerate
                </button>
                <button
                  onClick={() => handleSave(variant)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-all duration-150"
                  style={{
                    background: savedIds.has(variant.id) ? '#ededed' : '#161616',
                    border: `1px solid ${savedIds.has(variant.id) ? '#ededed' : '#1f1f1f'}`,
                    color: savedIds.has(variant.id) ? '#0a0a0a' : '#8a8a8a',
                  }}
                >
                  <Bookmark size={11} />
                  {savedIds.has(variant.id) ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() => handleCopy(variant.id, variant.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-all duration-150"
                  style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}
                >
                  {copiedId === variant.id ? <Check size={11} style={{ color: '#4ade80' }} /> : <Copy size={11} />}
                  {copiedId === variant.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}