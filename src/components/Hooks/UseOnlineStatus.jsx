import { useState, useEffect } from "react";

const UseOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect (() => {

        const changeFavicon = (src) => {
            const link = document.querySelector("link[rel*='icon']");
            if(link) {
                link.href = src;
            }
        };

        const handleOnline = () => {setIsOnline(true); changeFavicon('/logo.svg');};
        const handleOffline = () => {setIsOnline(false); changeFavicon('/offline.svg');};

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        //Update favicon based on state
        // const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        // link.type = 'image/x-icon';
        // link.rel = 'shortcut icon';
        // link.href = isOnline ? '../../../public/logo.svg' : '../../../public/offline.svg';
        // document.getElementsByTagName('head')[0].appendChild(link);
        if(!navigator.onLine) {
            handleOffline();
        };

        return () => {
            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);
        };
    }, []);
    return isOnline;
}

export default UseOnlineStatus;