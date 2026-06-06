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

  const actionBtns = (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
      <button
        onClick={handleFavorite}
        className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all duration-150"
        style={{ background: '#161616', border: '1px solid #1f1f1f', color: item.favorited ? '#fbbf24' : '#8a8a8a' }}
        aria-label="Toggle favorite"
      >
        <Star size={12} fill={item.favorited ? 'currentColor' : 'none'} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPreview(); }}
        className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all duration-150"
        style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}
        aria-label="Preview full content"
      >
        <Expand size={12} />
      </button>
      <button
        onClick={handleCopy}
        className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all duration-150"
        style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}
        aria-label="Copy content"
      >
        {copied ? <Check size={12} style={{ color: '#4ade80' }} /> : <Copy size={12} />}
      </button>
      <button
        onClick={handleDelete}
        className="w-7 h-7 rounded-[6px] flex items-center justify-center transition-all duration-150"
        style={{
          background: confirmDelete ? 'rgba(248, 113, 113, 0.1)' : '#161616',
          border: `1px solid ${confirmDelete ? 'rgba(248, 113, 113, 0.3)' : '#1f1f1f'}`,
          color: confirmDelete ? '#f87171' : '#8a8a8a',
        }}
        aria-label="Delete content"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div
        className="group rounded-[11px] p-4 flex items-start gap-4 cursor-pointer transition-all duration-200 hover:border-[#3a3a3a]"
        style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}
        onClick={onPreview}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
              {typeLabels[item.type]}
            </span>
            <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
              {item.channelLabel}
            </span>
            <span className="text-[11px] ml-auto" style={{ color: '#8a8a8a' }}>{item.createdAt}</span>
          </div>
          <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: '#ededed' }}>{item.text}</p>
        </div>
        {actionBtns}
      </div>
    );
  }

  return (
    <div
      className="group rounded-[14px] p-4 cursor-pointer flex flex-col transition-all duration-300 hover:border-[#3a3a3a] hover:-translate-y-1"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f', boxShadow: 'none' }}
      onClick={onPreview}
    >
      {/* Type & channel badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
          {typeLabels[item.type]}
        </span>
        <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
          {item.channelLabel}
        </span>
        {item.favorited && (
          <span className="ml-auto" style={{ color: '#fbbf24' }}>
            <Star size={12} fill="currentColor" />
          </span>
        )}
      </div>

      {/* Content preview */}
      <p className="text-[13px] leading-relaxed line-clamp-4 flex-1 mb-3" style={{ color: '#ededed' }}>
        {item.text}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: '1px solid #1f1f1f' }}>
        <span className="text-[11px]" style={{ color: '#8a8a8a' }}>{item.createdAt}</span>
        {actionBtns}
      </div>
    </div>
  );
}