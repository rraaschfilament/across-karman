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

  const handleResize = () => {
    adjustElementScale(document.documentElement.clientWidth);
    removeLine();
  };

  function adjustElementScale(windowWidth: number) {

    const earth_orbits_container = document.getElementById('earth_orbits_container');
  
    if (earth_orbits_container) {
      if (windowWidth === 1920) {
        const existingTransform = earth_orbits_container.style.transform;
        if (existingTransform && existingTransform.includes('scale(')) {
          const updatedTransform = existingTransform.replace(/scale\([^)]*\)\s*/g, '');
          earth_orbits_container.style.transform = updatedTransform + ' ' + "scale(1)";
        } else {
          earth_orbits_container.style.transform = "scale(1)";
        }
  
      }
      else if (windowWidth < 1920 && windowWidth > 500) {
        const loss = 1920 - windowWidth;
        const percentLoss = Math.round(loss / 19.2);
        const scaleNum = 1 - (percentLoss / 100);
        const scale = "scale(" + scaleNum + ")";
  
        // Check if the element already has a transform style
        const existingTransform = earth_orbits_container.style.transform;
        if (existingTransform && existingTransform.includes('scale(')) {
          const updatedTransform = existingTransform.replace(/scale\([^)]*\)\s*/g, '');
          earth_orbits_container.style.transform = updatedTransform + ' ' + scale;
        } else {
          earth_orbits_container.style.transform = scale;
        }
      } else if (windowWidth <= 500) {
        const loss = 500 - windowWidth;
        const percentLoss = Math.round(loss / 5);
        const scaleNum = 1 - (percentLoss / 100);
        const scale = "scale(" + scaleNum + ")";

        const existingTransform = earth_orbits_container.style.transform;
        if (existingTransform && existingTransform.includes('scale(')) {
          const updatedTransform = existingTransform.replace(/scale\([^)]*\)\s*/g, '');
          earth_orbits_container.style.transform = updatedTransform + ' ' + scale;
      }
    }
  }
}

function removeLine() {
  setActiveId('');
  setHoveringId('');
}


 window.addEventListener('resize', handleResize);

useEffect(() => {
  adjustElementScale(document.documentElement.clientWidth);
}
, []);

 
 useEffect(() => {
    if (flyToId) {
      const element = document.getElementById(flyToId + '_sat_' + currentStaticImg);
      element?.classList.remove('static_satellite_closeup');
      // Re-add the class with a slight delay to restart the animation
      setTimeout(() => {
        element?.classList.add('static_satellite_closeup');
      }, 1);
    }
  }, [currentStaticImg, flyToId]); 

  const handleflyTransitionEnd = () => {
    const element = document.getElementById('earth_orbits_container');
    if (element) {
      if(element.classList.contains('earth_fly_out')) { 
        //this is handling the fly out
        element.classList.remove('earth_fly_out');
      } else {
        //this is handling the fly in
        setflyTransitionEnded(true);
      }
    }

  };

  const handleSetStaticImg = (imgId : string) => {
    setCurrentStaticImg(imgId);
  };

  const handleReturntoMain = () => {
    setActiveId('');
    setCurrentStaticImg('');
    setHoveringId('');
    setflyToId('');
    setflyTransitionEnded(false);
    adjustElementScale(document.documentElement.clientWidth);
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
        <div id="earth_orbits_container" className={'earth_orbits_container'} onTransitionEnd={handleflyTransitionEnd} >

          {!activeId && <Player src={orbitsMoving} className="player" autoplay />}

          {<img src={earth} className="earth" alt="earth" />}

          {/* May need something different here.  Could have a different active and hovering tab */}
          {hoveringId && <SingleOrbitImage id={hoveringId} imageDesc='_label' />}

          {hoveringId && hoveringId != "gto" &&<SingleOrbitAnimation id={hoveringId} player={Player} desc="_orbit_moving" />}

          {activeId && <SingleOrbitImage id={activeId} imageDesc='_fill' />}

          {activeId && orbitIds.filter(id => id !== activeId).map((id) => {
            return <SingleOrbitImage id={id} imageDesc='_dotted' />
          }
          )}
        </div>

      {flyToId && flyTransitionEnded && <img src={orbitBackground} id="orbit_background" className="orbit_background" alt="orbit_background" />}
      {flyToId && flyTransitionEnded && <OrbitCloseupText id={flyToId} setStaticImg={handleSetStaticImg} currentStaticImg={currentStaticImg} unsetFlyTo={handleReturntoMain}/>}
      {!currentStaticImg && flyTransitionEnded && <SingleOrbitAnimation id={flyToId} player={Player} desc="_orbit_details" />}
    
      {currentStaticImg && <TestStaticImgCloseup id={flyToId} imageNum={currentStaticImg}/>}

    </div>
  );
};

export default App;