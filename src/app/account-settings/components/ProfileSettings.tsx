'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Camera, Check } from 'lucide-react';
import { toast } from 'sonner';

type ProfileData = {
  fullName: string;
  email: string;
  company: string;
  bio: string;
};

export default function ProfileSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ProfileData>({
    defaultValues: {
      fullName: 'Nadia Patel',
      email: 'nadia@buildfast.io',
      company: 'BuildFast',
      bio: 'Founder of BuildFast — a SaaS boilerplate for indie developers. Building in public.',
    },
  });

  // Backend integration point: PUT /api/account/profile
  const onSubmit = handleSubmit(async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsSubmitting(false);
    setSavedAt('Just now');
    toast.success('Profile updated successfully');
  });

  return (
    <div className="space-y-6">
      <div className="card-base p-6">
        <h2 className="text-base font-bold text-foreground mb-5">Profile Information</h2>

        {/* Avatar upload */}
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-border">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">NP</span>
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors shadow-card"
              aria-label="Change profile photo"
              title="Upload a profile photo"
            >
              <Camera size={11} className="text-muted-foreground" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Profile photo</p>
            <p className="text-xs text-muted-foreground mt-0.5">JPG or PNG · Max 2MB</p>
            <button type="button" className="text-xs text-primary hover:text-violet-700 font-semibold mt-1.5 transition-colors">
              Upload new photo
            </button>
          </div>
        </div>

        {/* Form fields */}
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                className="input-base"
                {...register('fullName', { required: 'Full name is required' })}
              />
              {errors.fullName && <p className="text-xs text-rose-500 mt-1.5">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="company">
                Company / Product name
              </label>
              <input
                id="company"
                type="text"
                className="input-base"
                {...register('company')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="email">
              Email address
            </label>
            <p className="text-xs text-muted-foreground mb-1.5">Used for login and notifications</p>
            <input
              id="email"
              type="email"
              className="input-base"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
            />
            {errors.email && <p className="text-xs text-rose-500 mt-1.5">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="bio">
              Short bio
            </label>
            <p className="text-xs text-muted-foreground mb-1.5">Helps personalize AI content — optional</p>
            <textarea
              id="bio"
              rows={3}
              className="input-base resize-none"
              {...register('bio')}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedAt && !isDirty && (
              <span className="text-xs text-emerald-600 flex items-center gap-1.5 font-semibold">
                <Check size={13} /> Saved {savedAt}
              </span>
            )}
            {!savedAt && <span />}
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="btn-primary text-sm flex items-center gap-2 min-w-[140px] justify-center disabled:opacity-50"
            >
              {isSubmitting ? (
                <><Loader2 size={14} className="animate-spin" /> Saving…</>
              ) : (
                'Save Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}