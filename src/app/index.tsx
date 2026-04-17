import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'
import { initializeMSW } from '../lib/msw'

import '../../msw.polyfills'

function Index() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        initializeMSW().then(() => {
            setIsReady(true);
        });
    }, []);

    if (!isReady) {
        return null;
    }

    return <Redirect href="/(tabs)/home" />
}

export default Index
