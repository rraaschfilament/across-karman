import React, { useState } from 'react';
import './App.css';
import { Player } from '@lottiefiles/react-lottie-player';
import orbitsMoving from './lotties/all_orbits_moving.json';
import earth from './assets/earth.png';
import OrbitTitleGroup from './components/OrbitTitleGroup';
import SingleOrbitImage from './components/SingleOrbitImage';
import SingleOrbitAnimation from './components/SingleOrbitAnimation';
import PopUpLine from './components/PopUpLine';
import PopUpText from './components/PopUpText';
import OrbitCloseupText from './components/OrbitCloseupText';
import orbitBackground from './assets/orbit_background.png';

export const App: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('');
  const [hoveringId, setHoveringId] = useState<string>('');
  const [flyToId, setflyToId] = useState<string>('');

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

  return (

    <div className="background_container" >
      <div className="nav_container">
        {!flyToId && <div className="orbit_title_container">
          {orbitIds.map((id) => {
            return <OrbitTitleGroup id={id} setActive={handleSetActive} activeId={activeId} setHover={handleSetHover} />
          }
          )}

        </div>}


          {!flyToId && activeId && <PopUpText id={activeId} setFly={handleFly} />}

      </div>
      <div id="earth_orbits_container" className="earth_orbits_container">
<div className="line_to_orbit_container">
  
</div>
        {orbitIds.map((id) => {
          return <PopUpLine id={id} activeId={activeId} />
        }
        )
        }

        {!activeId && <Player src={orbitsMoving} className="player" autoplay />}
        {<img src={earth} className="earth" alt="earth" />}

        {/* May need something different here.  Could have a different active and hovering tab */}
        {hoveringId && <SingleOrbitImage id={hoveringId} imageDesc='_label' />}

        {hoveringId == "leo" && <SingleOrbitAnimation id={hoveringId} player={Player} desc="_orbit_moving" />}

        {activeId && <SingleOrbitImage id={activeId} imageDesc='_fill' />}

        {activeId && orbitIds.filter(id => id !== activeId).map((id) => {
          return <SingleOrbitImage id={id} imageDesc='_dotted' />
        }
        )}
      </div>
      {flyToId && activeId && <img src={orbitBackground} id="orbit_background" className="orbit_background" alt="orbit_background" />}
      {flyToId && <div className="orbit_closeup_container"><OrbitCloseupText id={flyToId} /></div>}
      {flyToId && <SingleOrbitAnimation id={hoveringId} player={Player} desc="_orbit_details" />}

    </div>
  );
};

export default App;