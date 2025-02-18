import { useState, useEffect, useCallback, useMemo } from "react";

export type ColorScheme = "light" | "dark";

export function useColorScheme(localStorageKey: string) {
  const key = `${localStorageKey}_theme`;
  const defaultTheme = useMemo(() => {
    let theme: ColorScheme = 'light';

    // local storage is used to override OS theme settings
    if (localStorage.getItem(key)) {
      if (localStorage.getItem(key) === "dark") {
        theme = "dark";
      }
    } else if (!window.matchMedia) {
      // matchMedia method not supported
      return theme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // OS theme setting detected as dark
      theme = "dark";
    }

    return theme;
  }, [key]);

  const [current, setCurrent] = useState<ColorScheme>(defaultTheme);
  const [firstRender, setFirstRender] = useState(true);

  const toggle = useCallback(() => setCurrent(prev => prev === 'dark' ? 'light' : 'dark'), []);

  useEffect(() => {
    document.body.style.colorScheme = current;
    if (current === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    window.localStorage.setItem(key, current);
    // document.documentElement.setAttribute("data-theme", current);

    setFirstRender(false);
  }, [current, key]);

  return {
    firstRender,
    colorScheme: firstRender ? undefined : current,
    toggle
  }
}