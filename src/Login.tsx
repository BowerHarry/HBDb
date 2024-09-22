import React, {Dispatch, useReducer, useState} from 'react';
import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
// import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
// import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
// import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from './Googlelcon';
import { BiLogIn } from 'react-icons/bi';
import { Props } from 'react-loader-spinner';
import App from './App';
// import { useState } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore"; 
import { signInAnonymously, getAuth } from 'firebase/auth';
import { CiTurnR1 } from 'react-icons/ci';
import { useTransition, animated, config } from '@react-spring/web'
// import { useTransition, animated, config } from 'react-spring'


// const [moviePosters, setMoviePosters] = useState<ILoggedIn>({loggedIn: false});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABkrB_wEHIcJZl8Mo253MDu8jyrUrBTKg",
  authDomain: "hbdb-1459b.firebaseapp.com",
  projectId: "hbdb-1459b",
  storageBucket: "hbdb-1459b.appspot.com",
  messagingSenderId: "321974365769",
  appId: "1:321974365769:web:b8b7dfe1fb9d4d3fd81998",
  measurementId: "G-PE0LBV70GJ"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const userCredential = await signInAnonymously(auth);
const user = userCredential.user;
    // User is signed in
// console.log("User signed in:", user);
const firebaseUser = auth.currentUser;
  // if (currentUser) {
  //   // const userId = currentUser.uid;
  //   const usersRef = collection(db, 'users');
  //   const q = query(usersRef);
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }
  

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

var APIUSERToken = ""
const hashedPassword = await(sha256('apiuser'))
const usersRef = collection(db, 'users');
const q = query(usersRef, where('username', '==', '$API_USER$'), where('password', '==', hashedPassword));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  APIUSERToken = doc.data().tmdbAPIKey;
});
console.log(APIUSERToken)

// const configKeyTyped = "images" as keyof typeof Object;
// const configKeyURLTyped = "base_url" as keyof typeof Object;

const opt = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${APIUSERToken}`
  }
};

var base_url: string

fetch('https://api.themoviedb.org/3/configuration', opt)
.then(response => response.json())
.then(response => (base_url = response.images.base_url))

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${APIUSERToken}`
  }
};
const keyTyped = "poster_path" as keyof typeof Object;
// const value = Obj[keyTyped];
var i = 0
var posterArray: string[] = []
fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    let responseMap = new Map(Object.entries(response.results));
      responseMap.forEach((film) => {
        if (i < 6) {
          posterArray.push(`${base_url}/w780${(film as Object)[keyTyped]}`)
          i++
        }
        
      });
    console.log(posterArray)
              // setLoading(false)
  })

interface ILoggedIn {
  loggedIn: boolean;
}

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
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
      {/* {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />} */}
    </IconButton>
  );
}



// const customTheme = extendTheme({ defaultColorScheme: 'dark' });

export default function Login() {

  const [loggedIn, setLoggedIn] = useState<ILoggedIn>({loggedIn: false});
  const [currentPosterIndex, setCurrentPosterIndex] = useState({currentPosterIndex : 0});
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function updatePoster() {
    setCurrentPosterIndex({currentPosterIndex : ((currentPosterIndex.currentPosterIndex + 1) % posterArray.length )});
  }

  // React.useEffect(() => forceUpdate, [currentPosterIndex]);

  let id = setInterval(updatePoster, 10000)
  // clearInterval(id); // top stop the repetition

  

  class loginObject {
    username: string
    password: string
    persistant: Boolean
  }

  async function validateLoginDetails(username: string, password: string){
    var tmdbAPIKey = ""
    const hashedPassword = await(sha256(password))
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username), where('password', '==', hashedPassword));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tmdbAPIKey = doc.data().tmdbAPIKey;
    });
    return tmdbAPIKey
  }
  
  async function loginSubmit(loginData: loginObject) {
    const tmdbAPIKey = await validateLoginDetails(loginData.username, loginData.password)
    validateKey(tmdbAPIKey)
  }
  
  function validateKey(password: String) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${password}`
      }
    };
    
    fetch('https://api.themoviedb.org/3/authentication', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (response.success){
          setLoggedIn({loggedIn : true});
        }
      })
      .catch(err => console.error(err));
  }
  // const [loggedIn, setLoggedIn] = useState<ILoggedIn>({loggedIn: false});

  return (
      (!loggedIn.loggedIn) ?
      <div>
      <CssVarsProvider  disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
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
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              {/* <IconButton variant="soft" color="primary" size="sm"> */}
                {/* <BadgeRoundedIcon /> */}
              {/* </IconButton> */}
              <Typography level="title-lg">HBDb</Typography>
            </Box>
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
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
              </Stack>

            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                },
              })}
            >
            </Divider>
            <Stack sx={{ gap: 4, mt: 2 }}>
              <form
                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = new loginObject();
                  data.username = formElements.username.value;
                  data.password = formElements.password.value;
                  // data.persistant = formElements.persistent.checked;

                  loginSubmit(data)
                  // alert(JSON.stringify(data, null, 2));
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
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {/* <Checkbox size="sm" label="Remember me" name="persistent" /> */}
                    {/* <Link level="title-sm" href="#replace-with-a-link">
                      Forgot your password?
                    </Link> */}
                  </Box>
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
          // backgroundColor: 'background.level1',
          backgroundSize: 'contain',
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            (currentPosterIndex.currentPosterIndex ?`url(${posterArray[currentPosterIndex.currentPosterIndex]})` : 'url(http://image.tmdb.org/t/p/w780//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg)'),
          // [theme.getColorSchemeSelector('dark')]: {
          //   backgroundImage:
          //     `url(${posterArray[currentPosterIndex.currentPosterIndex]})`,
          // },
        })}
      />
    </CssVarsProvider>
    </div>
    :
    <App />
  );
}