import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../app/store";
import { setActiveId, setHoveringId } from '../features/appSlice';
import useImage from '../hooks/useImage';
import useIsMobileDevice from "../hooks/isMobileDevice";
import { ShowIf } from "./ShowIf";

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

  const imageName =
    id === activeId || id === hoverId
      ? id + "_nav_button_active"
      : id + "_nav_button";
    
  const isMobileDevice = useIsMobileDevice();
    
  const { image, loading } = useImage(
    isMobileDevice ? imageName + "_mobile" : imageName
  ); //ES Lint was complaining about calling useImage conditionally, so I made the imageName the part that is conditional

  const orbitNameImage = useImage(id + "_nav_button_title").image;

  const btnId = id + "_nav_button";

  return (
    <ShowIf value={!loading}>
      <div className={`${id}_group orbit_nav_button_group`}>
        <div
          id={btnId}
          className="orbit_nav_button"
          onClick={handleClick}
          tabIndex={tabIndex}
        >
          <img
            src={image}
            className="orbit_nav_button_image"
            alt={imageName}
            onMouseEnter={handleHover}
            onMouseLeave={handleUnHover}
          />
        </div>

        {isMobileDevice && (
          <div className={`orbit_name ${id} ${isMobileDevice ? "" : "hidden"}`}>
            <img
              className={`${id} ${activeId === id ? "visible" : "invisible"}`}
              src={orbitNameImage}
              alt={imageName}
            />
          </div>
        )}
      </div>
    </ShowIf>
  );
};

export default OrbitTitleGroup;
