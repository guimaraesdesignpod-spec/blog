-- =====================================================
-- Fix RLS on public.subscribers
-- Supabase security alert: 2026-05-13
-- =====================================================

-- 1. Enable RLS (blocks ALL access until policies are created)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 2. Allow anon to INSERT new subscribers (newsletter signup)
--    Needed by: /api/newsletter POST route (uses anon key)
CREATE POLICY "Allow anonymous newsletter signup"
ON public.subscribers
FOR INSERT
TO anon
WITH CHECK (true);

-- 3. Block anon from SELECT (no one should read all emails)
--    No SELECT policy for anon = implicitly denied

-- 4. Block anon from UPDATE and DELETE
--    No UPDATE/DELETE policies for anon = implicitly denied

-- 5. Allow authenticated users to only access their own rows
--    (for future use if subscribers table gets user_id column)
-- CREATE POLICY "subscribers own rows"
-- ON public.subscribers
-- FOR ALL
-- TO authenticated
-- USING (user_id = auth.uid());

-- 6. Service role bypasses RLS automatically (no policy needed)
--    The newsletter API uses anon key, not service role