'use client';

import React, { useState } from 'react';
import { Copy, Check, Bookmark, ExternalLink } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { toast } from 'sonner';

// Backend integration point: fetch /api/content/recent?limit=6
const recentItems = [
  {
    id: 'content-001',
    type: 'social-post' as const,
    channel: 'linkedin' as const,
    channelLabel: 'LinkedIn',
    text: "We just crossed 500 beta signups for BuildFast — and we did it without spending a dollar on ads. Here's what worked: 1) Showed up daily in founder communities 2) Shared our failures, not just wins 3) Let the product speak through screenshots. Building in public isn't a growth hack — it's a trust strategy. 🚀",
    generatedAt: '2 hours ago',
    saved: true,
  },
  {
    id: 'content-002',
    type: 'ad-copy' as const,
    channel: 'facebook' as const,
    channelLabel: 'Facebook Ads',
    text: "Stop writing marketing copy from scratch. BuildFast's AI writes your social posts, ad creatives, and email subjects in seconds — trained on what actually converts for B2B SaaS. Try free for 14 days. No credit card required.",
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
    text: "Ship faster. Market smarter. BuildFast turns your product vision into words that convert.",
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
    text: "The moment you realize your product solves a real problem is unlike anything else. We saw it when a founder told us she saved 4 hours a week using BuildFast. That's why we build. ✨ #founders #buildinpublic #startuplife",
    generatedAt: '2 days ago',
    saved: false,
  },
];

export default function RecentGenerations() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(
    new Set(recentItems.filter(i => i.saved).map(i => i.id))
  );

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

  const typeLabels: Record<string, string> = {
    'social-post': 'Social Post',
    'ad-copy': 'Ad Copy',
    'email-subject': 'Email Subject',
    'tagline': 'Tagline',
    'blog-intro': 'Blog Intro',
  };

  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-foreground">Recent Generations</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Your latest AI-generated content pieces</p>
        </div>
        <a href="/content-library" className="text-xs font-semibold text-primary hover:text-violet-700 transition-colors flex items-center gap-1">
          View all <ExternalLink size={11} />
        </a>
      </div>
      <div className="space-y-3">
        {recentItems.map((item) => (
          <div
            key={item.id}
            className="group flex items-start gap-4 p-4 rounded-xl border border-border hover:border-violet-700/50 hover:bg-violet-900/10 transition-all duration-150"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant={item.type}>{typeLabels[item.type]}</Badge>
                <Badge variant={item.channel}>{item.channelLabel}</Badge>
                <span className="text-xs text-muted-foreground ml-auto">{item.generatedAt}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed line-clamp-2">{item.text}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleSave(item.id)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 ${
                  savedIds.has(item.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
                aria-label={savedIds.has(item.id) ? 'Remove from library' : 'Save to library'}
                title={savedIds.has(item.id) ? 'Remove from library' : 'Save to library'}
              >
                <Bookmark size={13} />
              </button>
              <button
                onClick={() => handleCopy(item.id, item.text)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-150"
                aria-label="Copy content"
                title="Copy to clipboard"
              >
                {copiedId === item.id ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}