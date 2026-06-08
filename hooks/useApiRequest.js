"use client";

import { useState } from "react";
import { getErrorMessage } from "@/utils/errors";

export function useApiRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const execute = async (request) => {
    setLoading(true);
    setError("");
    try {
      const result = await request();
      setData(result);
      return result;
    } catch (error) {
      const message = getErrorMessage(error, "Falha ao processar requisição.");
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, execute };
}
