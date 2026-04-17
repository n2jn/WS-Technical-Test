import { registerRootComponent } from 'expo';
import App from './App';

import './msw.polyfills'
import { server } from './extra/msw_api/native-server/server'

async function enableMocking() {
  server.listen()
}

enableMocking().then(() => registerRootComponent(App));
