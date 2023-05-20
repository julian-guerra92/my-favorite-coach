
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import '../styles/globals.css';
import { AuthProvider, UiProvider } from '../context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </AuthProvider>
  )
}
