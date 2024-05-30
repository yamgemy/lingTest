import { useCallback } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const RESCALE_TIMING = { duration: 150, easing: Easing.out(Easing.cubic) };

export const useReanimatedTouchScale = (reducedScale = 0.95) => {
  const reanimatedTouchScaleValue = useSharedValue(1);

  const reanimatedTouchScale = useAnimatedStyle(() => ({
    transform: [
      {
        scale: reanimatedTouchScaleValue.value,
      },
    ],
  }));

  const executeResumeOriginalScale = useCallback(() => {
    reanimatedTouchScaleValue.value = withTiming(1, RESCALE_TIMING);
  }, [reanimatedTouchScaleValue]);

  const executeReduceScale = useCallback(() => {
    reanimatedTouchScaleValue.value = withTiming(reducedScale, RESCALE_TIMING);
  }, [reanimatedTouchScaleValue, reducedScale]);

  return {
    reanimatedTouchScale,
    executeResumeOriginalScale,
    executeReduceScale,
  };
};
