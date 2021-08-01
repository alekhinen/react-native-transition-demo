import React from 'react';
import {Pressable, View} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import Video from 'react-native-video';

export default function DetailScreen(props: NavigationComponentProps) {
  const dimensions = {height: 256, width: 128};

  const transition = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Video',
        options: {
          animations: {
            push: {
              sharedElementTransitions: [
                {
                  fromId: `video-bruh-dest`,
                  toId: `video-bruh`,
                  interpolation: {type: 'spring'},
                },
              ],
            },
          },
        },
      },
    });
  };

  return (
    <View>
      <Pressable onPress={transition}>
        <Video
          source={{
            uri: 'https://d2osydnumde131.cloudfront.net/lobby_drmarten_jjjound_021627490770565.mp4',
          }}
          style={{
            height: dimensions.width,
            width: dimensions.height,
            transform: [
              {rotate: '90deg'},
              {translateX: dimensions.width / 2},
              {translateY: (dimensions.height - dimensions.width) / 2},
            ],
          }}
          resizeMode="cover"
          nativeID={'video-bruh-dest'}
        />
      </Pressable>
    </View>
  );
}
