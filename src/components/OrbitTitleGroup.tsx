import React, { useState } from 'react';
import useImage from '../hooks/useImage'

interface OrbitTitleGroupProps {
  id: string;
  setActive: (id: string) => void;
  activeId: string;
  setHover: (id: string) => void;
  // setFly: (id: string) => void;
}

// interface PopupTextContent {
//   [key: string]: string;
// }

const OrbitTitleGroup: React.FC<OrbitTitleGroupProps> = ({id, setActive, activeId, setHover}) => {

  // const headerText = (PopupText as PopupTextContent)[id + "_header"];
  // const bodyDistanceText = (PopupText as PopupTextContent)[id + "_body_distance"];
  // const bodyAboutText = (PopupText as PopupTextContent)[id + "_body_about"];
  // const buttonText = (PopupText as PopupTextContent)[id + "_button"];


  const handleClick = () => {
    setActive(id);

  };

  const handleHover = () => {
    setHover(id);
  };

  const handleUnHover = () => {
    setHover('');
  };

  // const flyToOrbit = () => {
  //   setFly(id);

  //   const elementName = 'earth_orbits_container';
  //   const element = document.getElementById(elementName);

  //   if (element) {
  //     element.style.transform = 'scale(13)';
  //     element.style.transition = 'transform 1s ease';
  //     element.style.transformOrigin = '50% 16%';
  //     element.style.overflow = 'hidden';
  //   }

  //   setTimeout(() => {
  //     if(element){
  //       element.style.animation = 'fade-out 2s ease forwards';
  //   }
  //   }, 1);

  // }

  const imageName = id === activeId ? id + '_nav_button_active' : id + '_nav_button';
  const {image} = useImage(imageName);

  
  return (
    <div id={id} className='orbit_nav_button' onClick={handleClick}>
      <img src={image} className='orbit_nav_button' alt={imageName} onMouseEnter={handleHover} onMouseLeave={handleUnHover}/>

    {/* {id === activeId && <div className='orbit_title_popup'>


      <text className="orbit_title_info_header">{headerText}</text>
      <text className="orbit_title_info_body"><b>Distance: </b>{bodyDistanceText}<br/><b>About: </b>{bodyAboutText}<br/><b>Risks: </b></text>
      <button id={id} className='orbit_popup_button' onClick={flyToOrbit}>{buttonText}</button>
      </div>
      
      }  */}

  </div>

  );
};

export default OrbitTitleGroup;
