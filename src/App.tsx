import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { Player } from "@lottiefiles/react-lottie-player";
import orbitsMoving from "./lotties/all_orbits_moving.json";
import earth from "./assets/earth.png";
import OrbitTitleGroup from "./components/OrbitTitleGroup";
import SingleOrbitImage from "./components/SingleOrbitImage";
import SingleOrbitAnimation from "./components/SingleOrbitAnimation";
import SingleOrbitAnimationDetails from "./components/SingleOrbitAnimationDetails";
import TestStaticImgCloseup from "./components/TestStaticImgCloseup";
import PopUpLine from "./components/PopUpLine";
import PopUpText from "./components/PopUpText";
import OrbitCloseupText from "./components/OrbitCloseupText";
import SplashScreen from "./components/SplashScreen";
import orbitBackground from "./assets/orbit_background.png";

export const App: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [hoveringId, setHoveringId] = useState<string>("");
  const [flyToId, setflyToId] = useState<string>("");
  const [flyTransitionEnded, setflyTransitionEnded] = useState(false);
  const [currentStaticImg, setCurrentStaticImg] = useState<string>("");
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  const orbitIds = ["leo", "meo", "heo", "gso", "geo", "gto"];

  const lottiePlayerRef = useRef<Player | null>(null);

  const handleSetSplashScreen = () => {
    setIsSplashScreen(false);

    const splashScreen = document.getElementById("splash_screen_background");
    if (splashScreen) {
      splashScreen.style.animation = "fade-out 2s ease forwards";
    }
  };

  const handleSetActive = (id: string) => {
    setActiveId(id);
  };

  const handleSetHover = (id: string) => {
    setHoveringId(id);
  };

  const handleFly = (id: string) => {
    setflyToId(id);
  };

  const handleResize = () => {
    adjustElementScale(document.documentElement.clientWidth);
    resetOrbitSelection();
  };

  function adjustElementScale(windowWidth: number) {
    const earth_orbits_container = document.getElementById(
      "earth_orbits_container"
    );

    if (earth_orbits_container) {
      if (windowWidth === 1920) {
        const existingTransform = earth_orbits_container.style.transform;
        if (existingTransform && existingTransform.includes("scale(")) {
          const updatedTransform = existingTransform.replace(
            /scale\([^)]*\)\s*/g,
            ""
          );
          earth_orbits_container.style.transform =
            updatedTransform + " " + "scale(1)";
        } else {
          earth_orbits_container.style.transform = "scale(1)";
        }
      } else if (windowWidth < 1920 && windowWidth > 500) {
        const loss = 1920 - windowWidth;
        const percentLoss = Math.round(loss / 19.2);
        const scaleNum = 1 - percentLoss / 100;
        const scale = "scale(" + scaleNum + ")";

        // Check if the element already has a transform style
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
        const scale = "scale(" + scaleNum + ")";

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

  function resetOrbitSelection() {
    setActiveId("");
    setHoveringId("");
  }

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    adjustElementScale(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    if (flyToId) {
      const element = document.getElementById(
        flyToId + "_sat_" + currentStaticImg
      );
      element?.classList.remove("static_satellite_closeup");
      // Re-add the class with a slight delay to restart the animation
      setTimeout(() => {
        element?.classList.add("static_satellite_closeup");
      }, 1);
    }
  }, [currentStaticImg, flyToId]);

  //This was for when an orbit is hovered, and no other orbit is selected, but I had to change it from using the full player to show the non-hovered (dimmed) orbits, to individual orbit animations, so I'll have to go back and remove this at some point
  useEffect(() => {
    if (lottiePlayerRef.current) {
      // Pause the animation if hoveringId is present, play otherwise
      if (hoveringId) {
        lottiePlayerRef.current.pause();
      } else {
        lottiePlayerRef.current.play();
      }
    }
  }, [hoveringId]);

  //not sure if this is needed anymore
  const handleflyTransitionEnd = () => {
    const element = document.getElementById("earth_orbits_container");
    if (element) {
      if (element.classList.contains("earth_fly_out")) {
        //this is handling the fly out
        element.classList.remove("earth_fly_out");
      } else {
        //this is handling the fly in
        setflyTransitionEnded(true);
      }
    }
  };

  const handleSetStaticImg = (imgId: string) => {
    setCurrentStaticImg(imgId);
  };

  const handleReturntoMain = () => {
    setActiveId("");
    setCurrentStaticImg("");
    setHoveringId("");
    setflyToId("");
    setflyTransitionEnded(false);
    adjustElementScale(document.documentElement.clientWidth);
  };

  return (
    <div className="background_container">
      {isSplashScreen && <div id="splash_screen_background" className="splash_screen_background">
        <SplashScreen setSplashScreen={handleSetSplashScreen} />
      </div>}

      {!isSplashScreen && (
        <div className="nav_container">
          {!flyToId && (
            <div className="orbit_title_container">
              {orbitIds.map((id, index) => {
                return (
                  <OrbitTitleGroup
                    id={id}
                    setActive={handleSetActive}
                    activeId={activeId}
                    setHover={handleSetHover}
                    hoverId={hoveringId}
                    tabIndex={index}
                  />
                );
              })}

              <div className="popup_line_container">
                {orbitIds.map((id) => {
                  return <PopUpLine id={id} activeId={activeId} />;
                })}
              </div>
            </div>
          )}

          {!flyToId && activeId && (
            <PopUpText id={activeId} setFly={handleFly} />
          )}
        </div>
      )}
      <div
        id="earth_orbits_container"
        className={"earth_orbits_container"}
        onTransitionEnd={handleflyTransitionEnd}
        onClick={resetOrbitSelection}
      >
        {!activeId && !hoveringId && (
          <Player
            ref={lottiePlayerRef}
            src={orbitsMoving}
            className="player"
            autoplay
          />
        )}

        {<img src={earth} className="earth" alt="earth" />}

        {activeId && <SingleOrbitImage id={activeId} imageDesc="_label" />}

        {/* on hovering over a tab, with no other current active orbit tab */}
        {!activeId && hoveringId && 
         orbitIds.map((id) => {
          if(hoveringId !== "gto"){
            return (
              <SingleOrbitAnimation
              id={id}
              player={Player}
              desc="_orbit_moving"
              shouldPlay={id === hoveringId}
            />
            );  
          } else {
            return (
              <SingleOrbitImage id={"gto"} imageDesc="_solid_hover"/>
            );  
          }

        })
  
         }

        {/* on hovering over a tab, with a different orbit tab currently active/selected */}
        {activeId &&
          hoveringId &&
          activeId !== hoveringId && (
            <SingleOrbitImage id={hoveringId} imageDesc="_solid" />
          )}

        {activeId && <SingleOrbitImage id={activeId} imageDesc="_fill" />}

        {/* this is getting hacky, need a better way to have it not break on gto */}
        {activeId && activeId !== "gto" && (
          <SingleOrbitAnimation
            id={activeId}
            player={Player}
            desc="_orbit_moving"
            shouldPlay={true}
          />
        )}

        {activeId &&
          orbitIds
            .filter((id) => id !== activeId && id !== hoveringId)
            .map((id) => {
              return <SingleOrbitImage id={id} imageDesc="_dotted" />;
            })}
      </div>

      {flyToId && flyTransitionEnded && (
        <img
          src={orbitBackground}
          id="orbit_background"
          className="orbit_background"
          alt="orbit_background"
        />
      )}
      {flyToId && flyTransitionEnded && (
        <OrbitCloseupText
          id={flyToId}
          setStaticImg={handleSetStaticImg}
          currentStaticImg={currentStaticImg}
          unsetFlyTo={handleReturntoMain}
        />
      )}
      {!currentStaticImg && flyTransitionEnded && (
        <SingleOrbitAnimationDetails
          id={flyToId}
          player={Player}
          desc="_orbit_details"
        />
      )}

      {currentStaticImg && (
        <TestStaticImgCloseup id={flyToId} imageNum={currentStaticImg} />
      )}
    </div>
  );
};

export default App;
