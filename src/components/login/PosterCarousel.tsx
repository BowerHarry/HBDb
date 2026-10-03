import React from 'react';
import Box from '@mui/joy/Box';
import { loginStyles } from '../../styles/login.styles';
import { PosterDots } from './PosterDots';
import { usePosterAnimation } from '../../hooks/usePosterAnimation';

interface PosterCarouselProps {
  posters: string[];
}

export const PosterCarousel: React.FC<PosterCarouselProps> = ({ posters }) => {
  const {
    currentIndex,
    isAnimating,
    previousIndex,
    handleDotClick
  } = usePosterAnimation({ posterArray: posters });

  return (
    <>
      <Box sx={loginStyles.posterContainer}>
        <Box
          sx={{
            ...loginStyles.posterSlider,
            transform: `translateX(-${currentIndex * (80 * 530/795)}vh)`,
            transition: currentIndex === 0 && previousIndex === posters.length
              ? 'none'
              : 'transform 0.5s ease-in-out'
          }}
        >
          {posters.map((url, index) => (
            <Box key={index} sx={{...loginStyles.posterImage, backgroundImage: `url(${url})`}} />
          ))}
          <Box key="loop" sx={{...loginStyles.posterImage, backgroundImage: `url(${posters[0]})`}} />
        </Box>
      </Box>
      <PosterDots onDotClick={handleDotClick} disabled={isAnimating} />
    </>
  );
};
