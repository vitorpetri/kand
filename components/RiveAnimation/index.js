import React, { useRef, useEffect } from 'react';
import Rive from 'rive-react';

const KandRive = '/kand.riv'

const RiveAnimation = ({ artboard, className, visible }) => {
    const riveRef = useRef(null);

    useEffect(() => {
        if (visible) {
            // trigger animation state change here if needed
        }
    }, [visible]);

    return (
        <div ref={riveRef} className={className}>
            <Rive src={KandRive} artboard={artboard} />
        </div>
    );
};

export default RiveAnimation;
