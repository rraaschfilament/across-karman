import { Player } from '@lottiefiles/react-lottie-player';
import './App.css';
import orbitsMoving from './lotties/all_orbits_moving.json';
import earth from './assets/earth.png';
import leoTitle from './assets/leo_title.svg';
import meoTitle from './assets/meo_title.svg';
import heoTitle from './assets/heo_title.svg';
import gsoTitle from './assets/gso_title.svg';
import geoTitle from './assets/geo_title.svg';

export const App = () => {

  const handleClick = () => {
    console.log("placeholder");
  };

  return (
    <div className="container" >
      <img src={earth} className="earth" alt="earth" />
      <img src={leoTitle} className="leo_title" alt="leo_title" onClick={handleClick} />
      <img src={meoTitle} className="meo_title" alt="meo_title" onClick={handleClick} />
      <img src={heoTitle} className="heo_title" alt="heo_title" onClick={handleClick} />
      <img src={gsoTitle} className="gso_title" alt="gso_title" onClick={handleClick} />
      <img src={geoTitle} className="geo_title" alt="geo_title" onClick={handleClick} />

        <Player src={orbitsMoving} className="player" autoplay />

    </div>
  );
};

export default App;

