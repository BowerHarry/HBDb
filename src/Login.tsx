import React, { useState } from 'react';
import axios from 'axios';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import App from './App';
import { wsURL, user, sha256, params } from '../helper-functions';

var response = await fetch(wsURL("/tmdb/movies/posters"), {method: 'POST'});
var posterArray: string[] = await response.json();

interface ILoggedIn {
  loggedIn: boolean;
}

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

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
      {...other}
    >
      {/* Icon logic can be added here if needed */}
    </IconButton>
  );
}

export default function Login() {
  const [loggedIn, setLoggedIn] = useState<ILoggedIn>({ loggedIn: false });
  const [currentPosterIndex, setCurrentPosterIndex] = useState({ currentPosterIndex: 0 });

  async function validateLoginDetails(username: string, password: string) {
    const hashedPassword: string = await sha256(password);
    const response = await axios.post(wsURL("/login"), params({ "username": username, "password": hashedPassword }));
    const authenticatedUser = await response.data as user;
    return authenticatedUser;
  }

  async function loginSubmit(loginData: { username: string; password: string }) {
    const user = await validateLoginDetails(loginData.username, loginData.password);
    if (user) {
      validateKey(user.tmdbAPIKey);
    }
  }

  async function validateKey(APIKey: string) {
    const response = await axios.post(wsURL("/tmdb/auth"), params({ "APIKey": APIKey }));
    if (response.status === 200) {
      setLoggedIn({ loggedIn: true });
    }
  }

  return (
    !loggedIn.loggedIn ? (
      <div>
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box
            sx={(theme) => ({
              width: { xs: '100%', md: '50vw' },
              transition: 'width var(--Transition-duration)',
              transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(255 255 255 / 0.2)',
              [theme.getColorSchemeSelector('dark')]: {
                backgroundColor: 'rgba(19 19 24 / 0.4)',
              },
            })}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100dvh',
                width: '100%',
                px: 2,
              }}
            >
              <Box
                component="header"
                sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography level="title-lg">HBDb Deploy Test</Typography>
                <ColorSchemeToggle />
              </Box>
              <Box
                component="main"
                sx={{
                  my: 'auto',
                  py: 2,
                  pb: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  width: 400,
                  maxWidth: '100%',
                  mx: 'auto',
                  borderRadius: 'sm',
                  '& form': {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  },
                }}
              >
                <Stack sx={{ gap: 1 }}>
                  <Typography component="h1" level="h3">
                    Sign in
                  </Typography>
                </Stack>
                <Stack sx={{ gap: 4, mt: 2 }}>
                  <form
                    onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                      event.preventDefault();
                      const formElements = event.currentTarget.elements;
                      const data = {
                        username: formElements.username.value,
                        password: formElements.password.value,
                      };
                      loginSubmit(data);
                    }}
                  >
                    <FormControl required>
                      <FormLabel>Username</FormLabel>
                      <Input type="text" name="username" />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" name="password" />
                    </FormControl>
                    <Stack sx={{ gap: 4, mt: 2 }}>
                      <Button type="submit" fullWidth>
                        Sign in
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              </Box>
              <Box component="footer" sx={{ py: 3 }}>
                <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                  © HBDb {new Date().getFullYear()}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              height: '70%',
              position: 'fixed',
              width: '27vw',
              right: 0,
              top: '15vh',
              bottom: 0,
              left: { xs: 0, md: '60vw' },
              backgroundSize: 'contain',
              backgroundPosition: 'right',
              backgroundRepeat: 'no-repeat',
              backgroundImage:
                currentPosterIndex.currentPosterIndex
                  ? `url(${posterArray[currentPosterIndex.currentPosterIndex]})`
                  : 'url(http://image.tmdb.org/t/p/w780//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg)',
            })}
          />
        </CssVarsProvider>
      </div>
    ) : (
      <App />
    )
  );
}
