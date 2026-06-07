'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Send,
  Calendar,
  X,
  AlertCircle,
  Loader2,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// SVG icons for social platforms
function LinkedInIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface Platform {
  id: 'linkedin' | 'twitter' | 'instagram';
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  bg: string;
  dot: string;
  charLimit: number;
  hint: string;
}

interface LibraryItem {
  id: string;
  text: string;
  channel: string;
  channelLabel: string;
  type: string;
  createdAt: string;
}

interface ScheduledPost {
  id: string;
  platform: 'linkedin' | 'twitter' | 'instagram';
  text: string;
  scheduledAt: string;
  status: 'scheduled' | 'published' | 'failed';
}

interface ConnectedAccount {
  platform: 'linkedin' | 'twitter' | 'instagram';
  handle: string;
  connected: boolean;
}

const PLATFORMS: Platform[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: LinkedInIcon,
    color: '#0a66c2',
    bg: 'rgba(10,102,194,0.08)',
    dot: '#0a66c2',
    charLimit: 3000,
    hint: 'Professional tone works best. Use line breaks for readability. Hashtags at the end.',
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    icon: TwitterIcon,
    color: '#1da1f2',
    bg: 'rgba(29,161,242,0.08)',
    dot: '#1da1f2',
    charLimit: 280,
    hint: 'Keep it punchy. Max 280 characters. 1–2 hashtags max. Threads work great for longer content.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: InstagramIcon,
    color: '#e1306c',
    bg: 'rgba(225,48,108,0.08)',
    dot: '#e1306c',
    charLimit: 2200,
    hint: 'Visual-first. Lead with a hook. Use line breaks. 5–10 hashtags in caption or first comment.',
  },
];

const SAMPLE_LIBRARY: LibraryItem[] = [
  {
    id: 'sl-1',
    text: "Excited to share that we've just crossed 10,000 users on our platform! 🎉 Building in public has been one of the best decisions we made as founders. Every piece of feedback has shaped our product into something we're truly proud of. #StartupLife #BuildInPublic",
    channel: 'linkedin',
    channelLabel: 'LinkedIn',
    type: 'social-post',
    createdAt: 'Jun 5, 2026',
  },
  {
    id: 'sl-2',
    text: "The secret to consistent content? A system, not willpower. 💡 We built FounderMark so founders can focus on building — not staring at a blank page. Link in bio to try it free. ✨ #ContentMarketing #Founders",
    channel: 'instagram',
    channelLabel: 'Instagram',
    type: 'social-post',
    createdAt: 'Jun 3, 2026',
  },
  {
    id: 'sl-3',
    text: "Founders: your product is great. Your copy shouldn't be the reason people don't buy. FounderMark writes the words that sell — so you can focus on what you do best. Start free →",
    channel: 'twitter',
    channelLabel: 'Twitter / X',
    type: 'ad-copy',
    createdAt: 'Jun 1, 2026',
  },
  {
    id: 'sl-4',
    text: "Hot take: most startup marketing fails not because of budget, but because of inconsistency. Posting once a week when you feel inspired won't build an audience. What works: a repeatable system. That's exactly what we built FounderMark to solve.",
    channel: 'linkedin',
    channelLabel: 'LinkedIn',
    type: 'social-post',
    createdAt: 'May 31, 2026',
  },
];

const SAMPLE_SCHEDULED: ScheduledPost[] = [
  { id: 'sp-1', platform: 'linkedin', text: "Building in public update: shipped 3 new features this week...", scheduledAt: '2026-06-07T09:00', status: 'scheduled' },
  { id: 'sp-2', platform: 'twitter', text: "Founders: your product is great. Your copy shouldn't be...", scheduledAt: '2026-06-06T14:30', status: 'published' },
  { id: 'sp-3', platform: 'instagram', text: "The secret to consistent content? A system, not willpower...", scheduledAt: '2026-06-06T11:00', status: 'failed' },
];

function formatScheduledDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

export default function SocialPublishingView() {
  const { user } = useAuth();
  const supabase = createClient();

  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([
    { platform: 'linkedin', handle: '', connected: false },
    { platform: 'twitter', handle: '', connected: false },
    { platform: 'instagram', handle: '', connected: false },
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState<'linkedin' | 'twitter' | 'instagram'>('linkedin');
  const [postText, setPostText] = useState('');
  const [scheduleMode, setScheduleMode] = useState<'now' | 'schedule'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [showLibraryPicker, setShowLibraryPicker] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(SAMPLE_SCHEDULED);
  const [isPublishing, setIsPublishing] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'compose' | 'queue'>('compose');

  const platform = PLATFORMS.find(p => p.id === selectedPlatform)!;
  const charCount = postText.length;
  const charOver = charCount > platform.charLimit;

  useEffect(() => {
    const loadLibrary = async () => {
      if (!user) {
        setLibraryItems(SAMPLE_LIBRARY);
        return;
      }
      try {
        const { data } = await supabase
          .from('library_items')
          .select('id, text, channel, channel_label, content_type, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);
        if (data && data.length > 0) {
          setLibraryItems(data.map((r: any) => ({
            id: r.id,
            text: r.text,
            channel: r.channel,
            channelLabel: r.channel_label,
            type: r.content_type,
            createdAt: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          })));
        } else {
          setLibraryItems(SAMPLE_LIBRARY);
        }
      } catch {
        setLibraryItems(SAMPLE_LIBRARY);
      }
    };
    loadLibrary();
  }, [user]);

  const handleConnect = (platformId: 'linkedin' | 'twitter' | 'instagram') => {
    setConnectingPlatform(platformId);
    setTimeout(() => {
      const handles: Record<string, string> = {
        linkedin: 'yourname',
        twitter: '@yourhandle',
        instagram: '@yourhandle',
      };
      setConnectedAccounts(prev =>
        prev.map(a => a.platform === platformId ? { ...a, connected: true, handle: handles[platformId] } : a)
      );
      setConnectingPlatform(null);
    }, 1500);
  };

  const handleDisconnect = (platformId: 'linkedin' | 'twitter' | 'instagram') => {
    setConnectedAccounts(prev =>
      prev.map(a => a.platform === platformId ? { ...a, connected: false, handle: '' } : a)
    );
  };

  const handlePickFromLibrary = (item: LibraryItem) => {
    setPostText(item.text);
    const match = PLATFORMS.find(p => p.id === item.channel);
    if (match) setSelectedPlatform(match.id);
    setShowLibraryPicker(false);
  };

  const handlePublish = async () => {
    if (!postText.trim() || charOver) return;
    const account = connectedAccounts.find(a => a.platform === selectedPlatform);
    if (!account?.connected) return;

    setIsPublishing(true);
    await new Promise(r => setTimeout(r, 1800));

    const newPost: ScheduledPost = {
      id: `sp-${Date.now()}`,
      platform: selectedPlatform,
      text: postText,
      scheduledAt: scheduleMode === 'schedule' && scheduledDate && scheduledTime
        ? `${scheduledDate}T${scheduledTime}`
        : new Date().toISOString(),
      status: scheduleMode === 'now' ? 'published' : 'scheduled',
    };

    setScheduledPosts(prev => [newPost, ...prev]);
    setPostText('');
    setIsPublishing(false);
    setActiveTab('queue');
  };

  const currentAccount = connectedAccounts.find(a => a.platform === selectedPlatform);

  return (
    <div className="space-y-6">
      {/* Connected Accounts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PLATFORMS.map(p => {
          const account = connectedAccounts.find(a => a.platform === p.id)!;
          const PIcon = p.icon;
          const isConnecting = connectingPlatform === p.id;
          return (
            <div
              key={p.id}
              className="rounded-[14px] p-4 flex items-center gap-3"
              style={{ background: '#ffffff', border: `1px solid ${account.connected ? p.dot + '33' : '#e5e7eb'}` }}
            >
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ background: account.connected ? p.bg : '#f3f4f6' }}
              >
                <PIcon size={16} color={account.connected ? p.color : '#9ca3af'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold truncate" style={{ color: account.connected ? '#111111' : '#6b7280' }}>
                  {p.label}
                </p>
                {account.connected ? (
                  <p className="text-[11px] truncate" style={{ color: p.color }}>{account.handle}</p>
                ) : (
                  <p className="text-[11px]" style={{ color: '#9ca3af' }}>Not connected</p>
                )}
              </div>
              {account.connected ? (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <CheckCircle2 size={13} style={{ color: '#16a34a' }} />
                  <button
                    onClick={() => handleDisconnect(p.id)}
                    className="text-[10px] px-2 py-1 rounded-[6px] transition-all hover:opacity-80"
                    style={{ background: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb' }}
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleConnect(p.id)}
                  disabled={isConnecting}
                  className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-[8px] transition-all hover:opacity-90 flex-shrink-0 disabled:opacity-60"
                  style={{ background: p.bg, color: p.color, border: `1px solid ${p.dot}33` }}
                >
                  {isConnecting ? <Loader2 size={11} className="animate-spin" /> : <ExternalLink size={11} />}
                  {isConnecting ? 'Connecting…' : 'Connect'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-[10px] w-fit" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}>
        {(['compose', 'queue'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-1.5 rounded-[8px] text-[12px] font-semibold capitalize transition-all"
            style={activeTab === tab
              ? { background: '#ffffff', color: '#111111', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }
              : { color: '#6b7280', border: '1px solid transparent' }}
          >
            {tab === 'queue' ? `Queue (${scheduledPosts.length})` : 'Compose'}
          </button>
        ))}
      </div>

      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          {/* Compose Panel */}
          <div className="rounded-[16px] p-5 space-y-4" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
            {/* Platform selector */}
            <div>
              <p className="text-[11px] font-semibold mb-2" style={{ color: '#9ca3af' }}>PLATFORM</p>
              <div className="flex gap-2 flex-wrap">
                {PLATFORMS.map(p => {
                  const PIcon = p.icon;
                  const active = selectedPlatform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlatform(p.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-[10px] text-[12px] font-semibold transition-all"
                      style={active
                        ? { background: p.bg, color: p.color, border: `1px solid ${p.dot}55` }
                        : { background: '#f9fafb', color: '#6b7280', border: '1px solid #e5e7eb' }}
                    >
                      <PIcon size={13} color={active ? p.color : '#9ca3af'} />
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platform hint */}
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-[10px]" style={{ background: platform.bg, border: `1px solid ${platform.dot}22` }}>
              <Sparkles size={12} style={{ color: platform.color, marginTop: 2, flexShrink: 0 }} />
              <p className="text-[11.5px] leading-relaxed" style={{ color: platform.color }}>{platform.hint}</p>
            </div>

            {/* Text area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold" style={{ color: '#9ca3af' }}>CONTENT</p>
                <button
                  onClick={() => setShowLibraryPicker(true)}
                  className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-[7px] transition-all hover:opacity-80"
                  style={{ background: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb' }}
                >
                  <RefreshCw size={10} />
                  Pull from Library
                </button>
              </div>
              <textarea
                value={postText}
                onChange={e => setPostText(e.target.value)}
                placeholder={`Write your ${platform.label} post here…`}
                rows={7}
                className="w-full resize-none rounded-[12px] px-4 py-3 text-[13px] leading-relaxed outline-none transition-all"
                style={{
                  background: '#f9fafb',
                  border: `1px solid ${charOver ? '#dc2626' : '#e5e7eb'}`,
                  color: '#111111',
                  caretColor: platform.color,
                }}
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[11px]">
                  {charOver && <span style={{ color: '#dc2626' }}>Over limit by {charCount - platform.charLimit} chars</span>}
                </span>
                <span className="text-[11px] font-tabular" style={{ color: charOver ? '#dc2626' : '#9ca3af' }}>
                  {charCount} / {platform.charLimit}
                </span>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <p className="text-[11px] font-semibold mb-2" style={{ color: '#9ca3af' }}>PUBLISH TIME</p>
              <div className="flex gap-2 mb-3">
                {(['now', 'schedule'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setScheduleMode(mode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-semibold transition-all"
                    style={scheduleMode === mode
                      ? { background: '#111111', color: '#ffffff', border: '1px solid #111111' }
                      : { background: 'transparent', color: '#6b7280', border: '1px solid #e5e7eb' }}
                  >
                    {mode === 'now' ? <Send size={11} /> : <Calendar size={11} />}
                    {mode === 'now' ? 'Publish Now' : 'Schedule'}
                  </button>
                ))}
              </div>
              {scheduleMode === 'schedule' && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-[10px] text-[12px] outline-none"
                    style={{ background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111111' }}
                  />
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={e => setScheduledTime(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-[10px] text-[12px] outline-none"
                    style={{ background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111111' }}
                  />
                </div>
              )}
            </div>

            {/* Connect warning */}
            {!currentAccount?.connected && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px]" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <AlertCircle size={13} style={{ color: '#dc2626', flexShrink: 0 }} />
                <p className="text-[12px]" style={{ color: '#dc2626' }}>Connect your {platform.label} account above to publish.</p>
              </div>
            )}

            {/* Publish button */}
            <button
              onClick={handlePublish}
              disabled={!postText.trim() || charOver || !currentAccount?.connected || isPublishing}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: currentAccount?.connected ? platform.bg : '#f3f4f6', color: currentAccount?.connected ? platform.color : '#9ca3af', border: `1px solid ${currentAccount?.connected ? platform.dot + '44' : '#e5e7eb'}` }}
            >
              {isPublishing ? (
                <><Loader2 size={14} className="animate-spin" /> Publishing…</>
              ) : scheduleMode === 'schedule' ? (
                <><Clock size={14} /> Schedule Post</>
              ) : (
                <><Send size={14} /> Publish to {platform.label}</>
              )}
            </button>
          </div>

          {/* Preview Panel */}
          <div className="rounded-[16px] p-5 space-y-4" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
            <p className="text-[11px] font-semibold" style={{ color: '#9ca3af' }}>PREVIEW</p>
            <div className="rounded-[12px] p-4 space-y-3" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: platform.bg }}>
                  <platform.icon size={14} color={platform.color} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold" style={{ color: '#111111' }}>
                    {currentAccount?.connected ? currentAccount.handle : 'Your Name'}
                  </p>
                  <p className="text-[10px]" style={{ color: '#9ca3af' }}>{platform.label}</p>
                </div>
              </div>
              <p className="text-[12.5px] leading-relaxed whitespace-pre-wrap" style={{ color: postText ? '#374151' : '#9ca3af' }}>
                {postText || `Your ${platform.label} post will appear here…`}
              </p>
              {postText && (
                <div className="pt-2" style={{ borderTop: '1px solid #e5e7eb' }}>
                  <div className="h-[2px] rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min((charCount / platform.charLimit) * 100, 100)}%`,
                        background: charOver ? '#dc2626' : platform.dot,
                      }}
                    />
                  </div>
                  <p className="text-[10px] mt-1 text-right" style={{ color: charOver ? '#dc2626' : '#9ca3af' }}>
                    {charCount}/{platform.charLimit}
                  </p>
                </div>
              )}
            </div>

            {/* Formatting tips */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold" style={{ color: '#9ca3af' }}>FORMATTING TIPS</p>
              {selectedPlatform === 'linkedin' && (
                <ul className="space-y-1.5">
                  {['Use line breaks every 1–2 sentences', 'Add hashtags at the end (3–5 max)', 'Start with a hook or bold statement', 'Tag people with @mention'].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11.5px]" style={{ color: '#6b7280' }}>
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#0a66c2' }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
              {selectedPlatform === 'twitter' && (
                <ul className="space-y-1.5">
                  {['Stay under 280 characters', 'Use 1–2 hashtags max', 'Add a clear CTA or question', 'Use threads for longer content'].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11.5px]" style={{ color: '#6b7280' }}>
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#1da1f2' }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
              {selectedPlatform === 'instagram' && (
                <ul className="space-y-1.5">
                  {['Lead with a strong first line', 'Use emojis to break up text', '5–10 hashtags in caption', 'Add a CTA before hashtags'].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11.5px]" style={{ color: '#6b7280' }}>
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#e1306c' }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'queue' && (
        <div className="rounded-[16px] overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
          <div className="px-5 py-4" style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
            <p className="text-[13px] font-semibold" style={{ color: '#111111' }}>Scheduled & Published Posts</p>
            <p className="text-[11.5px] mt-0.5" style={{ color: '#9ca3af' }}>
              {scheduledPosts.filter(p => p.status === 'scheduled').length} scheduled · {scheduledPosts.filter(p => p.status === 'published').length} published
            </p>
          </div>
          {scheduledPosts.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3" style={{ background: '#fafafa' }}>
              <Calendar size={28} style={{ color: '#d1d5db' }} />
              <p className="text-[13px]" style={{ color: '#9ca3af' }}>No posts scheduled yet</p>
            </div>
          ) : (
            <div className="divide-y" style={{ background: '#fafafa', borderColor: '#e5e7eb' }}>
              {scheduledPosts.map(post => {
                const p = PLATFORMS.find(pl => pl.id === post.platform)!;
                const PIcon = p.icon;
                const statusColors: Record<string, string> = { scheduled: '#d97706', published: '#16a34a', failed: '#dc2626' };
                return (
                  <div key={post.id} className="px-5 py-4 flex items-start gap-4" style={{ borderColor: '#e5e7eb' }}>
                    <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: p.bg }}>
                      <PIcon size={14} color={p.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] leading-relaxed line-clamp-2" style={{ color: '#374151' }}>{post.text}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: '#9ca3af' }}>
                          <Clock size={10} />
                          {formatScheduledDate(post.scheduledAt)}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize"
                          style={{ background: statusColors[post.status] + '18', color: statusColors[post.status] }}
                        >
                          {post.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Library Picker Modal */}
      {showLibraryPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="w-full max-w-lg rounded-[18px] overflow-hidden" style={{ background: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #e5e7eb' }}>
              <p className="text-[14px] font-semibold" style={{ color: '#111111' }}>Pick from Library</p>
              <button
                onClick={() => setShowLibraryPicker(false)}
                className="w-7 h-7 rounded-[7px] flex items-center justify-center transition-all hover:bg-[#f3f4f6]"
                style={{ color: '#9ca3af' }}
              >
                <X size={14} />
              </button>
            </div>
            <div className="max-h-[400px] overflow-y-auto divide-y" style={{ borderColor: '#e5e7eb' }}>
              {libraryItems.map(item => {
                const p = PLATFORMS.find(pl => pl.id === item.channel);
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePickFromLibrary(item)}
                    className="w-full text-left px-5 py-4 transition-all hover:bg-[#f9fafb] flex items-start gap-3"
                  >
                    {p && (
                      <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: p.bg }}>
                        <p.icon size={12} color={p.color} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] leading-relaxed line-clamp-2" style={{ color: '#374151' }}>{item.text}</p>
                      <p className="text-[11px] mt-1" style={{ color: '#9ca3af' }}>{item.channelLabel} · {item.createdAt}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
