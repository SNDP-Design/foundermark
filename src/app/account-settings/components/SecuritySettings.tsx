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

  // Backend integration point: POST /api/account/change-password
  const onSubmit = handleSubmit(async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1600));
    setIsSubmitting(false);
    reset();
    toast.success('Password updated. You may need to log in again on other devices.');
  });

  return (
    <div className="space-y-5">
      {/* Password change */}
      <div className="card-base p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Shield size={15} className="text-primary" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Change Password</h2>
            <p className="text-xs text-muted-foreground">Use a strong password you don't use elsewhere</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="currentPassword">
              Current password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrent ? 'text' : 'password'}
                className="input-base pr-10"
                placeholder="Enter your current password"
                {...register('currentPassword', { required: 'Current password is required' })}
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle visibility">
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-xs text-rose-500 mt-1.5">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="newPassword">
              New password
            </label>
            <p className="text-xs text-muted-foreground mb-1.5">At least 8 characters, ideally with numbers and symbols</p>
            <div className="relative">
              <input
                id="newPassword"
                type={showNew ? 'text' : 'password'}
                className="input-base pr-10"
                placeholder="Create a new password"
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 8, message: 'Must be at least 8 characters' },
                })}
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle visibility">
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-xs text-rose-500 mt-1.5">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="confirmPassword">
              Confirm new password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                className="input-base pr-10"
                placeholder="Repeat your new password"
                {...register('confirmPassword', {
                  required: 'Please confirm your new password',
                  validate: (v) => v === watch('newPassword') || 'Passwords do not match',
                })}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle visibility">
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1.5">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary text-sm flex items-center gap-2 min-w-[160px] justify-center"
            >
              {isSubmitting ? (
                <><Loader2 size={14} className="animate-spin" /> Updating…</>
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 2FA */}
      <div className="card-base p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Two-factor authentication</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account with an authenticator app</p>
          </div>
          <Toggle
            checked={twoFAEnabled}
            onChange={(v) => {
              setTwoFAEnabled(v);
              toast.success(v ? '2FA enabled — scan the QR code in your authenticator app' : '2FA disabled');
            }}
            label="Toggle two-factor authentication"
          />
        </div>
        {twoFAEnabled && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-xs font-semibold text-emerald-700">2FA is active · Your account is more secure</p>
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="card-base p-6 border-rose-200">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={15} className="text-rose-500" />
          <h3 className="text-sm font-bold text-rose-600">Danger Zone</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Delete account</p>
            <p className="text-xs text-muted-foreground mt-0.5">Permanently delete your account and all content. This cannot be undone.</p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 rounded-xl border border-rose-300 text-rose-600 text-xs font-semibold hover:bg-rose-50 transition-all duration-150 active:scale-95"
          >
            Delete Account
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl slide-up">
            <p className="text-sm font-semibold text-rose-700 mb-2">Are you absolutely sure?</p>
            <p className="text-xs text-rose-600 mb-4">This will permanently delete your account, all generated content, and your product profile. This action cannot be reversed.</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setShowDeleteConfirm(false); toast.error('Account deletion cancelled'); }}
                className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-muted transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); toast.error('Account deletion is disabled in demo mode'); }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-all duration-150 active:scale-95"
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