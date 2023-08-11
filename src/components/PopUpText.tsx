import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import popupText from "../text/OrbitPopups.json";
import RiskIcons from "./RiskIcons";
import { setFlyToId, setFlyTransitionComplete } from "../features/appSlice";

interface PopUpTextContent {
  [id: string]: string;
}

const PopUpText: React.FC = () => {
  const dispatch = useDispatch();
  const activeId = useSelector((state: RootState) => state.app.activeId);

  const headerText = (popupText as PopUpTextContent)[activeId + "_header"];
  const bodyDistanceText = (popupText as PopUpTextContent)[
    activeId + "_body_distance"
  ];
  const bodyAboutText = (popupText as PopUpTextContent)[
    activeId + "_body_about"
  ];
  const buttonText = (popupText as PopUpTextContent)[activeId + "_button"];

  const flyToOrbit = () => {
    const element = document.getElementById("earth_orbits_container");

    if (element) {
      element.classList.remove("hard_scale_value");
      element.style.transform = "scale(13)";
      element.style.transition = "transform 1s ease-in forwards";
      element.style.transformOrigin = "50% 20%";
      element.style.overflow = "hidden";
      element.style.animation = "fade-out 1s ease-in forwards";
    }

    dispatch(setFlyToId(activeId));

    setTimeout(() => {
      if (element) {
        dispatch(setFlyTransitionComplete(true));
      }
    }, 800);
  };

  return (
    <div className="orbit_title_popup_container">
      <div className="orbit_title_popup">
        <div className="orbit_title_info_header">{headerText}</div>
        <div className="orbit_title_info_body" tabIndex={0}>
          <section className="title_info_section">
            Distance: <span>{bodyDistanceText}</span>
          </section>
          <section className="title_info_section">
            About: <span>{bodyAboutText}</span>
          </section>
          <section className="title_info_section">
            Risks
            <span>
              <RiskIcons
                key={activeId + "_risk_icon_component"}
                id={activeId}
              />
            </span>
          </section>
        </div>
        <div className="orbit_title_info_footer"></div>
      </div>
      {activeId !== "gto" && (
        <button
          key={activeId + "orbit_popup_button"}
          id={activeId}
          className="orbit_popup_button"
          onClick={flyToOrbit}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PopUpText;
