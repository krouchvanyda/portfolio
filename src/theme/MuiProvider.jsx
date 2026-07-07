import { useEffect, useMemo, useState } from 'react';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';

function currentMode() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

// Keeps the MUI theme (mode + accent colors) in sync with the existing
// data-theme attribute driven by the site's own light/dark toggle.
export default function MuiProvider({ children }) {
  const [mode, setMode] = useState(currentMode);

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => setMode(currentMode()));
    observer.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === 'light' ? '#4f46e5' : '#6366f1' },
          secondary: { main: mode === 'light' ? '#0891b2' : '#22d3ee' },
        },
        shape: { borderRadius: 12 },
        typography: { fontFamily: 'Inter, system-ui, -apple-system, sans-serif' },
      }),
    [mode]
  );

  // injectFirst → MUI's styles load before Tailwind, so Tailwind utility
  // classes win when both target the same element.
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}
