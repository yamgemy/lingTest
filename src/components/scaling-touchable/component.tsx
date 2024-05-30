import { useReanimatedTouchScale } from '@animations/use-reanimated-touch-scale';
import React, { Ref, forwardRef, useMemo } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import Animated from 'react-native-reanimated';

type ScalingTouchableProps = {
  animatedWrapStyle?: any,
  children?: React.ReactElement,
  onPress?: () => void,
  reducedScale?: number,
  activeOpacity?: number
  hitSlopSize?: 'large' | 'medium' | 'xlarge' | 'none'
};

const MID_HITSLOP = { top: 10, left: 10, right: 10, bottom: 10 };
const LARGE_HITSLOP = { top: 20, left: 20, right: 20, bottom: 20 };
const XLARGE_HITSLOP = { top: 30, left: 30, right: 30, bottom: 30 };

/*

React.forwardRef
<Touchable , ScalingTouchableProps & PressableProps>
*/
const ScalingTouchableFC = 
((props: ScalingTouchableProps & PressableProps, ref: Ref<View> ) => {
  const {
    reducedScale,
    animatedWrapStyle,
    children,
    onPress,
    hitSlopSize,
    ...rest
  } = props;
  const { reanimatedTouchScale,
    executeResumeOriginalScale,
    executeReduceScale } = useReanimatedTouchScale(reducedScale);

  const getHitSlop = useMemo(() => {
    if (hitSlopSize === 'large') { return LARGE_HITSLOP; }
    if (hitSlopSize === 'xlarge') { return XLARGE_HITSLOP; }
    if (hitSlopSize === 'medium') { return MID_HITSLOP; }
    return {};
  }, [hitSlopSize]);

  return (
    <Animated.View style={[reanimatedTouchScale, animatedWrapStyle]}>
      <Pressable
          ref={ref}
          {...rest}
          hitSlop={getHitSlop}
          onPress={onPress || undefined}
          onPressIn={executeReduceScale}
          onPressOut={executeResumeOriginalScale}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
});

export const ScalingTouchable =  forwardRef(ScalingTouchableFC);