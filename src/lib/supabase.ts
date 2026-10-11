const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const sessionStorageKey = 'deshbarta_admin_session';

interface AuthSession {
  access_token: string;
  refresh_token: string;
  user: { id: string; email?: string };
}

export interface PublishedNewsRow {
  id: string;
  source: string;
  source_url: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  category_slug: string;
  published_at: string | null;
}

export interface NewsDraftRow extends PublishedNewsRow {
  imported_at: string;
  status: 'draft' | 'published';
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getAuthSession(): AuthSession | null {
  const raw = localStorage.getItem(sessionStorageKey);
  if (!raw) return null;
  try {
    const session: AuthSession = JSON.parse(raw);
    return session.access_token && session.refresh_token && session.user?.id ? session : null;
  } catch {
    localStorage.removeItem(sessionStorageKey);
    return null;
  }
}

function saveAuthSession(session: AuthSession): void {
  localStorage.setItem(sessionStorageKey, JSON.stringify(session));
}

export async function signIn(email: string, password: string): Promise<AuthSession> {
  if (!isSupabaseConfigured()) throw new Error('Supabase এখনো configure করা হয়নি।');
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: supabaseAnonKey, 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.msg ?? result.message ?? 'সাইন ইন করা যায়নি।');
  saveAuthSession(result);
  return result;
}

export function signOut(): void {
  localStorage.removeItem(sessionStorageKey);
}

async function supabaseFetch<T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string,
): Promise<T> {
  if (!isSupabaseConfigured()) throw new Error('Supabase এখনো configure করা হয়নি।');
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...options,
    headers: {
      apikey: supabaseAnonKey,
      authorization: `Bearer ${accessToken ?? supabaseAnonKey}`,
      'content-type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${message}`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function loadPublishedNews(): Promise<PublishedNewsRow[]> {
  return supabaseFetch<PublishedNewsRow[]>(
    '/rest/v1/news_articles?select=id,source,source_url,title,excerpt,image_url,category_slug,published_at&status=eq.published&order=published_at.desc&limit=50',
  );
}

export async function loadAdminDrafts(session: AuthSession): Promise<NewsDraftRow[]> {
  const admins = await supabaseFetch<Array<{ user_id: string }>>(
    `/rest/v1/admin_users?select=user_id&user_id=eq.${encodeURIComponent(session.user.id)}`,
    {},
    session.access_token,
  );
  if (!admins.length) throw new Error('এই account-কে Admin অনুমতি দেওয়া হয়নি।');
  return supabaseFetch<NewsDraftRow[]>(
    '/rest/v1/news_articles?select=id,source,source_url,title,excerpt,image_url,category_slug,published_at,imported_at,status&status=eq.draft&order=imported_at.desc&limit=100',
    {},
    session.access_token,
  );
}

export async function publishDraft(
  session: AuthSession,
  draft: Pick<NewsDraftRow, 'id' | 'title' | 'excerpt' | 'category_slug'>,
): Promise<void> {
  await supabaseFetch<NewsDraftRow[]>(
    `/rest/v1/news_articles?id=eq.${encodeURIComponent(draft.id)}&status=eq.draft`,
    {
      method: 'PATCH',
      headers: { prefer: 'return=minimal' },
      body: JSON.stringify({
        title: draft.title.trim(),
        excerpt: draft.excerpt.trim(),
        category_slug: draft.category_slug,
        status: 'published',
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    },
    session.access_token,
  );
}

export async function deleteDraft(session: AuthSession, id: string): Promise<void> {
  await supabaseFetch<void>(
    `/rest/v1/news_articles?id=eq.${encodeURIComponent(id)}&status=eq.draft`,
    { method: 'DELETE', headers: { prefer: 'return=minimal' } },
    session.access_token,
  );
}
