import { useState, useEffect, useCallback, useRef } from "react";

interface QueryOptions {
  enabled?: boolean;
  deps?: unknown[];
}

interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface QueryResult<T> extends QueryState<T> {
  refetch: () => void;
}

export function useQuery<T>(
  fetcher: () => Promise<T>,
  options: QueryOptions = {},
): QueryResult<T> {
  const { enabled = true, deps = [] } = options;

  const [state, setState] = useState<QueryState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetcherRef.current();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: err as Error });
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }
    run();
  }, [enabled, ...deps]);

  return { ...state, refetch: run };
}
