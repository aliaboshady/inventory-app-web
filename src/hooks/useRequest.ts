import { ServerResponse } from "@/models/shared.model";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type RequestOptions<R> = {
  onSuccess?: (data: R) => void;
  onError?: (error: Error) => void;
  onStart?: () => void;
  onFinish?: () => void;
  fetchOnMount?: boolean;
  showTopLoader?: boolean;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successToastMessage?: string;
  errorToastMessage?: string;
};

const useRequest = <P, R>(
  queryFn: (payload: P) => Promise<R>,
  {
    onSuccess,
    onError,
    onStart,
    onFinish,
    fetchOnMount = false,
    showTopLoader = true,
    showSuccessToast = false,
    showErrorToast = true,
    successToastMessage,
    errorToastMessage,
  }: RequestOptions<R> = {}
) => {
  const { t } = useTranslation();
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState(fetchOnMount);
  const [error, setError] = useState<Error | null>(null);
  const { start: startTopLoader, done: doneTopLoader } = useTopLoader();

  const request = async (payload: P): Promise<R | undefined> => {
    setIsLoading(true);
    onStart?.();
    setError(null);

    try {
      if (showTopLoader) startTopLoader();

      const result = await queryFn(payload);

      // ❌ Check for backend error manually
      if ((result as any)?.error) {
        const errorMessage =
          (result as any)?.message || errorToastMessage || "Error";
        const typedError = new Error(errorMessage);

        setError(typedError);
        onError?.(typedError);

        if (showErrorToast) {
          toast.error(t(errorMessage));
        }

        return undefined;
      }

      // ✅ Success
      setData(result);
      onSuccess?.(result);
      if (showSuccessToast) {
        toast.success(t(successToastMessage || "Success"));
      }

      return result;
    } catch (err: any) {
      // Network / unexpected errors
      const typedError = err instanceof Error ? err : new Error(String(err));
      setError(typedError);
      onError?.(typedError);
      if (showErrorToast) {
        toast.error(t(typedError.message || errorToastMessage || "Error"));
      }
      return undefined;
    } finally {
      doneTopLoader();
      setIsLoading(false);
      onFinish?.();
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (fetchOnMount) {
      request(undefined as unknown as P).catch(() => {});
    }
  }, [fetchOnMount]);

  return { request, data, isLoading, error, reset };
};

export default useRequest;
