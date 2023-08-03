import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../app/store";
import popupText from '../text/OrbitPopups.json';
import RiskIcons from './RiskIcons';
import { setFlyToId } from '../features/appSlice';

interface PopUpTextContent {
    [id: string]: string;
}

const PopUpText: React.FC = () => {
    const dispatch = useDispatch();
    const activeId = useSelector((state: RootState) => state.app.activeId);

    const headerText = (popupText as PopUpTextContent)[activeId + "_header"];
    const bodyDistanceText = (popupText as PopUpTextContent)[activeId + "_body_distance"];
    const bodyAboutText = (popupText as PopUpTextContent)[activeId + "_body_about"];
    const buttonText = (popupText as PopUpTextContent)[activeId + "_button"];

    const flyToOrbit = () => {
        dispatch(setFlyToId(activeId));

        //could pass a scale property here
    
        const element = document.getElementById('earth_orbits_container');
    
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

      <div className='orbit_title_popup_container'>
        <div className='orbit_title_popup'>

          <div className="orbit_title_info_header">{headerText}</div>
          <div className="orbit_title_info_body"><strong>Distance: </strong>{bodyDistanceText}<br/><strong>About: </strong>{bodyAboutText}<br/><strong>Risks</strong><RiskIcons id={activeId}/></div>
          <div className="orbit_title_info_footer"></div>
        </div>
      {activeId !== "gto" && <button id={activeId} className='orbit_popup_button' onClick={flyToOrbit}>{buttonText}</button>}
      </div>
    )
}

export default PopUpText

