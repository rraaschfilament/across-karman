
import popupText from '../text/OrbitPopups.json';

interface PopUpTextProps {
    id: string;
    setFly: (id: string) => void;
}

interface PopUpTextContent {
    [id: string]: string;
}

const PopUpText: React.FC<PopUpTextProps> = ({id, setFly}) => {
    const headerText = (popupText as PopUpTextContent)[id + "_header"];
    const bodyDistanceText = (popupText as PopUpTextContent)[id + "_body_distance"];
    const bodyAboutText = (popupText as PopUpTextContent)[id + "_body_about"];
    const buttonText = (popupText as PopUpTextContent)[id + "_button"];

    const flyToOrbit = () => {
        setFly(id);
    
        const elementName = 'earth_orbits_container';
        const element = document.getElementById(elementName);
    
        if (element) {
          element.style.transform = 'scale(13)';
          element.style.transition = 'transform 1s ease';
          element.style.transformOrigin = '50% 16%';
          element.style.overflow = 'hidden';
        }
    
        setTimeout(() => {
          if(element){
            element.style.animation = 'fade-out 2s ease forwards';
        }
        }, 1);
    
      }

    return (
        <div className='orbit_title_popup'>

      <div className="orbit_title_info_header">{headerText}</div>
      <div className="orbit_title_info_body"><strong>Distance: </strong>{bodyDistanceText}<br/><strong>About: </strong>{bodyAboutText}<br/><strong>Risks: </strong></div>
      {id !== "gto" && <button id={id} className='orbit_popup_button' onClick={flyToOrbit}>{buttonText}</button>}
      </div>
    )
}

export default PopUpText

