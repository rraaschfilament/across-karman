import React from 'react';
import useImage from '../hooks/useImage'

interface OrbitTitleGroupProps {
  id: string;
  setActive: (id: string) => void;
  activeId: string;
  setHover: (id: string) => void;
}

const OrbitTitleGroup: React.FC<OrbitTitleGroupProps> = ({id, setActive, activeId, setHover}) => {

  const handleClick = () => {
    setActive(id);

  };

  const handleHover = () => {
    setHover(id);
  };

  const handleUnHover = () => {
    setHover('');
  };

  const imageName = id === activeId ? id + '_nav_button_active' : id + '_nav_button';
  const {image} = useImage(imageName);
 const btnId = id+'_nav_button'
  
  return (
    <div id={btnId} className='orbit_nav_button' onClick={handleClick}>
      <img src={image} className='orbit_nav_button_image' alt={imageName} onMouseEnter={handleHover} onMouseLeave={handleUnHover}/>

  </div>

  );
};

export default OrbitTitleGroup;
