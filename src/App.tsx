import React, { useEffect, useState, useRef } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { setActiveId, setHoveringId, setEarthOrbitsScale } from './features/appSlice';

import store, { RootState } from "./app/store";
import "./App.css";

import SplashScreen from "./components/SplashScreen";
import OrbitTitleGroup from "./components/OrbitTitleGroup";
import EarthOrbitsContainer from "./components/EarthOrbitsContainer";
import PopUpLine from "./components/PopUpLine";
import PopUpText from "./components/PopUpText";
import { Player } from "@lottiefiles/react-lottie-player";
import orbitBackground from "./assets/orbit_background.png";
import useIsMobileDevice from "./hooks/isMobileDevice";
import OrbitCloseupText from "./components/OrbitCloseupText";
import SingleOrbitAnimationDetails from "./components/SingleOrbitAnimationDetails";
import StaticImgCloseup from "./components/StaticImgCloseup";


export const App: React.FC = () => {
  const orbitIds = ["leo", "meo", "heo", "gso", "geo", "gto"];

  const dispatch = useDispatch();

  const activeId = useSelector((state: RootState) => state.app.activeId);
  const isSplashScreen = useSelector((state: RootState) => state.app.isSplashScreen);
  const flyToId = useSelector((state: RootState) => state.app.flyToId);
  const currentStaticImg = useSelector((state: RootState) => state.app.currentStaticImg);
  const earthOrbitsScale = useSelector((state: RootState) => state.app.earthOrbitsScale);
  const isMobileDevice = useIsMobileDevice()
  const showNavBar = isMobileDevice || (!isSplashScreen && !isMobileDevice);

  
  const handleResize = () => {
    adjustElementScale(document.documentElement.clientWidth);
    dispatch(setActiveId(''));
    dispatch(setHoveringId(''));
  };

  const resetOrbitSelection = () => {
    dispatch(setActiveId(''));
    dispatch(setHoveringId(''));
}

  function adjustElementScale(windowWidth: number) {
    const earth_orbits_container = document.getElementById(
      "earth_orbits_container"
    );

    if (earth_orbits_container) {
      if (windowWidth >= 1920) {
        //full size, scale will be 1
        dispatch(setEarthOrbitsScale(1));

        // Check if the element already has been scaled
        const existingTransform = earth_orbits_container.style.transform;
        if (existingTransform && existingTransform.includes("scale(")) {
          const updatedTransform = existingTransform.replace(
            /scale\([^)]*\)\s*/g,
            ""
          );
          earth_orbits_container.style.transform =
            updatedTransform + " " + "scale(" + {earthOrbitsScale} + ")";
        } else {
          earth_orbits_container.style.transform = "scale(" + {earthOrbitsScale} + ")";
        }

        // Remove any transform origin that may have been set for a fly transition, will cause the element to be off center
        earth_orbits_container.style.transformOrigin = "";

      } else if (windowWidth < 1920 && windowWidth > 500) {
        const loss = 1920 - windowWidth;
        const percentLoss = Math.round(loss / 19.2);
        const scaleNum = 1 - percentLoss / 100;

        // Set the scale in the redux store
        dispatch(setEarthOrbitsScale(scaleNum));
        const scale = "scale(" + scaleNum + ")";

        // Remove any transform origin that may have been set for a fly transition, will cause the element to be off center
        earth_orbits_container.style.transformOrigin = "";

        // Check if the element already has been scaled
        const existingTransform = earth_orbits_container.style.transform;
        if (existingTransform && existingTransform.includes("scale(")) {
          const updatedTransform = existingTransform.replace(
            /scale\([^)]*\)\s*/g,
            ""
          );
          earth_orbits_container.style.transform =
            updatedTransform + " " + scale;
        } else {
          earth_orbits_container.style.transform = scale;
        }

      } else if (windowWidth <= 500) {
        const loss = 500 - windowWidth;
        const percentLoss = Math.round(loss / 5);
        const scaleNum = 1 - percentLoss / 100;

        // Set the scale in the redux store
        dispatch(setEarthOrbitsScale(scaleNum));

        const scale = "scale(" + scaleNum + ")";

        // Check if the element already has been scaled
        const existingTransform = earth_orbits_container.style.transform;
        if (existingTransform && existingTransform.includes("scale(")) {
          const updatedTransform = existingTransform.replace(
            /scale\([^)]*\)\s*/g,
            ""
          );
          earth_orbits_container.style.transform =
            updatedTransform + " " + scale;
        }


      }
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    //adjust for initial window width
    adjustElementScale(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    if (flyToId) {
      const element = document.getElementById(
        flyToId + "_sat_" + currentStaticImg
      );
      console.log('currentStaticImg: ', currentStaticImg);
      element?.classList.remove("static_satellite_closeup");
      // Re-add the class with a slight delay to restart the animation
      setTimeout(() => {
        element?.classList.add("static_satellite_closeup");
      }, 1);
    }
  }, [currentStaticImg]);

  return (
    <Provider store={store}>
      <div className="background_container">
        {isSplashScreen ? (
          <SplashScreen />
        ) : (
          <><div className="reset_orbit_selection_container">
              <div
                className="reset_selection top"
                onClick={resetOrbitSelection}
              ></div>
              <div
                className="reset_selection bottom"
                onClick={resetOrbitSelection}
              ></div>
            </div>
            <div className="nav_container">
                {!flyToId && (
                  <div className="orbit_title_container">
                    {orbitIds.map((id, index) => {
                      return (
                        <OrbitTitleGroup
                          key={id}
                          id={id}
                          tabIndex={index} />
                      );
                    })}

                    <div className="popup_line_container">
                      {orbitIds.map((id) => {
                        return <PopUpLine key={id + "_popupline"} id={id} />;
                      })}
                    </div>
                  </div>
                )}

                {!flyToId && activeId && (
                  <PopUpText />
                )}
              </div></>

        )}

        <EarthOrbitsContainer />

        {flyToId ? (
          <>
            <img
              src={orbitBackground}
              id="orbit_background"
              className="orbit_background"
              alt="orbit_background"
            />
            <OrbitCloseupText />
            {currentStaticImg ? (
              <StaticImgCloseup key={flyToId + "_sat_" + currentStaticImg}/>
            ) : (
              <SingleOrbitAnimationDetails
                id={flyToId}
                player={Player}
                desc="_orbit_details"
              />
            )}
          </>
        ) : null}

      </div>
    </Provider>
  );
};

export default App;
