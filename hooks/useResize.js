import { useRef } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function useResize(callback) {
    const callbackRef = useRef(callback);

    useIsomorphicLayoutEffect(() => {
        window.addEventListener('resize', callbackRef.current);

        return () => window.removeEventListener('resize', callbackRef.current);
    }, []);
}

export default useResize;
