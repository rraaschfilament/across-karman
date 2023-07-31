import useLottie from "../hooks/useLottie";

interface SingleOrbitAnimationProps {
    id: string;
    player: React.ElementType;
    desc: string;
    shouldPlay?: boolean;
}

const SingleOrbitImage: React.FC<SingleOrbitAnimationProps> = ({id, player, desc, shouldPlay}) => {
    const {animation} = useLottie(id + desc)
    const Player = player

    return (
            <Player src={animation} className={id + desc} autoplay={shouldPlay} loop style={{opacity: shouldPlay ? 1 : 0.25}}/>
    )
}

export default SingleOrbitImage;
