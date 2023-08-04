import useImage from '../hooks/useImage';
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";


const StaticImgCloseup: React.FC = () => {

    const flyToId = useSelector((state: RootState) => state.app.flyToId);
    const currentStaticImg = useSelector((state: RootState) => state.app.currentStaticImg);

    const imageName = flyToId + '_sat_' + currentStaticImg;
    const {image} = useImage(imageName);

    
    return (

            <div >
            <img src={image} id={imageName} alt={imageName} />
            </div>

    )
}

export default StaticImgCloseup