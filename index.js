import {Navigation} from 'react-native-navigation';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import VideoScreen from './src/VideoScreen';
import DetailScreen from './src/DetailScreen';

AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent('com.TransitionExample.WelcomeScreen', () => App);

Navigation.registerComponent('Video', () => VideoScreen);
Navigation.registerComponent('Detail', () => DetailScreen);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a',
  },
  topBar: {
    title: {
      color: 'white',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.TransitionExample.WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});
