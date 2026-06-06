import React from 'react';
import AppLayout from '@/components/AppLayout';
import ContentLibraryView from './components/ContentLibraryView';

export default function ContentLibraryPage() {
  return (
    <AppLayout>
      <div className="fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Content Library</h1>
          <p className="text-sm text-muted-foreground mt-1">All your saved marketing content in one place. Copy, reuse, or export anytime.</p>
        </div>
        <ContentLibraryView />
      </div>
    </AppLayout>
  );
}