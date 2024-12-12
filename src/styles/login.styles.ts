// Constants for common calculations
const POSTER_RATIO = 530/795;
const POSTER_HEIGHT = '80vh';
const POSTER_WIDTH = `calc(${POSTER_HEIGHT} * ${POSTER_RATIO})`;

// Add these constants
const COMMON_Z_INDEX = 999;
const HEADER_SPACING = '1rem';

export const loginStyles = {
  // Layout styles
  mainBox: (theme: any) => ({
    width: { xs: '100%', md: '50vw' },
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    backdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(255 255 255 / 0.2)',
    transition: 'width var(--Transition-duration)',
    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
    [theme.getColorSchemeSelector('dark')]: {
      backgroundColor: 'rgba(19 19 24 / 0.4)',
    },
  }),

  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    width: '100%',
    px: 2,
  },

  // Form styles
  formBox: {
    my: 'auto',
    py: 2,
    pb: 5,
    width: 400,
    maxWidth: '100%',
    mx: 'auto',
    borderRadius: 'sm',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    '& form': {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
  },

  // Poster styles
  posterContainer: {
    position: 'fixed',
    height: POSTER_HEIGHT,
    width: `calc(${POSTER_WIDTH} - 1px)`,
    right: `calc((50vw - ${POSTER_WIDTH}) / 2)`,
    top: '10vh',
    overflow: 'hidden',
    zIndex: 0,
  },

  posterSlider: {
    display: 'flex',
    height: '100%',
  },

  posterImage: {
    minWidth: POSTER_WIDTH,
    height: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },

  // Navigation dots styles
  dotContainer: {
    position: 'fixed',
    bottom: '40px',
    left: { xs: '50%', md: '75%' },
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    zIndex: 2,
  },
  
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: '#999',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  // Header styles
  headerBox: {
    position: 'fixed',
    top: HEADER_SPACING,
    left: HEADER_SPACING,
    zIndex: COMMON_Z_INDEX,
  },

  colorSchemeButton: {
    position: 'fixed',
    top: HEADER_SPACING,
    right: HEADER_SPACING,
    zIndex: COMMON_Z_INDEX,
  },

  // Typography styles
  titleStack: {
    gap: 1,
  },

  formStack: {
    gap: 4,
    mt: 2,
  },

  footer: {
    py: 3,
  },

  footerText: {
    textAlign: 'center',
  },
}; 