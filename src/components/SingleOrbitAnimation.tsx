import useLottie from '../hooks/useLottie';


interface SingleOrbitAnimationProps {
    id: string;
    player: React.ElementType;
}

const SingleOrbitImage: React.FC<SingleOrbitAnimationProps> = ({id, player}) => {
    const {animation} = useLottie(id + "_orbit_moving")
    const Player = player

    return (
        <div>
            <Player src={animation} className={id + "_player"} autoplay />
        </div>
    )
}

export default SingleOrbitImage