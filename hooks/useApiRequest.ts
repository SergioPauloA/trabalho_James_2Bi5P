"use client";

import { useState } from "react";

export function useApiRequest<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T | null>(null);

  const execute = async (request: () => Promise<T>) => {
    setLoading(true);
    setError("");
    try {
      const result = await request();
      setData(result);
      return result;
    } catch {
      setError("Falha ao processar requisição.");
      throw new Error("Falha ao processar requisição.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, execute };
}
