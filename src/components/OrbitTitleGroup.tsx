import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../app/store";
import { setActiveId, setHoveringId } from '../features/appSlice';
import useImage from '../hooks/useImage'

interface OrbitTitleGroupProps {
  id: string;
  tabIndex?: number;
}

const OrbitTitleGroup: React.FC<OrbitTitleGroupProps> = ({ id, tabIndex }) => {
  const dispatch = useDispatch();
  const activeId = useSelector((state: RootState) => state.app.activeId);
  const hoverId = useSelector((state: RootState) => state.app.hoveringId);

  const handleClick = () => {
    dispatch(setActiveId(id));

  };

  const handleHover = () => {
    dispatch(setHoveringId(id));
  };

  const handleUnHover = () => {
    dispatch(setHoveringId(''));
  };

  const imageName = id === activeId || id === hoverId ? id + '_nav_button_active' : id + '_nav_button';

  const { image } = document.documentElement.clientWidth <= 500 ? useImage(imageName + '_mobile') : useImage(imageName);
  const btnId = id + '_nav_button'

  return (
    <div id={btnId} className='orbit_nav_button' onClick={handleClick} tabIndex={tabIndex}>
      <img src={image} className='orbit_nav_button_image' alt={imageName} onMouseEnter={handleHover} onMouseLeave={handleUnHover} />

    </div>

  );
};

export default OrbitTitleGroup;
