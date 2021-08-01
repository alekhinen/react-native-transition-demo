import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Video from 'react-native-video';

export default function VideoScreen(props: NavigationComponentProps) {
  const dimensions = useWindowDimensions();
  const [display, setDisplay] = useState<boolean>(false);

  const width = useSharedValue(dimensions.width);
  const height = useSharedValue(dimensions.height);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacityProduct = useSharedValue(0);

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(height.value),
      height: withTiming(width.value),
    };
  });

  const translationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: '90deg'},
        {translateY: withTiming(translateY.value)},
        {translateX: withTiming(translateX.value)},
      ],
    };
  });

  const opacityStyles = useAnimatedProps(() => {
    return {
      opacity: withDelay(350, withTiming(opacityProduct.value)),
    };
  });

  function setD(d: boolean) {
    setDisplay(d);
  }

  useAnimatedReaction(
    () => {
      return translateY.value;
    },
    (result, previous) => {
      if (result !== previous) {
        runOnJS(setD)(result !== 0);
      }
    },
    [setD],
  );

  const transition = () => {
    if (height.value < dimensions.height) {
      height.value = dimensions.height;
      translateY.value = 0;
      opacityProduct.value = 0;
    } else {
      height.value = 256;
      translateY.value = 256 / 2 - 22;
      opacityProduct.value = 1;
    }

    if (width.value < dimensions.width) {
      width.value = dimensions.width;
      translateX.value = 0;
    } else {
      width.value = 256 * (9 / 16);
      translateX.value = (256 * (9 / 16)) / 2 + 94;
    }
  };

  return (
    <View style={{width: dimensions.width, height: dimensions.height}}>
      {display && (
        <Animated.View
          style={[
            {
              paddingHorizontal: 16,
              backgroundColor: 'white',
              height: '100%',
            },
            opacityStyles,
          ]}>
          <ScrollView style={{height: '100%'}}>
            <View style={{marginTop: 300}} />
            <Text style={{fontWeight: '700', fontSize: 24}}>Products</Text>
            <Text style={{fontWeight: '400', fontSize: 16}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              laoreet, lectus et tincidunt vulputate, ante ipsum lobortis metus,
              non semper dolor felis vel magna. Vestibulum cursus purus a
              interdum dictum. Suspendisse potenti. Nam lobortis vitae metus
              sagittis congue. Mauris faucibus mauris ac semper vehicula. Duis
              in ex eu quam dictum luctus. Quisque non scelerisque ante. Aliquam
              ornare, est non tincidunt scelerisque, lacus dui interdum sem, in
              placerat mauris neque quis magna. Aliquam venenatis blandit orci,
              vel bibendum massa molestie ac. Nam tempus hendrerit gravida.
              Nulla facilisi.
            </Text>
            <Text style={{fontWeight: '700', fontSize: 24}}>Wooooo</Text>
            <Text style={{fontWeight: '400', fontSize: 16}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              laoreet, lectus et tincidunt vulputate, ante ipsum lobortis metus,
              non semper dolor felis vel magna. Vestibulum cursus purus a
              interdum dictum. Suspendisse potenti. Nam lobortis vitae metus
              sagittis congue. Mauris faucibus mauris ac semper vehicula. Duis
              in ex eu quam dictum luctus. Quisque non scelerisque ante. Aliquam
              ornare, est non tincidunt scelerisque, lacus dui interdum sem, in
              placerat mauris neque quis magna. Aliquam venenatis blandit orci,
              vel bibendum massa molestie ac. Nam tempus hendrerit gravida.
              Nulla facilisi.
            </Text>
            <Text style={{fontWeight: '700', fontSize: 24}}>Wooooo</Text>
            <Text style={{fontWeight: '700', fontSize: 24}}>Wooooo</Text>
            <Text style={{fontWeight: '700', fontSize: 24}}>Wooooo</Text>
          </ScrollView>
        </Animated.View>
      )}

      <View
        style={{
          width: dimensions.width,
          height: dimensions.height,
          position: 'absolute',
          backgroundColor: 'transparent',
        }}
        pointerEvents="box-none">
        <Pressable onPress={transition}>
          <Animated.View style={translationStyles}>
            <Animated.View style={defaultSpringStyles}>
              <Video
                source={{
                  uri: 'https://d2osydnumde131.cloudfront.net/lobby_drmarten_jjjound_021627490770565.mp4',
                }}
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                nativeID={'video-bruh'}
              />
            </Animated.View>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
