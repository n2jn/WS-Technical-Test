import { useCallback, useEffect, useRef, useState } from "react";

type FetchOptions = {
  method?: 'POST' | 'GET' | 'PUT'
  params?: Record<string, unknown>
  body?: Record<string, unknown>
}


export function useFetch<T = unknown>(url: string, options?: FetchOptions) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const abortRef = useRef<AbortController | null>(null);


    const buildUrlWithParams = useCallback((params: FetchOptions['params'] | undefined) => {
      if (!params) {
        return url
      } 

      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          searchParams.append(key, String(value));
        }
      })
      const queryString = searchParams.toString();
      if (!queryString) {
        return url;
      }
      
      return `${url}${'?'}${queryString}`;
    }, [url])

    const buildOptions = useCallback((body: FetchOptions['body']) => {
      if (!body) {
        return null
      }

      return {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    }, [])


    const fetcher = useCallback(async (options?: FetchOptions) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
  
      setLoading(true);
      setError(null);
      try {

        const urlWithParams = buildUrlWithParams(options?.params)
        const opt = buildOptions(options?.body)

        const response = await fetch(urlWithParams, {
          method: options?.method || 'GET',
          ...opt,
          signal: controller.signal
        });
      
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const json = await response.json();
        setData(json);
      }
      catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }, [url])

    useEffect(() => {
      if (!options?.method || options?.method === 'GET') {
        fetcher(options)
      }
      return () => abortRef.current?.abort();
    }, [])

    return {
      loading,
      data,
      error,
      refetch: fetcher
    }
}