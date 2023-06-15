import { Player } from '@lottiefiles/react-lottie-player';
import './App.css';
import orbitsMoving from './lotties/all_orbits_moving.json';
import earth from './assets/earth.png';
import OrbitTitleGroup from './components/OrbitTitleGroup';


export const App = () => {

  const handleClick = () => {
    console.log("placeholder");
  };

  return (
    <div className="container" >
      <div className="orbit_title_container">
      <img src={earth} className="earth" alt="earth" onClick={handleClick}/>
      <OrbitTitleGroup text="LEO" />
      <OrbitTitleGroup text="MEO" />
      <OrbitTitleGroup text="HEO" />
      <OrbitTitleGroup text="GSO" />
      <OrbitTitleGroup text="GEO" />
      </div>


        <Player src={orbitsMoving} className="player" autoplay />

    </div>
  );
};

export default App;

