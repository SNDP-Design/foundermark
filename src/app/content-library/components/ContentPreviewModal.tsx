'use client';

import React, { useState } from 'react';
import { Copy, Check, Star, Trash2, X } from 'lucide-react';
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
  item: LibraryItem | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ContentPreviewModal({ item, onClose, onToggleFavorite, onDelete }: Props) {
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.text).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFavorite = () => {
    onToggleFavorite(item.id);
    toast.success(item.favorited ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(item.id);
      onClose();
      toast.success('Content deleted from library');
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Content preview"
    >
      <div
        className="w-full max-w-2xl modal-content rounded-[16px] overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #2a2a2a', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #1f1f1f' }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
              {typeLabels[item.type]}
            </span>
            <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
              {item.channelLabel}
            </span>
            <span className="text-[11px]" style={{ color: '#8a8a8a' }}>{item.createdAt}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[8px] flex items-center justify-center transition-colors"
            style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}
            aria-label="Close preview"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-[13px] leading-relaxed whitespace-pre-wrap" style={{ color: '#ededed' }}>{item.text}</p>
        </div>

        {/* Stats */}
        <div className="px-6 pb-4">
          <div className="rounded-[10px] px-4 py-3 flex items-center gap-6" style={{ background: '#161616', border: '1px solid #1f1f1f' }}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4px] font-semibold" style={{ color: '#8a8a8a' }}>Characters</p>
              <p className="text-[14px] font-bold font-tabular" style={{ color: '#ededed' }}>{item.text.length}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4px] font-semibold" style={{ color: '#8a8a8a' }}>Words</p>
              <p className="text-[14px] font-bold font-tabular" style={{ color: '#ededed' }}>{item.text.split(/\s+/).filter(Boolean).length}</p>
            </div>
            {item.product && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.4px] font-semibold" style={{ color: '#8a8a8a' }}>Product</p>
                <p className="text-[14px] font-bold" style={{ color: '#ededed' }}>{item.product}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: '1px solid #1f1f1f' }}>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFavorite}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-[12px] font-semibold transition-all duration-150"
              style={{
                border: `1px solid ${item.favorited ? '#fbbf24' : '#1f1f1f'}`,
                background: item.favorited ? 'rgba(251, 191, 36, 0.08)' : 'transparent',
                color: item.favorited ? '#fbbf24' : '#8a8a8a',
              }}
            >
              <Star size={12} fill={item.favorited ? 'currentColor' : 'none'} />
              {item.favorited ? 'Favorited' : 'Add to favorites'}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-[12px] font-semibold transition-all duration-150"
              style={{
                border: `1px solid ${confirmDelete ? 'rgba(248, 113, 113, 0.3)' : '#1f1f1f'}`,
                background: confirmDelete ? 'rgba(248, 113, 113, 0.08)' : 'transparent',
                color: confirmDelete ? '#f87171' : '#8a8a8a',
              }}
            >
              <Trash2 size={12} />
              {confirmDelete ? 'Confirm delete' : 'Delete'}
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="btn-primary flex items-center gap-2 text-[13px]"
          >
            {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Content</>}
          </button>
        </div>
      </div>
    </div>
  );
}