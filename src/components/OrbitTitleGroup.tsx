import React from 'react';
import useImage from '../hooks/useImage'

interface OrbitTitleGroupProps {
  id: string;
  setActive: (id: string) => void;
  activeId: string;
  setHover: (id: string) => void;
  hoverId?: string;
  tabIndex?: number;
}

const OrbitTitleGroup: React.FC<OrbitTitleGroupProps> = ({id, setActive, activeId, setHover, hoverId, tabIndex}) => {

  const handleClick = () => {
    setActive(id);

  };

  const handleHover = () => {
    setHover(id);
  };

  const handleUnHover = () => {
    setHover('');
  };

  const imageName = id === activeId || id === hoverId ? id + '_nav_button_active' : id + '_nav_button';

  const {image} = document.documentElement.clientWidth <= 500 ? useImage(imageName + '_mobile') : useImage(imageName);
  const btnId = id+'_nav_button'
  
  return (
    <div id={btnId} className='orbit_nav_button' onClick={handleClick} tabIndex={tabIndex}>
      <img src={image} className='orbit_nav_button_image' alt={imageName} onMouseEnter={handleHover} onMouseLeave={handleUnHover}/>

  </div>

  );
};

export default OrbitTitleGroup;
