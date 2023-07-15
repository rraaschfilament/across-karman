import React, { useEffect, useState } from 'react';
import './App.css';
import { Player } from '@lottiefiles/react-lottie-player';
import orbitsMoving from './lotties/all_orbits_moving.json';
import earth from './assets/earth.png';
import OrbitTitleGroup from './components/OrbitTitleGroup';
import SingleOrbitImage from './components/SingleOrbitImage';
import SingleOrbitAnimation from './components/SingleOrbitAnimation';
import TestStaticImgCloseup from './components/TestStaticImgCloseup';
import PopUpLine from './components/PopUpLine';
import PopUpText from './components/PopUpText';
import OrbitCloseupText from './components/OrbitCloseupText';
import orbitBackground from './assets/orbit_background.png';

export const App: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('');
  const [hoveringId, setHoveringId] = useState<string>('');
  const [flyToId, setflyToId] = useState<string>('');
  const [flyTransitionEnded, setflyTransitionEnded] = useState(false);
  const [currentStaticImg, setCurrentStaticImg] = useState<string>('');

  const orbitIds = ["leo", "meo", "heo", "gso", "geo", "gto"];
 
  const handleSetActive = (id: string) => {
    setActiveId(id);
  };

  const handleSetHover = (id: string) => {
    setHoveringId(id);
  };

  const handleFly = (id: string) => {
    setflyToId(id);
  };

  useEffect(() => {
    const handleflyTransitionEnd = () => {
      setflyTransitionEnded(true);
    };

    const elementName = 'earth_orbits_container';
    const element = document.getElementById(elementName);
    if (element) {
      element.addEventListener('transitionend', handleflyTransitionEnd);
    }
    return () => {
      if (element) {
        element.removeEventListener('transitionend', handleflyTransitionEnd);
      }
    };
  }, []);  

  const handleSetStaticImg = (imgId : string) => {
    console.log(imgId);
    setCurrentStaticImg(imgId);
  };

  const handleReturntoMain = () => {
    setActiveId('');
    setCurrentStaticImg('');
    setHoveringId('');
    setflyToId('');
    setflyTransitionEnded(false);
  }



  return (

    <div className="background_container" >
      <div className="nav_container">
        {!flyToId && <div className="orbit_title_container">
          {orbitIds.map((id) => {
            return <OrbitTitleGroup id={id} setActive={handleSetActive} activeId={activeId} setHover={handleSetHover} />
              }
          )}

          {orbitIds.map((id) => {
                    return <PopUpLine id={id} activeId={activeId} />
                  }
                  )
                  }

        </div>}


          {!flyToId && activeId && <PopUpText id={activeId} setFly={handleFly} />}

      </div>
      <div id="earth_orbits_container" className="earth_orbits_container" >


        {!activeId && <Player src={orbitsMoving} className="player" autoplay />}
        {<img src={earth} className="earth" alt="earth" />}

        {/* May need something different here.  Could have a different active and hovering tab */}
        {hoveringId && <SingleOrbitImage id={hoveringId} imageDesc='_label' />}

        {hoveringId && <SingleOrbitAnimation id={hoveringId} player={Player} desc="_orbit_moving" />}

        {activeId && <SingleOrbitImage id={activeId} imageDesc='_fill' />}

        {activeId && orbitIds.filter(id => id !== activeId).map((id) => {
          return <SingleOrbitImage id={id} imageDesc='_dotted' />
        }
        )}
      </div>
      {flyToId && activeId && <img src={orbitBackground} id="orbit_background" className="orbit_background" alt="orbit_background" />}
      {flyToId && <div className="orbit_closeup_container"><OrbitCloseupText id={flyToId} setStaticImg={handleSetStaticImg} currentStaticImg={currentStaticImg} unsetFlyTo={handleReturntoMain}/></div>}
      {!currentStaticImg && flyTransitionEnded && <SingleOrbitAnimation id={flyToId} player={Player} desc="_orbit_details" />}
      {/* {currentStaticImg && <SingleOrbitImage id={flyToId} imageDesc={"_sat_" + currentStaticImg}/>} */}
      {currentStaticImg && <TestStaticImgCloseup id={flyToId} imageNum={currentStaticImg}/>}

    </div>
  );
};

export default App;