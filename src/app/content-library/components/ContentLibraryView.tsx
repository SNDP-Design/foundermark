'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Grid3X3, List, Loader2 } from 'lucide-react';
import ContentCard from './ContentCard';
import ContentPreviewModal from './ContentPreviewModal';
import EmptyState from '@/components/ui/EmptyState';
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

        if (error) {
          console.log('Load library error:', error.message);
          setItems([]);
        } else {
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
        setItems([]);
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
    const { error } = await supabase
      .from('library_items')
      .update({ favorited: newFavorited })
      .eq('id', id);
    if (error) {
      console.log('Toggle favorite error:', error.message);
      setItems(prev => prev.map(i => i.id === id ? { ...i, favorited: item.favorited } : i));
    }
  };

  const handleDelete = async (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
    const { error } = await supabase.from('library_items').delete().eq('id', id);
    if (error) {
      console.log('Delete library item error:', error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="card-base p-10 text-center">
        <Loader2 size={24} className="animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground mt-3">Loading your library…</p>
      </div>
    );
  }

  return (
    <>
      {/* Toolbar */}
      <div className="card-base p-4 mb-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your saved content…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base pl-9 text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Type filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input-base text-xs py-2 w-auto min-w-[130px]"
            >
              {typeFilters.map(f => <option key={f.key} value={f.value}>{f.label}</option>)}
            </select>

            {/* Channel filter */}
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="input-base text-xs py-2 w-auto min-w-[130px]"
            >
              {channelFilters.map(f => <option key={f.key} value={f.value}>{f.label}</option>)}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-base text-xs py-2 w-auto min-w-[110px]"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>

            {/* Favorites toggle */}
            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                favoritesOnly
                  ? 'border-amber-400 bg-amber-900/30 text-amber-400' :'border-border text-muted-foreground hover:border-amber-600'
              }`}
            >
              ★ Favorites
            </button>

            {/* View mode */}
            <div className="flex bg-muted rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
                  viewMode === 'grid' ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
                  viewMode === 'list' ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="List view"
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{' '}
            <span className="font-semibold text-foreground">{items.length}</span> saved pieces
          </p>
          {(search || typeFilter !== 'all' || channelFilter !== 'all' || favoritesOnly) && (
            <button
              onClick={() => { setSearch(''); setTypeFilter('all'); setChannelFilter('all'); setFavoritesOnly(false); }}
              className="text-xs text-primary hover:text-violet-700 font-semibold transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Content grid/list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={items.length === 0 ? 'Your library is empty' : 'No content matches your filters'}
          description={
            items.length === 0
              ? 'Generate content in the Content Generator and save variants to build your library.'
              : 'Try adjusting your search or filters. Your saved content will appear here once you generate and save pieces from the Content Generator.'
          }
          action={{
            label: items.length === 0 ? 'Go to Content Generator' : 'Clear all filters',
            onClick: items.length === 0
              ? () => { window.location.href = '/content-generator'; }
              : () => { setSearch(''); setTypeFilter('all'); setChannelFilter('all'); setFavoritesOnly(false); },
          }}
        />
      ) : (
        <div className={
          viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4' :'space-y-3'
        }>
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

      {/* Preview modal */}
      <ContentPreviewModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDelete}
      />
    </>
  );
}