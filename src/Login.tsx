import React, { useEffect, useState } from 'react';
import { LoginForm } from './components/login/LoginForm';
import { ResetPasswordForm } from './components/login/ResetPasswordForm';
import { RequestAccessForm } from './components/login/RequestAccessForm';
import axios from 'axios';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import App from './App';
import { wsURL, user, sha256, params } from '../helper-functions';
import { loginStyles } from './styles/login.styles';
import { PosterDots } from './components/login/PosterDots';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { usePosterAnimation } from './hooks/usePosterAnimation';

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

interface RequestFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
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
      sx={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 999,
      }}
      {...other}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}



export default function Login() {
  const [loggedIn, setLoggedIn] = useState<ILoggedIn>({ loggedIn: false });
  const [showOptions, setShowOptions] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const { 
    currentIndex, 
    isAnimating, 
    previousIndex, 
    handleDotClick 
  } = usePosterAnimation({ posterArray });

  async function validateLoginDetails(username: string, password: string) {
    const hashedPassword: string = await sha256(password);
    const response = await axios.post(wsURL("/login"), params({ "username": username, "password": hashedPassword }));
    const authenticatedUser = await response.data as user;
    return authenticatedUser;
  }

  async function loginSubmit(loginData: { username: string; password: string }) {
    const user = await validateLoginDetails(loginData.username, loginData.password);
    if (user && user.active) {
      validateKey(user.tmdbAPIKey);
    }
  }

  async function validateKey(APIKey: string) {
    const response = await axios.post(wsURL("/tmdb/auth"), params({ "APIKey": APIKey }));
    if (response.status === 200) {
      setLoggedIn({ loggedIn: true });
    }
  }

  const handleRequestSubmit = (event: React.FormEvent<RequestFormElements>) => {
    event.preventDefault();
    // Handle the request submission logic here
    setShowRequestForm(false);
    
  };

  const handleResetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the request submission logic here
    setShowResetForm(false);
    const formElement = event.currentTarget.email;
    const response = await axios.post(wsURL("/reset"), params({ "email": formElement.value }));
    console.log(response);
  };

  return (
    !loggedIn.loggedIn ? (
      <div>
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box
            component="header"
            sx={{ 
              position: 'fixed',
              top: '1rem',
              left: '1rem',
              zIndex: 999,
            }}
          >
            <Typography level="title-lg">HBDb</Typography>
          </Box>
          <ColorSchemeToggle />
          <Box sx={loginStyles.mainBox}>
            <Box sx={loginStyles.contentBox}>
              <Box component="main" sx={loginStyles.formBox}>
                <Stack sx={{ gap: 1 }}>
                  <Typography component="h1" level="h3">
                    {!showRequestForm && !showResetForm ? 'Sign in' : ''}
                    {showRequestForm ? 'Request Access' : ''}
                    {showResetForm ? 'Reset Password' : ''}
                  </Typography>
                </Stack>
                <Stack sx={{ gap: 4, mt: 2 }}>
                  {!showRequestForm && !showResetForm ? (
                    <LoginForm 
                      onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                        event.preventDefault();
                        const formElements = event.currentTarget.elements;
                        const data = {
                          username: formElements.username.value,
                          password: formElements.password.value,
                        };
                        loginSubmit(data);
                      }}
                      onShowOptions={() => setShowOptions(!showOptions)}
                      showOptions={showOptions}
                      onResetPassword={() => setShowResetForm(true)}
                      onRequestAccess={() => setShowRequestForm(true)}
                    />
                  ) : showRequestForm ? (
                    <RequestAccessForm 
                      onSubmit={handleRequestSubmit}
                      onBack={() => setShowRequestForm(false)}
                    />
                  ) : (
                    <ResetPasswordForm
                      onSubmit={handleResetSubmit}
                      onBack={() => setShowResetForm(false)}
                    />
                  )}
                </Stack>
              </Box>
              <Box component="footer" sx={{ py: 3 }}>
                <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                  © HBDb {new Date().getFullYear()}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={loginStyles.posterContainer}>
            <Box 
              sx={{
                ...loginStyles.posterSlider,
                transform: `translateX(-${currentIndex * (80 * 530/795)}vh)`,
                transition: currentIndex === 0 && previousIndex === posterArray.length 
                  ? 'none' 
                  : 'transform 0.5s ease-in-out'
              }}
            >
              {posterArray.map((url, index) => (
                <Box key={index} sx={{...loginStyles.posterImage, backgroundImage: `url(${url})`}} />
              ))}
              <Box key="loop" sx={{...loginStyles.posterImage, backgroundImage: `url(${posterArray[0]})`}} />
            </Box>
          </Box>
          <PosterDots onDotClick={handleDotClick} disabled={isAnimating} />
        </CssVarsProvider>
      </div> 
    ) : (
      <App />
    )
  );
}
