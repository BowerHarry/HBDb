import { useState, useRef, useEffect } from 'react';

interface UsePosterAnimationProps {
  posterArray: string[];
  transitionDuration?: number;
  intervalDuration?: number;
}

export const usePosterAnimation = ({ 
  posterArray, 
  transitionDuration = 500,
  intervalDuration = 5000 
}: UsePosterAnimationProps) => {
  const [poster, setPoster] = useState({ index: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const previousIndex = useRef(0);
  const intervalId = useRef<NodeJS.Timeout>();

  const startTimer = () => {
    intervalId.current = setInterval(() => {
      setPoster(prev => {
        const nextIndex = prev.index + 1;
        return { index: nextIndex };
      });
    }, intervalDuration);
  };

  const handleDotClick = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (direction === 'prev') {
      setPoster({ index: (poster.index - 1 + posterArray.length) % posterArray.length });
    } else {
      setPoster({ index: poster.index + 1 });
    }
    
    clearInterval(intervalId.current);
    startTimer();

    setTimeout(() => {
      setIsAnimating(false);
    }, transitionDuration);
  };

  // Handle reset when reaching the end
  useEffect(() => {
    if (poster.index >= posterArray.length) {
      previousIndex.current = poster.index;
      const resetTimeout = setTimeout(() => {
        setPoster({ index: 0 });
      }, transitionDuration);
      return () => clearTimeout(resetTimeout);
    }
  }, [poster.index, posterArray.length, transitionDuration]);

  // Start timer on mount
  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalId.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentIndex: poster.index,
    isAnimating,
    previousIndex: previousIndex.current,
    handleDotClick
  };
}; 