'use client';

import React, { useState, useMemo } from 'react';
import { Search, Grid3X3, List } from 'lucide-react';
import ContentCard from './ContentCard';
import ContentPreviewModal from './ContentPreviewModal';
import EmptyState from '@/components/ui/EmptyState';
import { BookOpen } from 'lucide-react';

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

// Backend integration point: fetch /api/content/library
const allItems: LibraryItem[] = [
  { id: 'lib-001', type: 'social-post', channel: 'linkedin', channelLabel: 'LinkedIn', text: "We've been building in public for 60 days — and here's the honest truth about what's working.\n\nWe launched BuildFast to solve the problem every solo developer faces: spending 3–4 weeks on auth, payments, and email before you can even start building your real product.\n\nSince launch:\n→ 500+ developers signed up\n→ 12 products shipped using our boilerplate\n→ Average time-to-launch: 4 days (vs. industry average of 3 weeks)", createdAt: 'Jun 6, 2026', favorited: true, product: 'BuildFast' },
  { id: 'lib-002', type: 'ad-copy', channel: 'facebook', channelLabel: 'Facebook Ads', text: "Stop writing marketing copy from scratch. BuildFast's AI writes your social posts, ad creatives, and email subjects in seconds — trained on what actually converts for B2B SaaS. Try free for 14 days. No credit card required.", createdAt: 'Jun 5, 2026', favorited: false, product: 'BuildFast' },
  { id: 'lib-003', type: 'email-subject', channel: 'email', channelLabel: 'Email', text: "Your competitors are already using AI to write marketing copy (here's how to catch up)", createdAt: 'Jun 5, 2026', favorited: true, product: 'BuildFast' },
  { id: 'lib-004', type: 'tagline', channel: 'twitter', channelLabel: 'Twitter / X', text: "Ship faster. Market smarter. BuildFast turns your product vision into words that convert.", createdAt: 'Jun 4, 2026', favorited: false, product: 'BuildFast' },
  { id: 'lib-005', type: 'blog-intro', channel: 'linkedin', channelLabel: 'LinkedIn', text: "Most first-time founders spend 80% of their time building and 20% on marketing. The problem? That ratio needs to flip the moment you launch. Here's how we changed our approach — and what we learned about getting early traction without a marketing budget.", createdAt: 'Jun 4, 2026', favorited: true, product: 'BuildFast' },
  { id: 'lib-006', type: 'social-post', channel: 'instagram', channelLabel: 'Instagram', text: "The moment you realize your product solves a real problem is unlike anything else. We saw it when a founder told us she saved 4 hours a week using BuildFast. That's why we build. ✨ #founders #buildinpublic #startuplife", createdAt: 'Jun 3, 2026', favorited: false, product: 'BuildFast' },
  { id: 'lib-007', type: 'ad-copy', channel: 'twitter', channelLabel: 'Twitter / X', text: "Tired of spending weeks on boilerplate? BuildFast ships with everything: auth, Stripe, email, admin. Your idea deserves to be live — not stuck in setup hell. Free beta. No card required.", createdAt: 'Jun 3, 2026', favorited: true, product: 'BuildFast' },
  { id: 'lib-008', type: 'social-post', channel: 'linkedin', channelLabel: 'LinkedIn', text: "Hot take: most developers don't have a skills problem. They have a time problem.\n\nYou know how to build auth. You know how to wire up Stripe. You know how to configure email. But doing all of that before you can ship your actual idea? That's 3 weeks of momentum you can't get back.", createdAt: 'Jun 2, 2026', favorited: false, product: 'BuildFast' },
  { id: 'lib-009', type: 'email-subject', channel: 'email', channelLabel: 'Email', text: "You've been putting off your SaaS launch for 3 months (let's fix that today)", createdAt: 'Jun 2, 2026', favorited: false, product: 'BuildFast' },
  { id: 'lib-010', type: 'tagline', channel: 'linkedin', channelLabel: 'LinkedIn', text: "From idea to production in 4 days. No boilerplate required.", createdAt: 'Jun 1, 2026', favorited: true, product: 'BuildFast' },
  { id: 'lib-011', type: 'blog-intro', channel: 'linkedin', channelLabel: 'LinkedIn', text: "I used to think the hardest part of building a SaaS was the idea. Then I spent 3 weeks setting up authentication and realized I was completely wrong. The hardest part is getting past the infrastructure so you can actually build the thing people want.", createdAt: 'May 31, 2026', favorited: false, product: 'BuildFast' },
  { id: 'lib-012', type: 'social-post', channel: 'twitter', channelLabel: 'Twitter / X', text: "To every developer who has ever set up authentication for the 5th time:\n\nWe see you. We've been you.\n\nBuildFast is the boilerplate we wish existed when we started. Auth, payments, email, admin dashboard — all wired together, production-ready, in one repo.\n\nShip your SaaS in days, not months.", createdAt: 'May 30, 2026', favorited: true, product: 'BuildFast' },
  { id: 'lib-013', type: 'ad-copy', channel: 'facebook', channelLabel: 'Facebook Ads', text: "500 developers launched their SaaS using BuildFast. Average time from signup to first user: 4 days. What are you waiting for? Start free — no credit card, no lock-in, no boilerplate.", createdAt: 'May 29, 2026', favorited: false, product: 'BuildFast' },
  { id: 'lib-014', type: 'email-subject', channel: 'email', channelLabel: 'Email', text: "We just made it 3x easier to launch your SaaS (no, really)", createdAt: 'May 28, 2026', favorited: true, product: 'BuildFast' },
];

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

export default function ContentLibraryView() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [items, setItems] = useState<LibraryItem[]>(allItems);

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

  const handleToggleFavorite = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, favorited: !item.favorited } : item
    ));
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
  };

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
                  ? 'border-amber-400 bg-amber-50 text-amber-700' :'border-border text-muted-foreground hover:border-amber-300'
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
          title="No content matches your filters"
          description="Try adjusting your search or filters. Your saved content will appear here once you generate and save pieces from the Content Generator."
          action={{
            label: 'Clear all filters',
            onClick: () => { setSearch(''); setTypeFilter('all'); setChannelFilter('all'); setFavoritesOnly(false); },
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