# Portfolio admin setup

The repository now includes a protected `/admin` dashboard for editing project content, project order, primary images, and the CV without editing GitHub.

## 1. Create Supabase resources

1. Create a free project at https://supabase.com.
2. In Authentication → Users, create your owner account with email and password.
3. Open SQL Editor and run [`supabase/schema.sql`](../repo-inspect-20260918/supabase/schema.sql).

## 2. Configure local/Vercel environment variables

Copy `.env.example` to `.env.local` for local development. Add the same two values to the Vercel project under Settings → Environment Variables:

```text
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Redeploy after adding them.

## 3. Use the editor

Open `/admin`, sign in with the Supabase user, choose a language, edit a project, move it up or down, upload a new image or CV, and press **Save changes**.

The site keeps the existing TypeScript configuration as a fallback. Until a locale is saved from the dashboard, that locale continues to use the current GitHub content.
