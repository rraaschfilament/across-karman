import React, {useState} from 'react';
import orbitCloseupText from '../text/OrbitCloseups.json';
import orbitSatellites from '../text/OrbitSatellites.json';
import SingleOrbitImage from '../components/SingleOrbitImage';

interface OrbitCloseupTextProps {
    id: string;
    setStaticImg: (id: string) => void;
    currentStaticImg: string;
    unsetFlyTo: () => void;
}

interface OrbitCloseupTextContent {
    [key: string]: string;
}

interface OrbitCloseupImgContent {
    [orbit: string]: {
        [id: string]: {
            name: string;
            description: string;
            purpose: string;
        }
    }
}

const OrbitCloseupText: React.FC<OrbitCloseupTextProps> = ({id, setStaticImg, currentStaticImg, unsetFlyTo}) => {
        const headerIndex = id + "_header";
        const subHeaderIndex = id + "_subheader";
        const bodyIndex = id + "_body";
    
        const headerText = (orbitCloseupText as OrbitCloseupTextContent)[headerIndex];
        const subHeaderText = currentStaticImg ? (orbitSatellites as unknown as OrbitCloseupImgContent)[id]?.[currentStaticImg]?.["name"] : (orbitCloseupText as OrbitCloseupTextContent)[subHeaderIndex];
        const bodyText = currentStaticImg ? (orbitSatellites as unknown as OrbitCloseupImgContent)[id]?.[currentStaticImg]?.["description"] : (orbitCloseupText as OrbitCloseupTextContent)[bodyIndex];


    const showNext = () => {
        console.log('show next');

        if (!currentStaticImg){
            setStaticImg('1');
        } else {
            const number = parseInt(currentStaticImg) + 1;
            const validSatelliteIndex = (orbitSatellites as unknown as OrbitCloseupImgContent)[id]?.[number.toString()];

            if (validSatelliteIndex){

                const elementName = id + "_sat_" + validSatelliteIndex;
                const element = document.getElementById(elementName);
            
                if (element) {
                    element.style.animation = 'fly-in-right 1s ease forwards';
                }

                setStaticImg(number.toString());
            } else {
                console.log('no more satellites');
                setStaticImg('');
            }
        }

    }

    const showPrevious = () => {
        console.log('show previous');

        if (!currentStaticImg){
            setStaticImg('1');
        } else {
            const number = parseInt(currentStaticImg) - 1;

            const validSatelliteIndex = (orbitSatellites as unknown as OrbitCloseupImgContent)[id][number.toString()];
            if (validSatelliteIndex){

                setStaticImg(number.toString());
            } else {
                console.log('no more satellites');
                setStaticImg('');
            }
        }
    }


    const backtoMain = () => {
        unsetFlyTo();
        const elementName = 'earth_orbits_container';
        const element = document.getElementById(elementName);
    
        if (element) {
          element.style.transform = 'scale(1)';
          element.style.transition = 'transform 2s ease';
          element.style.transformOrigin = '50% 16%';
          element.style.overflow = 'hidden';
        }

        setTimeout(() => {
            if(element){
              element.style.animation = 'fade-in 2s ease forwards';
          }
          }, 1);
    }


    return (
        <div className="orbit_closeup_text">
            <div className="orbit_closeup_header">{headerText}</div>
            <div className="orbit_closeup_subheader">{subHeaderText}</div>
            <div className="orbit_closeup_body">{bodyText}</div>
            <div className="orbit_closeup_button_group">

            {parseInt(currentStaticImg) > 1 && <button id={id} className='orbit_closeup_button' onClick={showPrevious}>Previous</button>}
            {!currentStaticImg && <button id={id} className='orbit_closeup_button' onClick={backtoMain}>Orbits</button>}
            <br/>
            <button id={id} className='orbit_closeup_button' onClick={showNext}>Next</button>
            </div>
        </div>
    )
}

export default OrbitCloseupText

