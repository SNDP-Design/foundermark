'use client';

import React, { useState } from 'react';
import { Copy, Check, Bookmark, ExternalLink } from 'lucide-react';

const recentItems = [
  {
    id: 'content-001',
    type: 'social-post' as const,
    channel: 'linkedin' as const,
    channelLabel: 'LinkedIn',
    text: "We just crossed 500 beta signups for FounderMark — and we did it without spending a dollar on ads. Here's what worked: 1) Showed up daily in founder communities 2) Shared our failures, not just wins 3) Let the product speak through screenshots. Building in public isn't a growth hack — it's a trust strategy. 🚀",
    generatedAt: '2 hours ago',
    saved: true,
  },
  {
    id: 'content-002',
    type: 'ad-copy' as const,
    channel: 'facebook' as const,
    channelLabel: 'Facebook Ads',
    text: "Stop writing marketing copy from scratch. FounderMark's AI writes your social posts, ad creatives, and email subjects in seconds — trained on what actually converts for B2B SaaS. Try free for 14 days. No credit card required.",
    generatedAt: '3 hours ago',
    saved: false,
  },
  {
    id: 'content-003',
    type: 'email-subject' as const,
    channel: 'email' as const,
    channelLabel: 'Email',
    text: "Your competitors are already using AI to write marketing copy (here's how to catch up)",
    generatedAt: '5 hours ago',
    saved: true,
  },
  {
    id: 'content-004',
    type: 'tagline' as const,
    channel: 'twitter' as const,
    channelLabel: 'Twitter / X',
    text: "Ship faster. Market smarter. FounderMark turns your product vision into words that convert.",
    generatedAt: 'Yesterday',
    saved: false,
  },
  {
    id: 'content-005',
    type: 'blog-intro' as const,
    channel: 'linkedin' as const,
    channelLabel: 'LinkedIn',
    text: "Most first-time founders spend 80% of their time building and 20% on marketing. The problem? That ratio needs to flip the moment you launch. Here\'s how we changed our approach — and what we learned about getting early traction without a marketing budget.",
    generatedAt: 'Yesterday',
    saved: true,
  },
  {
    id: 'content-006',
    type: 'social-post' as const,
    channel: 'instagram' as const,
    channelLabel: 'Instagram',
    text: "The moment you realize your product solves a real problem is unlike anything else. We saw it when a founder told us she saved 4 hours a week using FounderMark. That's why we build. ✨ #founders #buildinpublic #startuplife",
    generatedAt: '2 days ago',
    saved: false,
  },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  'social-post': { bg: '#1a1a1a', color: '#ededed' },
  'ad-copy': { bg: '#1a1a1a', color: '#a3a3a3' },
  'email-subject': { bg: '#1a1a1a', color: '#737373' },
  'tagline': { bg: '#1a1a1a', color: '#8a8a8a' },
  'blog-intro': { bg: '#1a1a1a', color: '#8a8a8a' },
};

const typeLabels: Record<string, string> = {
  'social-post': 'Social Post',
  'ad-copy': 'Ad Copy',
  'email-subject': 'Email Subject',
  'tagline': 'Tagline',
  'blog-intro': 'Blog Intro',
};

export default function RecentGenerations() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(
    new Set(recentItems.filter(i => i.saved).map(i => i.id))
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="rounded-[11px] p-6" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.4px] mb-[4px]" style={{ color: '#8a8a8a' }}>Top Posts This Week</h4>
          <h2 className="text-[16px] font-bold tracking-[-0.3px]" style={{ color: '#ededed' }}>Recent Generations</h2>
        </div>
        <a href="/content-library" className="text-[12px] font-semibold flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: '#ededed' }}>
          View all <ExternalLink size={11} />
        </a>
      </div>

      {/* Table header */}
      <div className="grid gap-[10px] px-1 pb-2 mb-1 text-[10px] font-semibold uppercase tracking-[0.4px]" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid #1f1f1f', color: '#8a8a8a' }}>
        <span>Post</span>
        <span>Type</span>
        <span>Channel</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="flex flex-col">
        {recentItems.map((item, idx) => (
          <div
            key={item.id}
            className="grid gap-[10px] px-1 py-[8px] text-[11.5px] items-center group transition-colors hover:bg-[#0a0a0a] rounded-[6px]"
            style={{
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              borderTop: idx > 0 ? '1px solid #1a1a1a' : 'none',
            }}
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap font-medium" style={{ color: '#ededed' }}>
              {item.text.slice(0, 60)}{item.text.length > 60 ? '…' : ''}
            </span>
            <span>
              <span
                className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold"
                style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}
              >
                {typeLabels[item.type]}
              </span>
            </span>
            <span style={{ color: '#8a8a8a' }}>{item.channelLabel}</span>
            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleSave(item.id)}
                className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all duration-150"
                style={{
                  background: savedIds.has(item.id) ? '#ededed' : '#161616',
                  color: savedIds.has(item.id) ? '#0a0a0a' : '#8a8a8a',
                  border: '1px solid #1f1f1f',
                }}
                aria-label={savedIds.has(item.id) ? 'Remove from library' : 'Save to library'}
              >
                <Bookmark size={12} />
              </button>
              <button
                onClick={() => handleCopy(item.id, item.text)}
                className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all duration-150"
                style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}
                aria-label="Copy content"
              >
                {copiedId === item.id ? <Check size={12} style={{ color: '#4ade80' }} /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}