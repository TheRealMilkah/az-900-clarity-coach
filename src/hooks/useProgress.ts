import { useCallback, useEffect, useState } from 'react';
import type { QuestionResult } from '@/types';

const STORAGE_KEY = 'az900-clarity-coach-progress-v1';

interface ProgressState {
  results: QuestionResult[];
}

function load(): ProgressState {
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
  const [state, setState] = useState<ProgressState>({ results: [] });

  useEffect(() => {
    setState(load());
  }, []);

  const recordResult = useCallback((result: QuestionResult) => {
    setState((prev) => {
      const filtered = prev.results.filter(
        (r) => r.questionId !== result.questionId,
      );
      const next = { results: [...filtered, result] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore storage errors */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState({ results: [] });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { results: state.results, recordResult, reset };
}
