import React, { useEffect, useState } from 'react';
import { LoginForm } from './components/login/LoginForm';
import { ResetPasswordForm } from './components/login/ResetPasswordForm';
import { RequestAccessForm } from './components/login/RequestAccessForm';
import { PosterCarousel } from './components/login/PosterCarousel';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import App from './App';
import { signIn, requestAccess, requestPasswordReset, getPosters, onSignedOut } from './api';
import { loginStyles } from './styles/login.styles';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

type View = 'signIn' | 'request' | 'reset';

interface Message {
  text: string;
  error: boolean;
}

const titles: Record<View, string> = {
  signIn: 'Sign in',
  request: 'Request Access',
  reset: 'Reset Password',
};

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      sx={loginStyles.colorSchemeButton}
      {...other}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView] = useState<View>('signIn');
  const [showOptions, setShowOptions] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [posters, setPosters] = useState<string[]>([]);

  // The posters are decoration: if they can't be fetched the form still works.
  useEffect(() => {
    getPosters().then(setPosters).catch(() => setPosters([]));
  }, []);

  // Return here when the backend says the session has ended.
  useEffect(() => {
    onSignedOut(() => {
      setLoggedIn(false);
      setMessage({ text: 'Your session has ended. Sign in again.', error: true });
    });
  }, []);

  function showView(next: View) {
    setView(next);
    setMessage(null);
  }

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await signIn(form.get('username'), form.get('password'));
      setMessage(null);
      setLoggedIn(true);
    } catch (error: any) {
      const text = error.status === 401 ? 'Incorrect username or password.'
        : error.status === 403 ? 'This account is not active.'
        : 'Could not reach the server. Try again later.';
      setMessage({ text, error: true });
    }
  }

  async function handleRequestSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await requestAccess({
        email: form.get('email'),
        username: form.get('username'),
        message: form.get('message'),
      });
      setView('signIn');
      setMessage({ text: 'Request sent. You will hear back by email.', error: false });
    } catch {
      setMessage({ text: 'Your request could not be sent. Try again later.', error: true });
    }
  }

  async function handleResetSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await requestPasswordReset(form.get('email'));
      setView('signIn');
      setMessage({ text: 'If that address has an account, a reset link is on its way.', error: false });
    } catch {
      setMessage({ text: 'The reset email could not be sent. Try again later.', error: true });
    }
  }

  if (loggedIn) {
    return <App />;
  }

  return (
    <div>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box component="header" sx={loginStyles.headerBox}>
          <Typography level="title-lg">HBDb</Typography>
        </Box>
        <ColorSchemeToggle />
        <Box sx={loginStyles.mainBox}>
          <Box sx={loginStyles.contentBox}>
            <Box component="main" sx={loginStyles.formBox}>
              <Stack sx={loginStyles.titleStack}>
                <Typography component="h1" level="h3">
                  {titles[view]}
                </Typography>
              </Stack>
              <Stack sx={loginStyles.formStack}>
                {message && (
                  <Alert color={message.error ? 'danger' : 'success'} variant="soft">
                    {message.text}
                  </Alert>
                )}
                {view === 'signIn' && (
                  <LoginForm
                    onSubmit={handleSignIn}
                    onShowOptions={() => setShowOptions(!showOptions)}
                    showOptions={showOptions}
                    onResetPassword={() => showView('reset')}
                    onRequestAccess={() => showView('request')}
                  />
                )}
                {view === 'request' && (
                  <RequestAccessForm
                    onSubmit={handleRequestSubmit}
                    onBack={() => showView('signIn')}
                  />
                )}
                {view === 'reset' && (
                  <ResetPasswordForm
                    onSubmit={handleResetSubmit}
                    onBack={() => showView('signIn')}
                  />
                )}
              </Stack>
            </Box>
            <Box component="footer" sx={loginStyles.footer}>
              <Typography level="body-xs" sx={loginStyles.footerText}>
                © HBDb {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>
        {posters.length > 0 && <PosterCarousel posters={posters} />}
      </CssVarsProvider>
    </div>
  );
}
