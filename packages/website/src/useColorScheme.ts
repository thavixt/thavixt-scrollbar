import { useState, useEffect, useCallback } from "react";

export type ColorScheme = "light" | "dark";

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(window.matchMedia("(prefers-color-scheme: light)").matches ? 'light' : 'dark');
  const themeChanged = useCallback((e: MediaQueryListEvent) => setColorScheme(e.matches ? 'light' : 'dark'), []);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: light)");
    match.addEventListener('change', themeChanged);

    return () => {
      match.addEventListener('change', themeChanged);
    };
  }, [themeChanged]);

  return colorScheme;
}