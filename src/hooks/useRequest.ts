import { useTopLoader } from "nextjs-toploader";
import { useEffect, useState } from "react";
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
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState(fetchOnMount);
  const [error, setError] = useState<Error | null>(null);
  const { start: startTopLoader, done: doneTopLoader } = useTopLoader();

  const request = async (payload: P): Promise<R> => {
    setIsLoading(true);
    onStart?.();
    setError(null);

    let result;

    try {
      if (showTopLoader) startTopLoader();
      result = await queryFn(payload);

      if (showErrorToast && (result as any)?.error) {
        toast.error(errorToastMessage || (result as any)?.message);
      } else if ((result as any)?.error === undefined) {
        setData(result);
        onSuccess?.(result);
        if (showSuccessToast) toast.success(successToastMessage);
      }

      return result;
    } catch (err: any) {
      const typedError = err instanceof Error ? err : new Error(String(err));
      setError(typedError);
      onError?.(typedError);
      if (showErrorToast) toast.success(typedError?.message);
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
