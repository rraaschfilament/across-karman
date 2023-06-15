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
      <div className="title_container">
      <img src={earth} className="earth" alt="earth" />
      <g className='title_group' data-name="leo_title_group">
        <text className='title_text'><tspan x="0" y="0">LEO</tspan></text>
      </g>
      <g className='title_group' data-name="leo_title_group">
        <text className='title_text'><tspan x="0" y="0">MEO</tspan></text>
      </g>
      <g className='title_group' data-name="leo_title_group">
        <text className='title_text'><tspan x="0" y="0">HEO</tspan></text>
      </g>
      <g className='title_group' data-name="leo_title_group">
        <text className='title_text'><tspan x="0" y="0">GSO</tspan></text>
      </g>
      <g className='title_group' data-name="leo_title_group">
        <text className='title_text'><tspan x="0" y="0">GEO</tspan></text>
      </g>
      </div>


        <Player src={orbitsMoving} className="player" autoplay />

    </div>
  );
};

export default App;

