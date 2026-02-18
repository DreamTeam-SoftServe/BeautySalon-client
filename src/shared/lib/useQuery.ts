import { useState, useEffect, useCallback } from 'react'

interface QueryState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface QueryResult<T> extends QueryState<T> {
  refetch: () => void
}

export function useQuery<T>(fetcher: () => Promise<T>): QueryResult<T> {
  const [state, setState] = useState<QueryState<T>>({
    data:    null,
    loading: true,
    error:   null,
  })

  const run = useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }))
    try {
      const data = await fetcher()
      setState({ data, loading: false, error: null })
    } catch (err) {
      setState({ data: null, loading: false, error: err as Error })
    }
  }, []) // eslint-disable-line

  useEffect(() => { run() }, [])

  return { ...state, refetch: run }
}
