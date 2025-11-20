export function hasChanges<T extends object>(
  original: T,
  updated: Partial<T>
): boolean {
  return Object.entries(updated).some(
    ([key, value]) => original[key as keyof T] !== value
  );
}
