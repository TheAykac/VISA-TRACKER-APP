/**
 * @format
 * @Flow strict-local
 */

import App from './app/containers/App.js'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);


