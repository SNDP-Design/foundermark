'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Grid3X3, List, Loader2 } from 'lucide-react';
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

const typeFilters = [
  { key: 'filter-all', value: 'all', label: 'All Types' },
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
      if (!user) { setIsLoading(false); return; }
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
          setItems(mapped);
        }
      } catch (err: any) {
        console.log('Library load error:', err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadLibrary();
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
      {/* Toolbar */}
      <div className="rounded-[14px] p-4 mb-5" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8a8a8a' }} />
            <input
              type="text"
              placeholder="Search your saved content…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base pl-9 text-[13px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Type filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input-base text-[12px] py-2 w-auto min-w-[130px]"
            >
              {typeFilters.map(f => <option key={f.key} value={f.value}>{f.label}</option>)}
            </select>

            {/* Channel filter */}
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="input-base text-[12px] py-2 w-auto min-w-[130px]"
            >
              {channelFilters.map(f => <option key={f.key} value={f.value}>{f.label}</option>)}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-base text-[12px] py-2 w-auto min-w-[110px]"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>

            {/* Favorites toggle */}
            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-[12px] font-semibold transition-all duration-150"
              style={{
                border: `1px solid ${favoritesOnly ? '#5a5a5a' : '#1f1f1f'}`,
                background: favoritesOnly ? '#1f1f1f' : 'transparent',
                color: favoritesOnly ? '#ededed' : '#8a8a8a',
              }}
            >
              ★ Favorites
            </button>

            {/* View mode */}
            <div className="flex rounded-[8px] p-[3px]" style={{ background: '#161616', border: '1px solid #1f1f1f' }}>
              <button
                onClick={() => setViewMode('grid')}
                className="w-8 h-8 rounded-[6px] flex items-center justify-center transition-all duration-150"
                style={{
                  background: viewMode === 'grid' ? '#0d0d0d' : 'transparent',
                  color: viewMode === 'grid' ? '#ededed' : '#8a8a8a',
                }}
                aria-label="Grid view"
              >
                <Grid3X3 size={13} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="w-8 h-8 rounded-[6px] flex items-center justify-center transition-all duration-150"
                style={{
                  background: viewMode === 'list' ? '#0d0d0d' : 'transparent',
                  color: viewMode === 'list' ? '#ededed' : '#8a8a8a',
                }}
                aria-label="List view"
              >
                <List size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid #1f1f1f' }}>
          <p className="text-[11px]" style={{ color: '#8a8a8a' }}>
            Showing <span className="font-semibold" style={{ color: '#ededed' }}>{filtered.length}</span> of{' '}
            <span className="font-semibold" style={{ color: '#ededed' }}>{items.length}</span> saved pieces
          </p>
          {(search || typeFilter !== 'all' || channelFilter !== 'all' || favoritesOnly) && (
            <button
              onClick={() => { setSearch(''); setTypeFilter('all'); setChannelFilter('all'); setFavoritesOnly(false); }}
              className="text-[11px] font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#ededed' }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Content grid/list */}
      {filtered.length === 0 ? (
        <div className="rounded-[14px] p-10 text-center" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
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
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
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