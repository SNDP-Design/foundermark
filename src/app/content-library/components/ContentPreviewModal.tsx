'use client';

import React, { useState } from 'react';
import { Copy, Check, Star, Trash2, X } from 'lucide-react';
import Badge from '@/components/ui/Badge';
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
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Content preview"
    >
      <div
        className="bg-card rounded-2xl shadow-modal w-full max-w-2xl modal-content"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={item.type}>{typeLabels[item.type]}</Badge>
            <Badge variant={item.channel}>{item.channelLabel}</Badge>
            <span className="text-xs text-muted-foreground">{item.createdAt}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Close preview"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{item.text}</p>
        </div>

        {/* Stats */}
        <div className="px-6 pb-4">
          <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-6">
            <div>
              <p className="text-xs text-muted-foreground">Characters</p>
              <p className="text-sm font-bold font-tabular text-foreground">{item.text.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Words</p>
              <p className="text-sm font-bold font-tabular text-foreground">{item.text.split(/\s+/).filter(Boolean).length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Product</p>
              <p className="text-sm font-bold text-foreground">{item.product}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleFavorite}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                item.favorited
                  ? 'border-amber-400 bg-amber-50 text-amber-700' :'border-border text-muted-foreground hover:border-amber-300 hover:text-amber-600'
              }`}
            >
              <Star size={13} fill={item.favorited ? 'currentColor' : 'none'} />
              {item.favorited ? 'Favorited' : 'Add to favorites'}
            </button>
            <button
              onClick={handleDelete}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                confirmDelete
                  ? 'border-rose-400 bg-rose-50 text-rose-600' :'border-border text-muted-foreground hover:border-rose-300 hover:text-rose-500'
              }`}
            >
              <Trash2 size={13} />
              {confirmDelete ? 'Confirm delete' : 'Delete'}
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-violet-700 transition-all duration-150 active:scale-95"
          >
            {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Content</>}
          </button>
        </div>
      </div>
    </div>
  );
}