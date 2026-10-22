import { useCallback, useEffect, useRef, useState } from 'react';
import type { QuestionResult } from '@/types';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

const STORAGE_KEY = 'az900-clarity-coach-progress-v1';

interface ProgressState {
  results: QuestionResult[];
}

function loadLocal(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { results: [] };
    const parsed = JSON.parse(raw) as ProgressState;
    if (!parsed || !Array.isArray(parsed.results)) return { results: [] };
    return parsed;
  } catch {
    return { results: [] };
  }
}

export function useProgress() {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<ProgressState>({ results: [] });
  const [loading, setLoading] = useState(true);
  const isRemote = Boolean(user);
  const userRef = useRef(user);
  userRef.current = user;

  // Load results from the appropriate source when auth state settles
  useEffect(() => {
    if (authLoading) return;
    let mounted = true;

    async function load() {
      if (user) {
        const { data, error } = await supabase
          .from('question_results')
          .select('question_id, topic_id, selected_option_id, correct, answered_at')
          .eq('user_id', user.id);
        if (!mounted || error) {
          setLoading(false);
          return;
        }
        const results: QuestionResult[] = (data ?? []).map((row) => ({
          questionId: row.question_id,
          topicId: row.topic_id,
          selectedOptionId: row.selected_option_id,
          correct: row.correct,
          timestamp: new Date(row.answered_at).getTime(),
        }));
        if (!mounted) return;
        setState({ results });
        setLoading(false);
      } else {
        setState(loadLocal());
        setLoading(false);
      }
    }
    load();

    return () => {
      mounted = false;
    };
  }, [user, authLoading]);

  const recordResult = useCallback((result: QuestionResult) => {
    setState((prev) => {
      const filtered = prev.results.filter(
        (r) => r.questionId !== result.questionId,
      );
      const next = { results: [...filtered, result] };

      const currentUser = userRef.current;
      if (currentUser) {
        // upsert to Supabase (unique index on user_id, question_id)
        supabase
          .from('question_results')
          .upsert(
            {
              user_id: currentUser.id,
              question_id: result.questionId,
              topic_id: result.topicId,
              selected_option_id: result.selectedOptionId,
              correct: result.correct,
              answered_at: new Date(result.timestamp).toISOString(),
            },
            { onConflict: 'user_id,question_id' },
          )
          .then(({ error }) => {
            if (error) console.error('Failed to save result', error.message);
          });
      } else {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore storage errors */
        }
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const currentUser = userRef.current;
    if (currentUser) {
      supabase
        .from('question_results')
        .delete()
        .eq('user_id', currentUser.id)
        .then(({ error }) => {
          if (error) console.error('Failed to reset results', error.message);
        });
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
    setState({ results: [] });
  }, []);

  return { results: state.results, recordResult, reset, loading, isRemote };
}
