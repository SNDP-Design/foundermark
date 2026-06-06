'use client';

import React, { useState } from 'react';
import Toggle from '@/components/ui/Toggle';
import { Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';

type NotificationPref = {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
};

export default function PreferencesSettings() {
  const [defaultTone, setDefaultTone] = useState('confident');
  const [defaultChannel, setDefaultChannel] = useState('linkedin');
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<NotificationPref[]>([
    { key: 'notif-credits', label: 'Low credits warning', description: 'Get notified when you have fewer than 20 credits remaining', enabled: true },
    { key: 'notif-tips', label: 'Weekly content tips', description: 'Receive a weekly email with marketing tips for your stage', enabled: true },
    { key: 'notif-product', label: 'Product updates', description: 'Be the first to know about new content types and features', enabled: false },
    { key: 'notif-reset', label: 'Monthly credit reset', description: 'Get notified when your credits reset each month', enabled: true },
  ]);

  const toggleNotification = (key: string) => {
    setNotifications(prev => prev.map(n => n.key === key ? { ...n, enabled: !n.enabled } : n));
  };

  // Backend integration point: PUT /api/account/preferences
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSaving(false);
    setSavedAt('Just now');
    toast.success('Preferences saved');
  };

  const tones = [
    { key: 'pref-conf', value: 'confident', label: 'Confident' },
    { key: 'pref-fri', value: 'friendly', label: 'Friendly' },
    { key: 'pref-tech', value: 'technical', label: 'Technical' },
    { key: 'pref-insp', value: 'inspiring', label: 'Inspiring' },
    { key: 'pref-wit', value: 'witty', label: 'Witty' },
  ];

  const channels = [
    { key: 'pref-li', value: 'linkedin', label: 'LinkedIn' },
    { key: 'pref-tw', value: 'twitter', label: 'Twitter / X' },
    { key: 'pref-ig', value: 'instagram', label: 'Instagram' },
    { key: 'pref-em', value: 'email', label: 'Email' },
    { key: 'pref-fb', value: 'facebook', label: 'Facebook Ads' },
  ];

  return (
    <div className="space-y-5">
      {/* Default generation settings */}
      <div className="card-base p-6">
        <h2 className="text-base font-bold text-foreground mb-1">Generation Defaults</h2>
        <p className="text-xs text-muted-foreground mb-5">These defaults pre-fill the Content Generator each time you open it</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Default tone of voice</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setDefaultTone(t.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    defaultTone === t.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Default channel</label>
            <div className="flex flex-wrap gap-2">
              {channels.map((ch) => (
                <button
                  key={ch.key}
                  type="button"
                  onClick={() => setDefaultChannel(ch.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    defaultChannel === ch.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          {savedAt && (
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
              <Check size={13} /> Saved {savedAt}
            </span>
          )}
          {!savedAt && <span />}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary text-sm flex items-center gap-2 min-w-[130px] justify-center"
          >
            {isSaving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : 'Save Defaults'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card-base p-6">
        <h2 className="text-base font-bold text-foreground mb-1">Email Notifications</h2>
        <p className="text-xs text-muted-foreground mb-5">Control which emails FounderMark sends to nadia@buildfast.io</p>

        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.key} className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{notif.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
              </div>
              <Toggle
                checked={notif.enabled}
                onChange={() => {
                  toggleNotification(notif.key);
                  toast.success(`${notif.label} ${notif.enabled ? 'disabled' : 'enabled'}`);
                }}
                label={`Toggle ${notif.label}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}