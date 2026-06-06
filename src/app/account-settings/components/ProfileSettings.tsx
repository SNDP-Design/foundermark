'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Camera, Check } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type ProfileData = {
  fullName: string;
  email: string;
  company: string;
  bio: string;
};

export default function ProfileSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const { user } = useAuth();
  const supabase = createClient();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProfileData>({
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      bio: '',
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) { setIsLoading(false); return; }
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.log('Load profile error:', error.message);
        }

        if (data) {
          reset({
            fullName: data.full_name || '',
            email: data.email || user.email || '',
            company: data.company || '',
            bio: data.bio || '',
          });
        } else {
          reset({
            fullName: user.user_metadata?.full_name || '',
            email: user.email || '',
            company: '',
            bio: '',
          });
        }
      } catch (err: any) {
        console.log('Profile load error:', err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [user]);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) { toast.error('You must be logged in to update your profile.'); return; }
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          email: data.email,
          full_name: data.fullName,
          company: data.company,
          bio: data.bio,
        }, { onConflict: 'id' });

      if (error) throw error;

      setSavedAt('Just now');
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  });

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || 'FM';

  if (isLoading) {
    return (
      <div className="card-base p-10 text-center">
        <Loader2 size={24} className="animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground mt-3">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card-base p-6">
        <h2 className="text-base font-bold text-foreground mb-5">Profile Information</h2>

        {/* Avatar upload */}
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-border">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">{initials}</span>
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