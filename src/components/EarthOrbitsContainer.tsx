import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Player } from "@lottiefiles/react-lottie-player";
import earth from "../assets/earth.png";
import SingleOrbitImage from "./SingleOrbitImage";
import SingleOrbitAnimation from "./SingleOrbitAnimation";

const EarthOrbitsContainer: React.FC = () => {
  const orbitIds = ["leo", "meo", "heo", "gso", "geo", "gto"];
  const activeId = useSelector((state: RootState) => state.app.activeId);
  const hoveringId = useSelector((state: RootState) => state.app.hoveringId);

  const handleOrbitActivation = () => {
    const orbitElements: JSX.Element[] = [];

    //an orbit has been selected (active state)
    if (activeId) {
      if (activeId !== "gto") {
        //the selected orbit will have animation
        orbitElements.push(
          <SingleOrbitAnimation
            key={activeId + "_orbit_moving"}
            id={activeId}
            player={Player}
            desc="_orbit_moving"
            isSelectedOrbit={true}
          />
        );
      } else {
        //special case for GTO
        orbitElements.push(
          <SingleOrbitImage id={activeId} imageDesc="_solid_active" />
        );
      }

      //the selected orbit will have a label and blue fill
      orbitElements.push(
        <SingleOrbitImage
          key={activeId + "_label"}
          id={activeId}
          imageDesc="_label"
        />
      );
      orbitElements.push(
        <SingleOrbitImage
          key={activeId + "_fill"}
          id={activeId}
          imageDesc="_fill"
        />
      );

      //all orbits other than the one that is selected should be represented by dotted lines
      orbitIds
        .filter((id) => id !== activeId)
        .map((id) => {
          orbitElements.push(
            <SingleOrbitImage
              key={id + "_dotted"}
              id={id}
              imageDesc="_dotted"
            />
          );
        });

      //if there is an active tab AND a DIFFERENT tab is hovered
      if (hoveringId && hoveringId !== activeId) {
        orbitElements.push(
          <SingleOrbitImage
            key={hoveringId + "_solid"}
            id={hoveringId}
            imageDesc="_solid"
          />
        );
      }
    } else {
      if (hoveringId) {
        //place all orbit animations at a lighter opacity and not moving, unless it is the one that is hovered.  Note that this only occurs when no orbit is active/selected
        orbitIds.map((id) => {
          if (hoveringId !== "gto") {
            orbitElements.push(
              <SingleOrbitAnimation
                key={id + "_orbit_moving"}
                id={id}
                player={Player}
                desc="_orbit_moving"
                isSelectedOrbit={id === hoveringId}
              />
            );
          } else {
            return orbitElements.push(
              <SingleOrbitImage id={"gto"} imageDesc="_solid_lighter" />
            );
          }
        });
      } else {
        //no tab is hovered OR active/selected
        orbitIds.map((id) => {
          if (id !== "gto") {
            orbitElements.push(
              <SingleOrbitAnimation
                key={id + "_orbit_moving"}
                id={id}
                player={Player}
                desc="_orbit_moving"
                isSelectedOrbit={true}
              />
            );
          } else {
            orbitElements.push(
              <SingleOrbitImage id={"gto"} imageDesc="_solid_active" />
            );
          }
        });
      }
    }

    return (
      <div
        key="earth_orbits_container"
        id="earth_orbits_container"
        className="earth_orbits_container hard_scale_value"
        role="region"
        aria-label="earth orbits container"
      >
        <img src={earth} className="earth" alt="earth" />

        {orbitElements}
      </div>
    );
  };

  return handleOrbitActivation();
};

export default EarthOrbitsContainer;
