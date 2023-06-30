import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import './App.css';
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

      <div id="earth_orbits_container" className="earth_orbits_container">

        {!activeId && <Player src={orbitsMoving} className="player" autoplay />}
        {<img src={earth} className="earth" alt="earth" />}

        {/* May need something different here.  Could have a different active and hovering tab */}
        {hoveringId && <SingleOrbitImage id={hoveringId} imageDesc='_label' />}

        {hoveringId && <SingleOrbitAnimation id={hoveringId} player={Player} />}

        {activeId && <SingleOrbitImage id={activeId} imageDesc='_fill'/>}

        {activeId && orbitIds.filter(id => id !== activeId).map((id) => {
          return <SingleOrbitImage id={id} imageDesc='_dotted' />
        }
        )}
      </div>
      {flyToId && activeId && <img src={orbitBackground} id="orbit_background" className="orbit_background" alt="orbit_background"/>}
      {flyToId && <div className="orbit_closeup_container"><OrbitCloseupText id={flyToId}/></div>} 

    </div>
  );
};

export default App;