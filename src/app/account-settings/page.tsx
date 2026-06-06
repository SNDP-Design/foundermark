import React from 'react';
import AppLayout from '@/components/AppLayout';
import AccountSettingsView from './components/AccountSettingsView';

export default function AccountSettingsPage() {
  return (
    <AppLayout>
      <div className="fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Account Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your profile, security, subscription, and preferences.</p>
        </div>
        <AccountSettingsView />
      </div>
    </AppLayout>
  );
}