import { useRef, useEffect, useCallback } from "react";

export interface DebouncedFunction {
  (): void;
  cancel?: () => void;
}

export function useDebounce(
  callback: () => void,
  wait: number
): DebouncedFunction {
  const handler = useRef<false | NodeJS.Timeout>(false);

  const run = useCallback(() => {
    handler.current = setTimeout(callback, wait);
  }, [callback, wait]);

  const stop = useCallback(() => {
    if (handler.current) {
      clearTimeout(handler.current);
      handler.current = false;
    }
  }, []);

  useEffect(() => {
    return stop;
  }, [callback, stop]);

  const fn: DebouncedFunction = useCallback(() => {
    stop();
    run();
  }, [stop, run]);

  fn.cancel = stop;

  return fn;
}
