import useImage from '../hooks/useImage'

interface SingleOrbitImageProps {
    id: string;
    imageDesc: string;
}

const SingleOrbitImage: React.FC<SingleOrbitImageProps> = ({id, imageDesc}) => {
    const imageName = id + imageDesc
    const {image} = useImage(imageName)
    
    return (
        <div>
            <img src={image} id={imageName} className={imageName} alt={imageName}/>
        </div>
    )
}

export default SingleOrbitImage