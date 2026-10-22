/*
# Add user accounts, practice history, and session tracking

## Purpose
Brings per-user data to the AZ-900 Clarity Coach. Authenticated users get a
profile, persistent question results, and a record of each practice session.
Unauthenticated visitors keep using the app with localStorage only.

## New Tables

### user_profiles
- `id` (uuid, primary key) — mirrors `auth.users.id`
- `display_name` (text, not null) — friendly name shown in the learning space
- `created_at` (timestamptz) — when the profile was created
- One row per user. Created on sign-up via the frontend.

### question_results
- `id` (uuid, primary key)
- `user_id` (uuid, not null, defaults to `auth.uid()`) — owner
- `question_id` (text, not null) — references a question in the local bank
- `topic_id` (text, not null) — denormalized for fast topic queries
- `selected_option_id` (text, not null) — what the user picked
- `correct` (boolean, not null) — whether the pick was right
- `answered_at` (timestamptz, defaults to now()) — when the answer was recorded
- One row per answer. The frontend upserts on `(user_id, question_id)` so
  re-answering a question updates instead of duplicating.

### practice_sessions
- `id` (uuid, primary key)
- `user_id` (uuid, not null, defaults to `auth.uid()`) — owner
- `mode` (text, not null) — 'practice' or 'signal'
- `topic_id` (text, nullable) — null means "all topics"
- `total` (integer, not null) — questions in the session
- `correct_count` (integer, not null) — correct answers
- `started_at` (timestamptz, defaults to now())
- `finished_at` (timestamptz, nullable) — set when the session ends
- One row per completed practice session.

## Security
- RLS enabled on all three tables.
- Grants and policies scoped to `authenticated` only (the app has a sign-in
  screen, so the anon key has no direct table access).
- `user_profiles`: a user can read/update only their own profile row.
- `question_results` and `practice_sessions`: owner-scoped CRUD via
  `auth.uid() = user_id`. `user_id` defaults to `auth.uid()` so frontend
  inserts that omit it still satisfy the WITH CHECK.
- Indexes on `user_id` for fast per-user queries.

## Notes
1. Email confirmation stays OFF — sign-up logs the user in immediately.
2. The frontend creates the `user_profiles` row right after `signUp` succeeds.
3. No `anon` grants: the app requires sign-in to reach these tables.
*/

-- user_profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON user_profiles TO authenticated;

DROP POLICY IF EXISTS "select_own_profile" ON user_profiles;
CREATE POLICY "select_own_profile" ON user_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON user_profiles;
CREATE POLICY "insert_own_profile" ON user_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON user_profiles;
CREATE POLICY "update_own_profile" ON user_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- question_results
CREATE TABLE IF NOT EXISTS question_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  topic_id text NOT NULL,
  selected_option_id text NOT NULL,
  correct boolean NOT NULL,
  answered_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE question_results ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON question_results TO authenticated;

DROP POLICY IF EXISTS "select_own_results" ON question_results;
CREATE POLICY "select_own_results" ON question_results FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_results" ON question_results;
CREATE POLICY "insert_own_results" ON question_results FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_results" ON question_results;
CREATE POLICY "update_own_results" ON question_results FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_results" ON question_results;
CREATE POLICY "delete_own_results" ON question_results FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_question_results_user_id ON question_results(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_question_results_user_question ON question_results(user_id, question_id);

-- practice_sessions
CREATE TABLE IF NOT EXISTS practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  mode text NOT NULL CHECK (mode IN ('practice', 'signal')),
  topic_id text,
  total integer NOT NULL,
  correct_count integer NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz
);
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON practice_sessions TO authenticated;

DROP POLICY IF EXISTS "select_own_sessions" ON practice_sessions;
CREATE POLICY "select_own_sessions" ON practice_sessions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_sessions" ON practice_sessions;
CREATE POLICY "insert_own_sessions" ON practice_sessions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_sessions" ON practice_sessions;
CREATE POLICY "update_own_sessions" ON practice_sessions FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_sessions" ON practice_sessions;
CREATE POLICY "delete_own_sessions" ON practice_sessions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id ON practice_sessions(user_id);
