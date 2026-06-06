'use client';

import React, { useState } from 'react';
import { Copy, Check, Star, Trash2, Expand } from 'lucide-react';
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

  if (viewMode === 'list') {
    return (
      <div
        className="group card-base p-4 flex items-start gap-4 cursor-pointer hover:border-violet-700/50 hover:bg-violet-900/10 transition-all duration-150"
        onClick={onPreview}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Badge variant={item.type}>{typeLabels[item.type]}</Badge>
            <Badge variant={item.channel}>{item.channelLabel}</Badge>
            <span className="text-xs text-muted-foreground ml-auto">{item.createdAt}</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed line-clamp-2">{item.text}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
          <button onClick={handleFavorite} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 ${item.favorited ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'}`} aria-label="Toggle favorite" title="Toggle favorite">
            <Star size={13} fill={item.favorited ? 'currentColor' : 'none'} />
          </button>
          <button onClick={handleCopy} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-150" aria-label="Copy content" title="Copy to clipboard">
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
          <button onClick={handleDelete} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 ${confirmDelete ? 'bg-rose-900/40 text-rose-400' : 'hover:bg-muted text-muted-foreground hover:text-rose-400'}`} aria-label="Delete content" title={confirmDelete ? 'Click again to confirm deletion' : 'Delete this content'}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group card-base p-4 cursor-pointer content-card-hover hover:border-violet-700/50 transition-all duration-150 flex flex-col"
      onClick={onPreview}
    >
      {/* Type & channel badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Badge variant={item.type}>{typeLabels[item.type]}</Badge>
        <Badge variant={item.channel}>{item.channelLabel}</Badge>
        {item.favorited && (
          <span className="ml-auto text-amber-500">
            <Star size={13} fill="currentColor" />
          </span>
        )}
      </div>

      {/* Content preview */}
      <p className="text-sm text-foreground leading-relaxed line-clamp-4 flex-1 mb-3">
        {item.text}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <span className="text-xs text-muted-foreground">{item.createdAt}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
          <button onClick={handleFavorite} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 ${item.favorited ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'}`} aria-label="Toggle favorite" title="Toggle favorite">
            <Star size={13} fill={item.favorited ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-150"
            aria-label="Preview full content"
            title="Preview full content"
          >
            <Expand size={13} />
          </button>
          <button onClick={handleCopy} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-150" aria-label="Copy content" title="Copy to clipboard">
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
          <button onClick={handleDelete} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 ${confirmDelete ? 'bg-rose-900/40 text-rose-400' : 'hover:bg-muted text-muted-foreground hover:text-rose-400'}`} aria-label="Delete content" title={confirmDelete ? 'Click again to confirm deletion' : 'Delete this content'}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}