import { useEffect, useState } from "react";

interface FetchResult<T> {
  data: T | null;
  loader: boolean;
  error: string | null;
}

export function useFetch<T>(url: string, dependencies: any[] = []): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoader(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("algo fallo");
      }

      const result = await response.json();

      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies); // Ejecutar cuando cambien las dependencias

  return { data, loader, error };
}
