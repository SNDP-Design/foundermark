'use client';

import React, { useState } from 'react';
import { Copy, Check, Star, Trash2, Expand } from 'lucide-react';
import { LibraryItem } from './ContentLibraryView';
import { toast } from 'sonner';

const typeLabels: Record<string, string> = {
  'social-post': 'Social Post',
  'ad-copy': 'Ad Copy',
  'email-subject': 'Email Subject',
  'tagline': 'Tagline',
  'blog-intro': 'Blog Intro',
};

const channelAccents: Record<string, { bg: string; color: string; dot: string }> = {
  linkedin:  { bg: 'rgba(10,102,194,0.12)',  color: '#5b9bd5', dot: '#0a66c2' },
  twitter:   { bg: 'rgba(29,161,242,0.10)',  color: '#5bb8f5', dot: '#1da1f2' },
  instagram: { bg: 'rgba(225,48,108,0.10)',  color: '#e1306c', dot: '#e1306c' },
  email:     { bg: 'rgba(74,222,128,0.10)',  color: '#4ade80', dot: '#4ade80' },
  facebook:  { bg: 'rgba(66,103,178,0.12)',  color: '#7b9fd4', dot: '#4267b2' },
};

interface Props {
  item: LibraryItem;
  viewMode: 'grid' | 'list';
  onPreview: () => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ContentCard({ item, viewMode, onPreview, onToggleFavorite, onDelete }: Props) {
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const accent = channelAccents[item.channel] || { bg: 'rgba(255,255,255,0.05)', color: '#8a8a8a', dot: '#8a8a8a' };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.text).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(item.id);
    toast.success(item.favorited ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmDelete) {
      onDelete(item.id);
      toast.success('Content deleted from library');
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  if (viewMode === 'list') {
    return (
      <div
        className="group rounded-[12px] px-4 py-3 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:border-[#2a2a2a]"
        style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}
        onClick={onPreview}
      >
        {/* Channel dot */}
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: accent.dot }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] leading-relaxed line-clamp-1" style={{ color: '#ededed' }}>{item.text}</p>
        </div>

        {/* Meta */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: accent.bg, color: accent.color }}
          >
            {item.channelLabel}
          </span>
          <span className="text-[11px]" style={{ color: '#5a5a5a' }}>{item.createdAt}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" onClick={e => e.stopPropagation()}>
          <button
            onClick={handleFavorite}
            className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all"
            style={{ color: item.favorited ? '#fbbf24' : '#5a5a5a' }}
            aria-label="Toggle favorite"
          >
            <Star size={12} fill={item.favorited ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleCopy}
            className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all"
            style={{ color: '#5a5a5a' }}
            aria-label="Copy content"
          >
            {copied ? <Check size={12} style={{ color: '#4ade80' }} /> : <Copy size={12} />}
          </button>
          <button
            onClick={handleDelete}
            className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all"
            style={{ color: confirmDelete ? '#f87171' : '#5a5a5a' }}
            aria-label="Delete content"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group rounded-[14px] cursor-pointer flex flex-col transition-all duration-300 hover:border-[#2a2a2a] hover:-translate-y-0.5 overflow-hidden"
      style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}
      onClick={onPreview}
    >
      {/* Channel accent header strip */}
      <div
        className="px-4 pt-3 pb-2.5 flex items-center justify-between"
        style={{ borderBottom: '1px solid #141414' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: accent.dot }}
          />
          <span
            className="text-[11px] font-semibold"
            style={{ color: accent.color }}
          >
            {item.channelLabel}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{ background: '#161616', color: '#5a5a5a', border: '1px solid #1f1f1f' }}
          >
            {typeLabels[item.type]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {item.favorited && (
            <Star size={11} fill="currentColor" style={{ color: '#fbbf24' }} />
          )}
        </div>
      </div>

      {/* Content preview */}
      <div className="px-4 py-3 flex-1">
        <p className="text-[13px] leading-[1.65] line-clamp-4" style={{ color: '#c8c8c8' }}>
          {item.text}
        </p>
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ borderTop: '1px solid #141414' }}
      >
        <span className="text-[11px]" style={{ color: '#5a5a5a' }}>{item.createdAt}</span>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
          <button
            onClick={handleFavorite}
            className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all hover:bg-[#161616]"
            style={{ color: item.favorited ? '#fbbf24' : '#5a5a5a' }}
            aria-label="Toggle favorite"
          >
            <Star size={12} fill={item.favorited ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all hover:bg-[#161616]"
            style={{ color: '#5a5a5a' }}
            aria-label="Preview full content"
          >
            <Expand size={12} />
          </button>
          <button
            onClick={handleCopy}
            className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all hover:bg-[#161616]"
            style={{ color: '#5a5a5a' }}
            aria-label="Copy content"
          >
            {copied ? <Check size={12} style={{ color: '#4ade80' }} /> : <Copy size={12} />}
          </button>
          <button
            onClick={handleDelete}
            className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all hover:bg-[#161616]"
            style={{ color: confirmDelete ? '#f87171' : '#5a5a5a' }}
            aria-label="Delete content"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}