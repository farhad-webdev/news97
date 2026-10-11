import React, { useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink, LogOut, Newspaper, RefreshCw, Trash2 } from 'lucide-react';
import {
  deleteDraft,
  getAuthSession,
  isSupabaseConfigured,
  loadAdminDrafts,
  NewsDraftRow,
  publishDraft,
  signIn,
  signOut,
} from '../lib/supabase';

interface NewsAdminProps {
  onClose: () => void;
  onPublished: () => void;
}

const categories = [
  ['politics', 'রাজনীতি'],
  ['economy', 'অর্থনীতি'],
  ['national', 'সারাদেশ'],
  ['health', 'স্বাস্থ্য'],
  ['crime', 'অপরাধ'],
  ['international', 'আন্তর্জাতিক'],
  ['sports', 'খেলাধুলা'],
  ['technology', 'প্রযুক্তি'],
];

export const NewsAdmin: React.FC<NewsAdminProps> = ({ onClose, onPublished }) => {
  const [session, setSession] = useState(() => getAuthSession());
  const [drafts, setDrafts] = useState<NewsDraftRow[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState('');

  const refreshDrafts = async (activeSession = session) => {
    if (!activeSession) return;
    setLoading(true);
    setError('');
    try {
      setDrafts(await loadAdminDrafts(activeSession));
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Draft লোড করা যায়নি।';
      setError(message);
      console.error('Could not load news drafts:', cause);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) void refreshDrafts(session);
  }, [session]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      setSession(await signIn(email.trim(), password));
      setPassword('');
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'সাইন ইন করা যায়নি।';
      setError(message);
      console.error('Admin sign-in failed:', cause);
    } finally {
      setLoading(false);
    }
  };

  const updateDraft = (id: string, changes: Partial<NewsDraftRow>) => {
    setDrafts((current) => current.map((draft) => draft.id === id ? { ...draft, ...changes } : draft));
  };

  const handlePublish = async (draft: NewsDraftRow) => {
    if (!session || !draft.title.trim()) return;
    setBusyId(draft.id);
    setError('');
    try {
      await publishDraft(session, draft);
      setDrafts((current) => current.filter((item) => item.id !== draft.id));
      onPublished();
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'খবর প্রকাশ করা যায়নি।';
      setError(message);
      console.error('Could not publish draft:', cause);
    } finally {
      setBusyId('');
    }
  };

  const handleDelete = async (id: string) => {
    if (!session || !window.confirm('এই Draft মুছে ফেলবেন?')) return;
    setBusyId(id);
    setError('');
    try {
      await deleteDraft(session, id);
      setDrafts((current) => current.filter((item) => item.id !== id));
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Draft মুছতে পারেনি।';
      setError(message);
      console.error('Could not delete draft:', cause);
    } finally {
      setBusyId('');
    }
  };

  return (
    <section className="max-w-5xl mx-auto w-full px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <Newspaper className="w-5 h-5" />
            <span className="text-xs font-bold">দেশবার্তা</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">সংবাদ Admin</h1>
        </div>
        <div className="flex gap-2">
          {session && (
            <>
              <button type="button" onClick={() => void refreshDrafts()} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold">
                <RefreshCw className="w-4 h-4" /> রিফ্রেশ
              </button>
              <button type="button" onClick={() => { signOut(); setSession(null); setDrafts([]); }} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold">
                <LogOut className="w-4 h-4" /> লগআউট
              </button>
            </>
          )}
          <button type="button" onClick={onClose} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">সাইটে ফিরুন</button>
        </div>
      </div>

      {!isSupabaseConfigured() && (
        <p role="alert" className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Supabase project URL ও public anon key configure করা হয়নি। GitHub Actions variables এবং deployment workflow সেটআপ করুন।
        </p>
      )}
      {error && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {!session ? (
        <form onSubmit={handleSignIn} className="max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Admin সাইন ইন</h2>
          <label className="mb-3 block text-sm font-semibold">ইমেইল
            <input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
          </label>
          <label className="mb-4 block text-sm font-semibold">পাসওয়ার্ড
            <input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
          </label>
          <button disabled={loading || !isSupabaseConfigured()} className="w-full rounded-lg bg-red-600 px-4 py-2 font-bold text-white disabled:opacity-50">
            {loading ? 'অপেক্ষা করুন…' : 'সাইন ইন'}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">Admin account Supabase Dashboard থেকে invite/create করতে হবে; এখানে public signup নেই।</p>
        </form>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">পর্যালোচনার জন্য Draft ({drafts.length})</h2>
            <p className="text-xs text-slate-500">প্রথম আলো ও BBC বাংলা RSS</p>
          </div>
          {loading && <p className="py-8 text-center text-sm text-slate-500">Draft লোড হচ্ছে…</p>}
          {!loading && drafts.length === 0 && <p className="rounded-xl border bg-white p-8 text-center text-slate-500">কোনো Draft নেই। RSS importer পরের নির্ধারিত run-এ খবর আনবে।</p>}
          <div className="space-y-4">
            {drafts.map((draft) => (
              <article key={draft.id} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-bold text-red-600">{draft.source}</span>
                  <a href={draft.source_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-red-600">
                    মূল সংবাদ <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <label className="mb-3 block text-xs font-bold text-slate-600">শিরোনাম
                  <input value={draft.title} onChange={(event) => updateDraft(draft.id, { title: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-bold text-slate-900" />
                </label>
                <label className="mb-3 block text-xs font-bold text-slate-600">সারাংশ
                  <textarea value={draft.excerpt} onChange={(event) => updateDraft(draft.id, { excerpt: event.target.value })} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-700" />
                </label>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <label className="text-xs font-bold text-slate-600">বিভাগ
                    <select value={draft.category_slug} onChange={(event) => updateDraft(draft.id, { category_slug: event.target.value })} className="mt-1 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                      {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                  <div className="flex gap-2">
                    <button type="button" disabled={busyId === draft.id} onClick={() => void handleDelete(draft.id)} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 disabled:opacity-50">
                      <Trash2 className="h-4 w-4" /> মুছুন
                    </button>
                    <button type="button" disabled={busyId === draft.id || !draft.title.trim()} onClick={() => void handlePublish(draft)} className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
                      <CheckCircle2 className="h-4 w-4" /> {busyId === draft.id ? 'অপেক্ষা করুন…' : 'সম্পাদনা করে প্রকাশ'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
