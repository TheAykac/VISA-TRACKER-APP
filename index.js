/**
 * @format
 * @Flow strict-local
 */

import start from './app/containers/App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => start);


