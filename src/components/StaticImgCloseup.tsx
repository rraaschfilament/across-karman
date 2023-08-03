import useImage from '../hooks/useImage';
import React, { useEffect, useRef } from 'react';
import { ShowIf } from './ShowIf';
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";


const StaticImgCloseup: React.FC = () => {

    const flyToId = useSelector((state: RootState) => state.app.flyToId);
    const currentStaticImg = useSelector((state: RootState) => state.app.currentStaticImg);

    const imageName = flyToId + '_sat_' + currentStaticImg;
    const {image, loading} = useImage(imageName);
    // const imgRef = useRef<HTMLImageElement | null>(null);

    // useEffect(() => {
    //     console.log('currentStaticImg: ', currentStaticImg);
    //     if (imgRef.current) {
    //       imgRef.current.classList.remove('static_satellite_closeup');
    
    //       const timeout = setTimeout(() => {
    //         if (imgRef.current) {
    //           imgRef.current.classList.add('static_satellite_closeup');
    //         }
    //       }, 1);
    
    //       // Clear the timeout on component unmount
    //       return () => clearTimeout(timeout);
    //     }
    //   }, [currentStaticImg]);
    
    return (

            <div >
            <img src={image} id={imageName} alt={imageName} />
            </div>

    )
}

export default StaticImgCloseup