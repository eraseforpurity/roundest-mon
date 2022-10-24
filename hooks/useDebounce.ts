import { useEffect, useState } from 'react';

export default function useDebounce(
  value: string | number,
  delay: number,
): string | number {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return debouncedValue;
}
