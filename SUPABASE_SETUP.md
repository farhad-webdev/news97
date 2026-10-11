# Supabase news publishing setup

The public site uses only the Supabase project URL and publishable/anon key. The RSS importer uses a service-role key kept in GitHub Actions Secrets; never place that key in the frontend, source files, or chat.

## 1. Create the tables and policies

In Supabase Dashboard, open **SQL Editor**, paste and run [`supabase/schema.sql`](./supabase/schema.sql).

## 2. Create your admin account

In **Authentication → Users**, invite or create your own account and confirm its email. Copy that user's UUID, then run this statement in SQL Editor, replacing the placeholder with that UUID:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID');
```

Only user IDs listed in `admin_users` can review, edit, publish, or delete drafts.

## 3. Configure GitHub values

In the GitHub repository, open **Settings → Secrets and variables → Actions**.

Add these **Variables**:

- `VITE_SUPABASE_URL`: the Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: the publishable key (or legacy anon key)

Add these **Secrets**:

- `SUPABASE_URL`: the Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: the rotated service-role/secret key. This is used only by the scheduled RSS import workflow.

Do not add the database password to GitHub; it is not used by this app.

After saving the values, run **Actions → Import RSS drafts → Run workflow** once. After that, the workflow checks BBC বাংলা and প্রথম আলো about every 30 minutes and imports new feed metadata as drafts. Existing source links are deduplicated.

## 4. Publish reviewed news

Wait for the Pages workflow to deploy with the Supabase variables, then open the site and use **Admin** in the footer. Sign in with the admin account, review/edit a draft, choose its section, and press **সম্পাদনা করে প্রকাশ**. Published entries appear in the public feed with a link to their original source; full article text is not copied.
