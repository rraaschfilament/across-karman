import React from "react";
import { useDispatch } from 'react-redux';
import { setIsSplashScreen } from '../features/appSlice';

const SplashScreen: React.FC = () => {
    const dispatch = useDispatch();

    const handleUnsetSplash = () => {
        const splashScreen = document.getElementById("splash_screen_background");
        if (splashScreen) {
          splashScreen.style.animation = "fade-out 2s ease forwards";
        }
        setTimeout(() => {
          dispatch(setIsSplashScreen(false)); // Use the correct action payload type
        }, 1500);
    }
    return (
      <div id="splash_screen_background" className="splash_screen_background" role="banner">
            <div className="splash_screen_text">
                <div className="splash_screen_title">LAUNCHING INTO ORBIT</div>
                <div className="splash_screen_subtitle">A SPOTLIGHT ON SATELLITES</div>
                <div className="splash_screen_body">66 years after the first satellite, Sputnik I, was successfully launched into orbit by the Soviet Union, the impact of satellites is more integrated into our lives than ever before. Here we will take you through five layers of orbit we use for satellites and other space bodies to answer the core questions: what do we put into space, and why do we put it where it is?</div>
                <button className="splash_screen_button" onClick={handleUnsetSplash}>READY TO LAUNCH</button>
            </div>
      </div>

    );
};

export default SplashScreen;