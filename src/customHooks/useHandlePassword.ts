import { useState } from 'react';

export const useHandlePassword = () => {
    const [isVisible, setIsVisible] = useState(false);

    const togglePassword = () => { setIsVisible((show) => !show); };

    return {
        isVisible,
        togglePassword
    };
};
