import React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { loginStyles } from '../../styles/login.styles';


interface PosterDotsProps {
  onDotClick: (direction: 'prev' | 'next') => void;
  disabled?: boolean;
}

export const PosterDots: React.FC<PosterDotsProps> = ({ onDotClick, disabled = false }) => (
  <Stack sx={loginStyles.dotContainer}>
    <Box 
      sx={{
        ...loginStyles.dot,
        backgroundColor: '#999',
        cursor: disabled ? 'default' : 'pointer',
        '&:hover': !disabled ? {
          transform: 'scale(1.2)',
        } : {},
      }}
      onClick={() => !disabled && onDotClick('prev')}
    />
    <Box 
      sx={{
        ...loginStyles.dot,
        backgroundColor: '#333',
      }}
    />
    <Box 
      sx={{
        ...loginStyles.dot,
        backgroundColor: '#999',
        cursor: disabled ? 'default' : 'pointer',
        '&:hover': !disabled ? {
          transform: 'scale(1.2)',
        } : {},
      }}
      onClick={() => !disabled && onDotClick('next')}
    />
  </Stack>
); 