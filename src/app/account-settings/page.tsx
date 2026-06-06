import React from 'react';
import AppLayout from '@/components/AppLayout';
import AccountSettingsView from './components/AccountSettingsView';

export default function AccountSettingsPage() {
  return (
    <AppLayout>
      <div className="fade-in">
        <div className="mb-6">
          <p className="text-[12px] font-medium mb-[6px]" style={{ color: '#8a8a8a' }}>Account · Settings</p>
          <h1 className="text-[22px] font-bold tracking-[-0.4px]" style={{ color: '#ededed' }}>Account Settings</h1>
          <p className="text-[13px] mt-[4px]" style={{ color: '#8a8a8a' }}>Manage your profile, security, subscription, and preferences.</p>
        </div>
        <AccountSettingsView />
      </div>
    </AppLayout>
  );
}