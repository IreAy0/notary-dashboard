export function useLocaleStorage(key: string) {
  return localStorage.getItem(key)
}
