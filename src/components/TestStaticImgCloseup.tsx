import useImage from '../hooks/useImage';
import React from 'react';

interface TestStaticImgCloseupProps {
    id: string;
    imageNum: string;
}

const TestStaticImgCloseup: React.FC<TestStaticImgCloseupProps> = ({id, imageNum}) => {
    const [satelliteNumber, setSatelliteNumber] = React.useState(Number);
    const imageName = id + '_sat_' + imageNum;
    const {image} = useImage(imageName);

    if(imageNum !== satelliteNumber.toString()){
        setSatelliteNumber(parseInt(imageNum));
    }
    
    return (
        <div>
            <img src={image} id={imageName} alt={imageName}/>
        </div>
    )
}

export default TestStaticImgCloseup