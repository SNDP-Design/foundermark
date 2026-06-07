'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import Toggle from '@/components/ui/Toggle';
import { toast } from 'sonner';

type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function SecuritySettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<PasswordData>({ mode: 'onBlur' });

  const onSubmit = handleSubmit(async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1600));
    setIsSubmitting(false);
    reset();
    toast.success('Password updated.');
  });

  return (
    <div className="space-y-5">
      {/* Password change */}
      <div className="rounded-[14px] p-6" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ background: '#161616', border: '1px solid #1f1f1f' }}>
            <Shield size={14} style={{ color: '#ededed' }} />
          </div>
          <div>
            <h2 className="text-[15px] font-bold" style={{ color: '#ededed' }}>Change Password</h2>
            <p className="text-[11px]" style={{ color: '#8a8a8a' }}>Use a strong password you don't use elsewhere</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {[
            { id: 'currentPassword', label: 'Current password', show: showCurrent, toggle: () => setShowCurrent(!showCurrent), placeholder: 'Enter your current password', rules: { required: 'Current password is required' }, error: errors.currentPassword },
            { id: 'newPassword', label: 'New password', show: showNew, toggle: () => setShowNew(!showNew), placeholder: 'Create a new password', rules: { required: 'New password is required', minLength: { value: 8, message: 'Must be at least 8 characters' } }, error: errors.newPassword },
            { id: 'confirmPassword', label: 'Confirm new password', show: showConfirm, toggle: () => setShowConfirm(!showConfirm), placeholder: 'Repeat your new password', rules: { required: 'Please confirm your new password', validate: (v: string) => v === watch('newPassword') || 'Passwords do not match' }, error: errors.confirmPassword },
          ].map((field) => (
            <div key={field.id}>
              <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }} htmlFor={field.id}>{field.label}</label>
              <div className="relative">
                <input
                  id={field.id}
                  type={field.show ? 'text' : 'password'}
                  className="input-base pr-10"
                  placeholder={field.placeholder}
                  {...register(field.id as keyof PasswordData, field.rules)}
                />
                <button type="button" onClick={field.toggle} className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: '#8a8a8a' }} aria-label="Toggle visibility">
                  {field.show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {field.error && <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{field.error.message}</p>}
            </div>
          ))}

          <div className="flex justify-end">
            <button type="submit" disabled={isSubmitting} className="btn-primary text-[13px] flex items-center gap-2 min-w-[160px] justify-center">
              {isSubmitting ? <><Loader2 size={14} className="animate-spin" /> Updating…</> : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* 2FA */}
      <div className="rounded-[14px] p-6" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold" style={{ color: '#ededed' }}>Two-factor authentication</h3>
            <p className="text-[11px] mt-[2px]" style={{ color: '#8a8a8a' }}>Add an extra layer of security with an authenticator app</p>
          </div>
          <Toggle
            checked={twoFAEnabled}
            onChange={(v) => {
              setTwoFAEnabled(v);
              toast.success(v ? '2FA enabled' : '2FA disabled');
            }}
            label="Toggle two-factor authentication"
          />
        </div>
        {twoFAEnabled && (
          <div className="mt-4 p-3 rounded-[10px]" style={{ background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
            <p className="text-[12px] font-semibold" style={{ color: '#86efac' }}>2FA is active · Your account is more secure</p>
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="rounded-[14px] p-6" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #2a1515' }}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={14} style={{ color: '#f87171' }} />
          <h3 className="text-[13px] font-bold" style={{ color: '#f87171' }}>Danger Zone</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold" style={{ color: '#ededed' }}>Delete account</p>
            <p className="text-[11px] mt-[2px]" style={{ color: '#8a8a8a' }}>Permanently delete your account and all content. This cannot be undone.</p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 rounded-[8px] text-[12px] font-semibold transition-all duration-150"
            style={{ border: '1px solid #3a1515', color: '#f87171', background: 'transparent' }}
          >
            Delete Account
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="mt-4 p-4 rounded-[10px] slide-up" style={{ background: 'rgba(248, 113, 113, 0.06)', border: '1px solid rgba(248, 113, 113, 0.2)' }}>
            <p className="text-[13px] font-semibold mb-2" style={{ color: '#f87171' }}>Are you absolutely sure?</p>
            <p className="text-[11px] mb-4" style={{ color: '#8a8a8a' }}>This will permanently delete your account, all generated content, and your product profile.</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-[8px] text-[12px] font-semibold transition-all duration-150"
                style={{ border: '1px solid #1f1f1f', color: '#8a8a8a', background: 'transparent' }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); toast.error('Account deletion is disabled in demo mode'); }}
                className="px-4 py-2 rounded-[8px] text-[12px] font-semibold transition-all duration-150"
                style={{ background: '#f87171', color: '#0a0a0a' }}
              >
                Yes, delete my account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}