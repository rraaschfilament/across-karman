import React from "react";
import useImage from "../hooks/useImage";
import useIsMobileDevice from "../hooks/isMobileDevice";

interface OrbitTitleGroupProps {
  id: string;
  setActive: (id: string) => void;
  activeId: string;
  setHover: (id: string) => void;
  hoverId?: string;
  tabIndex?: number;
}

const OrbitTitleGroup: React.FC<OrbitTitleGroupProps> = ({
  id,
  setActive,
  activeId,
  setHover,
  hoverId,
  tabIndex,
}) => {
  const handleClick = () => {
    setActive(id);
  };

  const handleHover = () => {
    setHover(id);
  };

  const handleUnHover = () => {
    setHover("");
  };

  const imageName =
    id === activeId || id === hoverId
      ? id + "_nav_button_active"
      : id + "_nav_button";

  const isMobileDevice = useIsMobileDevice();

  const { image } = isMobileDevice
    ? useImage(imageName + "_mobile")
    : useImage(imageName);

  const orbitNameImage = useImage(id + "_nav_title_active_mobile").image;

  const btnId = id + "_nav_button";

  return (
    <div className="orbit_nav_button_group">
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
  );
};

export default OrbitTitleGroup;
