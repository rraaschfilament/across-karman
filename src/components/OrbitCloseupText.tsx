import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import close from "../assets/close.png";
import close_mobile from "../assets/close_mobile.png";
import selectedSat from "../assets/closeup_satellite_selected.png";
import unselectedSat from "../assets/closeup_satellite_unselected.png";
import orbitCloseupText from "../text/OrbitCloseups.json";
import orbitSatellites from "../text/OrbitSatellites.json";
import {
  setActiveId,
  setCurrentStaticImg,
  setFlyToId,
  setFlyTransitionComplete,
  setHoveringId,
} from "../features/appSlice";

interface OrbitCloseupTextContent {
  [id: string]: string;
}

interface OrbitCloseupImgContent {
  [orbit: string]: {
    [id: string]: {
      name: string;
      description: string;
      purpose: string;
      why: string;
    };
  };
}

interface DynamicHTMLRendererProps {
  htmlContent: string | TrustedHTML;
}

const DynamicHTMLRenderer: React.FC<DynamicHTMLRendererProps> = ({
  htmlContent,
}) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

const OrbitCloseupText: React.FC = () => {
  const dispatch = useDispatch();
  const flyToId = useSelector((state: RootState) => state.app.flyToId);
  const currentStaticImg = useSelector(
    (state: RootState) => state.app.currentStaticImg
  );
  const earthOrbitsScale = useSelector(
    (state: RootState) => state.app.earthOrbitsScale
  );

  const [numSatellites, setnumSatellites] = React.useState(Array);

  const previousBtnText = "< PREVIOUS";
  const previousBtnId = flyToId + "_previous_button";
  const nextBtnId = flyToId + "_next_button";
  const orbitBtnId = flyToId + "_orbit_button";
  const headerIndex = flyToId + "_header";
  const subHeaderIndex = flyToId + "_subheader";
  const bodyIndex = flyToId + "_body";

  const headerText = (orbitCloseupText as OrbitCloseupTextContent)[headerIndex];
  const subHeaderText = currentStaticImg
    ? (orbitSatellites as unknown as OrbitCloseupImgContent)[flyToId]?.[
        currentStaticImg
      ]?.["name"]
    : (orbitCloseupText as OrbitCloseupTextContent)[subHeaderIndex];

  const satelliteDes: React.ReactNode = (
    orbitSatellites as unknown as OrbitCloseupImgContent
  )[flyToId]?.[currentStaticImg]?.["description"];
  const satellitePurp: React.ReactNode = (
    orbitSatellites as unknown as OrbitCloseupImgContent
  )[flyToId]?.[currentStaticImg]?.["purpose"];
  const satelliteWhy: React.ReactNode = (
    orbitSatellites as unknown as OrbitCloseupImgContent
  )[flyToId]?.[currentStaticImg]?.["why"];

  const bodyText: React.ReactNode = (
    orbitCloseupText as OrbitCloseupTextContent
  )[bodyIndex];

  useEffect(() => {
    if (flyToId) {
      const numSatellites = Array.from(
        {
          length: Object.keys(
            (orbitSatellites as unknown as OrbitCloseupImgContent)[flyToId]
          ).length,
        },
        (_, index) => index + 1
      );
      setnumSatellites(numSatellites);
    }
  }, [flyToId]);

  const showNext = () => {
    if (!currentStaticImg) {
      dispatch(setCurrentStaticImg("1"));
    } else {
      const number = parseInt(currentStaticImg) + 1;

      const validSatelliteIndex = (
        orbitSatellites as unknown as OrbitCloseupImgContent
      )[flyToId]?.[number.toString()];

      if (validSatelliteIndex) {
        dispatch(setCurrentStaticImg(number.toString()));
      } else {
        dispatch(setCurrentStaticImg(""));
      }
    }
  };

  const showPrevious = () => {
    if (!currentStaticImg) {
      dispatch(setCurrentStaticImg("1"));
    } else {
      const number = parseInt(currentStaticImg) - 1;

      const validSatelliteIndex = (
        orbitSatellites as unknown as OrbitCloseupImgContent
      )[flyToId][number.toString()];

      if (validSatelliteIndex) {
        dispatch(setCurrentStaticImg(number.toString()));
      } else {
        dispatch(setCurrentStaticImg(""));
      }
    }
  };

  const backtoMain = () => {
    dispatch(setFlyToId(""));
    dispatch(setActiveId(""));
    dispatch(setHoveringId(""));
    dispatch(setCurrentStaticImg(""));
    dispatch(setFlyTransitionComplete(false));

    //I'd like to be doing this on the EarthOrbitsContainer component, but waiting for a state change to trigger it is too slow
    const element = document.getElementById("earth_orbits_container");

    if (element) {
      element.style.transform = "scale(" + earthOrbitsScale + ")";
      element.style.transition = "transform 2s ease";
      element.style.transformOrigin = "50% 16%";
      element.style.overflow = "hidden";
      element.style.animation = "fade-in 3s ease forwards";
      element.classList.add("hard_scale_value");
    }

    setTimeout(() => {
      if (element) {
        element.style.transformOrigin = "center center";
      }
    }, 3000);
  };

  return (
    <div className="orbit_closeup_container">
      <div className="orbit_closeup_satellite_icons">
        {numSatellites.map((_satellite: any, index: number) => (
          <img
            key={index + 1}
            id={(index + 1).toString()}
            className={`${
              (index + 1).toString() == currentStaticImg
                ? "selectedSat"
                : "unselectedSat"
            }`}
            src={
              (index + 1).toString() == currentStaticImg
                ? selectedSat
                : unselectedSat
            }
            alt="satellite icon"
          />
        ))}
      </div>
      <img
        className="orbit_closeup_back_button"
        src={close}
        onClick={backtoMain}
        alt="close button"
        tabIndex={0}
        onKeyDown={(e) => {
          e.key === "Enter" && backtoMain();
        }}
      />

      <img
        className="orbit_closeup_back_button_mobile"
        src={close_mobile}
        onClick={backtoMain}
        alt="close button"
        tabIndex={0}
        onKeyDown={(e) => {
          e.key === "Enter" && backtoMain();
        }}
      />
      <div className="orbit_closeup_text" tabIndex={0}>
        <div className="orbit_closeup_header">{headerText}</div>
        <div className="orbit_closeup_subheader">{subHeaderText}</div>
        {!currentStaticImg && (
          <div className="orbit_closeup_body">
            <DynamicHTMLRenderer htmlContent={bodyText} />
          </div>
        )}
        {currentStaticImg && (
          <div className="orbit_closeup_section_headings">DESCRIPTION</div>
        )}
        {currentStaticImg && (
          <div className="orbit_closeup_body">
            <DynamicHTMLRenderer htmlContent={satelliteDes} />
          </div>
        )}
        {currentStaticImg && (
          <div className="orbit_closeup_section_headings">PURPOSE</div>
        )}
        {currentStaticImg && (
          <div className="orbit_closeup_body">
            <DynamicHTMLRenderer htmlContent={satellitePurp} />
          </div>
        )}
        {currentStaticImg && (
          <div className="orbit_closeup_section_headings">WHY THIS ORBIT?</div>
        )}
        {currentStaticImg && (
          <div className="orbit_closeup_body">
            <DynamicHTMLRenderer htmlContent={satelliteWhy} />
          </div>
        )}
      </div>
      <div className="orbit_closeup_button_group">
        {currentStaticImg && (
          <button
            id={previousBtnId}
            className="orbit_closeup_button_plain"
            onClick={showPrevious}
          >
            {previousBtnText}
          </button>
        )}
        <br />
        {parseInt(currentStaticImg) === numSatellites.length ? (
          <button
            id={nextBtnId}
            className="orbit_closeup_button_outlined"
            onClick={backtoMain}
          >
            ORBITS
          </button>
        ) : (
          <button
            id={orbitBtnId}
            className="orbit_closeup_button_outlined"
            onClick={showNext}
          >
            NEXT
          </button>
        )}
      </div>
    </div>
  );
};

export default OrbitCloseupText;
