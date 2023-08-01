import React, { useEffect } from "react";
import close from "../assets/close.png";
import close_mobile from "../assets/close_mobile.png";
import selectedSat from "../assets/closeup_satellite_selected.png";
import unselectedSat from "../assets/closeup_satellite_unselected.png";
import orbitCloseupText from "../text/OrbitCloseups.json";
import orbitSatellites from "../text/OrbitSatellites.json";

interface OrbitCloseupTextProps {
  id: string;
  setStaticImg: (id: string) => void;
  currentStaticImg: string;
  unsetFlyTo: () => void;
}

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

const OrbitCloseupText: React.FC<OrbitCloseupTextProps> = ({
  id,
  setStaticImg,
  currentStaticImg,
  unsetFlyTo,
}) => {
  const [numSatellites, setnumSatellites] = React.useState(Array);

  const previousBtnText = "< PREVIOUS";
  const previousBtnId = id + "_previous_button";
  const nextBtnId = id + "_next_button";
  const orbitBtnId = id + "_orbit_button";
  const headerIndex = id + "_header";
  const subHeaderIndex = id + "_subheader";
  const bodyIndex = id + "_body";
  const isMobileDevice = window.innerWidth <= 500;

  // Calculate which close button to use
  const closeButton = {
    className: isMobileDevice
      ? "orbit_closeup_back_button_mobile"
      : "orbit_closeup_back_button",
    src: isMobileDevice ? close_mobile : close,
  };


  const headerText = (orbitCloseupText as OrbitCloseupTextContent)[headerIndex];
  const subHeaderText = currentStaticImg
    ? (orbitSatellites as unknown as OrbitCloseupImgContent)[id]?.[
        currentStaticImg
      ]?.["name"]
    : (orbitCloseupText as OrbitCloseupTextContent)[subHeaderIndex];

  const satelliteDes: React.ReactNode = (
    orbitSatellites as unknown as OrbitCloseupImgContent
  )[id]?.[currentStaticImg]?.["description"];
  const satellitePurp: React.ReactNode = (
    orbitSatellites as unknown as OrbitCloseupImgContent
  )[id]?.[currentStaticImg]?.["purpose"];
  const satelliteWhy: React.ReactNode = (
    orbitSatellites as unknown as OrbitCloseupImgContent
  )[id]?.[currentStaticImg]?.["why"];

  const bodyText: React.ReactNode = (
    orbitCloseupText as OrbitCloseupTextContent
  )[bodyIndex];

  useEffect(() => {
    if (id) {
      const numSatellites = Array.from(
        {
          length: Object.keys(
            (orbitSatellites as unknown as OrbitCloseupImgContent)[id]
          ).length,
        },
        (_, index) => index + 1
      );
      setnumSatellites(numSatellites);
    }
  }, [id]);

  const showNext = () => {
    const btnelement = document.getElementById(nextBtnId);
    if (btnelement) {
      btnelement?.classList.add("clicked");
    }

    if (!currentStaticImg) {
      setStaticImg("1");
    } else {
      const number = parseInt(currentStaticImg) + 1;
      const validSatelliteIndex = (
        orbitSatellites as unknown as OrbitCloseupImgContent
      )[id]?.[number.toString()];

      if (validSatelliteIndex) {
        setStaticImg(number.toString());
      } else {
        setStaticImg("");
      }
    }
  };

  const showPrevious = () => {
    if (!currentStaticImg) {
      setStaticImg("1");
    } else {
      const number = parseInt(currentStaticImg) - 1;

      const validSatelliteIndex = (
        orbitSatellites as unknown as OrbitCloseupImgContent
      )[id][number.toString()];
      if (validSatelliteIndex) {
        setStaticImg(number.toString());
      } else {
        setStaticImg("");
      }
    }
  };

  const backtoMain = () => {
    const btnelement = document.getElementById(orbitBtnId);
    if (btnelement) {
      btnelement?.classList.add("clicked");
    }

    unsetFlyTo();
    const elementName = "earth_orbits_container";
    const element = document.getElementById(elementName);

    if (element) {
      element.classList.add("earth_fly_out");
      element.style.transform = "scale(1)";
      element.style.transition = "transform 2s ease";
      element.style.transformOrigin = "50% 16%";
      element.style.overflow = "hidden";
    }

    setTimeout(() => {
      if (element) {
        element.style.animation = "fade-in 2s ease forwards";
      }
    }, 1);
  };

  return (
    <div className="orbit_closeup_container">
      <div className="orbit_closeup_satellite_icons">
        {numSatellites.map((_satellite: any, index: any) => (
          <img
            id={index + 1}
            className={`${
              index + 1 == currentStaticImg ? "selectedSat" : "unselectedSat"
            }`}
            src={index + 1 == currentStaticImg ? selectedSat : unselectedSat}
          />
        ))}
      </div>

      <img
        className={closeButton.className}
        src={closeButton.src}
        onClick={backtoMain}
      />

      <div className="orbit_closeup_text">
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
          <div className="orbit_closeup_section_headings">WHY</div>
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
