import useLottie from "../hooks/useLottie";

interface SingleOrbitAnimationProps {
    id: string;
    player: React.ElementType;
    desc: string;
    isSelectedOrbit: boolean;
}

const SingleOrbitAnimation: React.FC<SingleOrbitAnimationProps> = ({id, player, desc, isSelectedOrbit}) => {
    const {animation} = useLottie(id + desc)
    const Player = player

    return (
            <Player src={animation} className={id + desc} autoplay={isSelectedOrbit} loop style={{opacity: isSelectedOrbit ? 1 : 0.25}}/>
    )
}

export default SingleOrbitAnimation;
