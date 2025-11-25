import { useState, useEffect } from "react";

/**
 * Retorna un valor que cambia solo después de un retraso (debounce)
 * útil para inputs de búsqueda o filtros en tablas/listas.
 *
 * @param value Valor original (por ejemplo, el texto del input)
 * @param delay Milisegundos de espera antes de actualizar el valor debounced
 */
export function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}