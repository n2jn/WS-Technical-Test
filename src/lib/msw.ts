import { Platform } from 'react-native';

let mswInitPromise: Promise<void> | null = null;

export function initializeMSW(): Promise<void> {
  if (mswInitPromise) {
    return mswInitPromise;
  }

  mswInitPromise = (async () => {
    try {
      if (Platform.OS === 'web') {
        const { setupWorker } = await import('msw');
        const { handlers } = await import('../../extra/msw_api/handlers');
        const worker = setupWorker(...handlers);
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
      } else {
        const { server } = await import('../../extra/msw_api/native-server/server');
        server.listen();
      }
    } catch (error) {
      throw error;
    }
  })();

  return mswInitPromise;
}