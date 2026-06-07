'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Grid3X3, List, Loader2, X } from 'lucide-react';
import ContentCard from './ContentCard';
import ContentPreviewModal from './ContentPreviewModal';

import { BookOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type LibraryItem = {
  id: string;
  type: 'social-post' | 'ad-copy' | 'email-subject' | 'tagline' | 'blog-intro';
  channel: 'linkedin' | 'twitter' | 'instagram' | 'email' | 'facebook';
  channelLabel: string;
  text: string;
  createdAt: string;
  favorited: boolean;
  product: string;
};

const SAMPLE_ITEMS: LibraryItem[] = [
  {
    id: 'sample-1',
    type: 'social-post',
    channel: 'linkedin',
    channelLabel: 'LinkedIn',
    text: "Excited to share that we've just crossed 10,000 users on our platform! 🎉 Building in public has been one of the best decisions we made as founders. Every piece of feedback has shaped our product into something we're truly proud of. Thank you to every early adopter who believed in us. The journey is just beginning. #StartupLife #BuildInPublic #Milestone",
    createdAt: 'Jun 5, 2026',
    favorited: true,
    product: 'FounderMark',
  },
  {
    id: 'sample-2',
    type: 'ad-copy',
    channel: 'facebook',
    channelLabel: 'Facebook Ads',
    text: "Stop wasting hours writing marketing copy from scratch. FounderMark generates high-converting social posts, ad copy, and email subjects in seconds — trained on what actually works for B2B SaaS. Try it free for 14 days. No credit card required.",
    createdAt: 'Jun 4, 2026',
    favorited: false,
    product: 'FounderMark',
  },
  {
    id: 'sample-3',
    type: 'email-subject',
    channel: 'email',
    channelLabel: 'Email',
    text: "Your competitors are already using AI to write copy — here's how to catch up",
    createdAt: 'Jun 4, 2026',
    favorited: true,
    product: 'FounderMark',
  },
  {
    id: 'sample-4',
    type: 'tagline',
    channel: 'twitter',
    channelLabel: 'Twitter / X',
    text: "Marketing copy that converts — generated in seconds, not hours.",
    createdAt: 'Jun 3, 2026',
    favorited: false,
    product: 'FounderMark',
  },
  {
    id: 'sample-5',
    type: 'social-post',
    channel: 'instagram',
    channelLabel: 'Instagram',
    text: "The secret to consistent content? A system, not willpower. 💡 We built FounderMark so founders can focus on building — not staring at a blank page. Drop your product name and audience, and we'll handle the rest. Link in bio to try it free. ✨ #ContentMarketing #Founders #SaaS #MarketingTips",
    createdAt: 'Jun 3, 2026',
    favorited: false,
    product: 'FounderMark',
  },
  {
    id: 'sample-6',
    type: 'blog-intro',
    channel: 'linkedin',
    channelLabel: 'LinkedIn',
    text: "Most early-stage founders spend 40% of their week on marketing tasks that could be automated. In this post, I'll break down the exact AI-powered workflow we use at FounderMark to produce a week's worth of content in under 30 minutes — and how you can replicate it for your own startup.",
    createdAt: 'Jun 2, 2026',
    favorited: true,
    product: 'FounderMark',
  },
  {
    id: 'sample-7',
    type: 'ad-copy',
    channel: 'twitter',
    channelLabel: 'Twitter / X',
    text: "Founders: your product is great. Your copy shouldn't be the reason people don't buy. FounderMark writes the words that sell — so you can focus on what you do best. Start free →",
    createdAt: 'Jun 1, 2026',
    favorited: false,
    product: 'FounderMark',
  },
  {
    id: 'sample-8',
    type: 'email-subject',
    channel: 'email',
    channelLabel: 'Email',
    text: "We analyzed 500 SaaS landing pages — here's what the best ones have in common",
    createdAt: 'Jun 1, 2026',
    favorited: false,
    product: 'FounderMark',
  },
  {
    id: 'sample-9',
    type: 'social-post',
    channel: 'linkedin',
    channelLabel: 'LinkedIn',
    text: "Hot take: most startup marketing fails not because of budget, but because of inconsistency. Posting once a week when you feel inspired won't build an audience. What works: a repeatable system that produces quality content daily. That's exactly what we built FounderMark to solve. What's your biggest content challenge right now? 👇",
    createdAt: 'May 31, 2026',
    favorited: true,
    product: 'FounderMark',
  },
];

const typeFilters = [
  { key: 'filter-all', value: 'all', label: 'All' },
  { key: 'filter-social', value: 'social-post', label: 'Social Post' },
  { key: 'filter-ad', value: 'ad-copy', label: 'Ad Copy' },
  { key: 'filter-email', value: 'email-subject', label: 'Email Subject' },
  { key: 'filter-tagline', value: 'tagline', label: 'Tagline' },
  { key: 'filter-blog', value: 'blog-intro', label: 'Blog Intro' },
];

const channelFilters = [
  { key: 'chf-all', value: 'all', label: 'All Channels' },
  { key: 'chf-li', value: 'linkedin', label: 'LinkedIn' },
  { key: 'chf-tw', value: 'twitter', label: 'Twitter / X' },
  { key: 'chf-ig', value: 'instagram', label: 'Instagram' },
  { key: 'chf-em', value: 'email', label: 'Email' },
  { key: 'chf-fb', value: 'facebook', label: 'Facebook Ads' },
];

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export default function ContentLibraryView() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    const loadLibrary = async () => {
      if (!user) {
        setItems(SAMPLE_ITEMS);
        setIsLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('library_items')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (!error) {
          const mapped: LibraryItem[] = (data || []).map(row => ({
            id: row.id,
            type: row.content_type as LibraryItem['type'],
            channel: row.channel as LibraryItem['channel'],
            channelLabel: row.channel_label,
            text: row.text,
            createdAt: formatDate(row.created_at),
            favorited: row.favorited,
            product: row.product || '',
          }));
          setItems(mapped.length > 0 ? mapped : SAMPLE_ITEMS);
        }
      } catch (err: any) {
        console.log('Library load error:', err.message);
        setItems(SAMPLE_ITEMS);
      } finally {
        setIsLoading(false);
      }
    };
    loadLibrary();
  }, [user]);

  // Real-time sync
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('library_items_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'library_items', filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const row = payload.new as any;
            const newItem: LibraryItem = {
              id: row.id,
              type: row.content_type as LibraryItem['type'],
              channel: row.channel as LibraryItem['channel'],
              channelLabel: row.channel_label,
              text: row.text,
              createdAt: formatDate(row.created_at),
              favorited: row.favorited,
              product: row.product || '',
            };
            setItems(prev => {
              if (prev.some(i => i.id === newItem.id)) return prev;
              return [newItem, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            const row = payload.new as any;
            setItems(prev =>
              prev.map(i =>
                i.id === row.id
                  ? {
                      ...i,
                      type: row.content_type as LibraryItem['type'],
                      channel: row.channel as LibraryItem['channel'],
                      channelLabel: row.channel_label,
                      text: row.text,
                      favorited: row.favorited,
                      product: row.product || '',
                    }
                  : i
              )
            );
          } else if (payload.eventType === 'DELETE') {
            const oldRow = payload.old as any;
            setItems(prev => prev.filter(i => i.id !== oldRow.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const filtered = useMemo(() => {
    let result = items;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(i => i.text.toLowerCase().includes(q));
    }
    if (typeFilter !== 'all') result = result.filter(i => i.type === typeFilter);
    if (channelFilter !== 'all') result = result.filter(i => i.channel === channelFilter);
    if (favoritesOnly) result = result.filter(i => i.favorited);
    if (sortBy === 'newest') result = [...result].sort((a, b) => b.id.localeCompare(a.id));
    if (sortBy === 'oldest') result = [...result].sort((a, b) => a.id.localeCompare(b.id));
    return result;
  }, [items, search, typeFilter, channelFilter, favoritesOnly, sortBy]);

  const handleToggleFavorite = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const newFavorited = !item.favorited;
    setItems(prev => prev.map(i => i.id === id ? { ...i, favorited: newFavorited } : i));
    await supabase.from('library_items').update({ favorited: newFavorited }).eq('id', id);
  };

  const handleDelete = async (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
    await supabase.from('library_items').delete().eq('id', id);
  };

  const hasActiveFilters = search || typeFilter !== 'all' || channelFilter !== 'all' || favoritesOnly;

  if (isLoading) {
    return (
      <div className="rounded-[14px] p-10 text-center" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <Loader2 size={24} className="animate-spin mx-auto" style={{ color: '#8a8a8a' }} />
        <p className="text-[13px] mt-3" style={{ color: '#8a8a8a' }}>Loading your library…</p>
      </div>
    );
  }

  return (
    <>
      {/* Search + controls + filters — single row */}
      <div className="flex items-center gap-2 mb-3 flex-wrap justify-start">
        {/* Search */}
        <div className="relative min-w-[160px] w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#8a8a8a' }} />
          <input
            type="text"
            placeholder="Search saved content…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-[10px] text-[13px] outline-none transition-colors"
            style={{
              background: '#0d0d0d',
              border: '1px solid #1f1f1f',
              color: '#ededed',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: '#8a8a8a' }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Type filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {typeFilters.map(f => (
            <button
              key={f.key}
              onClick={() => setTypeFilter(f.value)}
              className="flex-shrink-0 px-3 py-2.5 rounded-[10px] text-[11px] font-semibold transition-all whitespace-nowrap"
              style={{
                background: typeFilter === f.value ? '#ededed' : '#0d0d0d',
                color: typeFilter === f.value ? '#0a0a0a' : '#8a8a8a',
                border: `1px solid ${typeFilter === f.value ? '#ededed' : '#1f1f1f'}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Channel filter */}
        <select
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
          className="px-3 py-2.5 rounded-[10px] text-[12px] outline-none transition-colors"
          style={{
            background: '#0d0d0d',
            border: '1px solid #1f1f1f',
            color: '#8a8a8a',
          }}
        >
          {channelFilters.map(f => (
            <option key={f.key} value={f.value}>{f.label}</option>
          ))}
        </select>

        {/* Favorites toggle */}
        <button
          onClick={() => setFavoritesOnly(!favoritesOnly)}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-[10px] text-[12px] font-semibold transition-all"
          style={{
            background: favoritesOnly ? 'rgba(251,191,36,0.1)' : '#0d0d0d',
            border: `1px solid ${favoritesOnly ? 'rgba(251,191,36,0.4)' : '#1f1f1f'}`,
            color: favoritesOnly ? '#fbbf24' : '#8a8a8a',
          }}
        >
          ★ Fav
        </button>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={() => { setSearch(''); setTypeFilter('all'); setChannelFilter('all'); setFavoritesOnly(false); }}
            className="flex items-center gap-1 px-3 py-2.5 rounded-[10px] text-[11px] font-semibold transition-opacity hover:opacity-70"
            style={{
              background: '#0d0d0d',
              border: '1px solid #1f1f1f',
              color: '#ededed',
            }}
          >
            <X size={11} /> Clear
          </button>
        )}

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2.5 rounded-[10px] text-[12px] outline-none transition-colors"
          style={{
            background: '#0d0d0d',
            border: '1px solid #1f1f1f',
            color: '#8a8a8a',
          }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        {/* View mode */}
        <div className="flex rounded-[10px] p-[3px]" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
          <button
            onClick={() => setViewMode('grid')}
            className="w-8 h-8 rounded-[7px] flex items-center justify-center transition-all"
            style={{
              background: viewMode === 'grid' ? '#1f1f1f' : 'transparent',
              color: viewMode === 'grid' ? '#ededed' : '#8a8a8a',
            }}
            aria-label="Grid view"
          >
            <Grid3X3 size={13} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className="w-8 h-8 rounded-[7px] flex items-center justify-center transition-all"
            style={{
              background: viewMode === 'list' ? '#1f1f1f' : 'transparent',
              color: viewMode === 'list' ? '#ededed' : '#8a8a8a',
            }}
            aria-label="List view"
          >
            <List size={13} />
          </button>
        </div>
      </div>

      {/* Content grid/list */}
      {filtered.length === 0 ? (
        <div className="rounded-[14px] p-12 text-center" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
          <div className="w-12 h-12 rounded-[12px] flex items-center justify-center mx-auto mb-4" style={{ background: '#161616', border: '1px solid #1f1f1f' }}>
            <BookOpen size={20} style={{ color: '#8a8a8a' }} />
          </div>
          <h3 className="text-[15px] font-bold mb-2" style={{ color: '#ededed' }}>
            {items.length === 0 ? 'Your library is empty' : 'No content matches your filters'}
          </h3>
          <p className="text-[13px] max-w-[320px] mx-auto" style={{ color: '#8a8a8a' }}>
            {items.length === 0
              ? 'Generate content and save your favorites here for easy access and reuse.'
              : 'Try adjusting your search or filters to find what you\'re looking for.'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => { setSearch(''); setTypeFilter('all'); setChannelFilter('all'); setFavoritesOnly(false); }}
              className="mt-4 px-4 py-2 rounded-[8px] text-[12px] font-semibold transition-all hover:opacity-80"
              style={{ background: '#1f1f1f', color: '#ededed', border: '1px solid #2a2a2a' }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3' : 'space-y-2'}>
          {filtered.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              viewMode={viewMode}
              onPreview={() => setSelectedItem(item)}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <ContentPreviewModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}