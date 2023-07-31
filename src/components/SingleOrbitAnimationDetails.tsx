import useLottie from '../hooks/useLottie';


interface SingleOrbitAnimationProps {
    id: string;
    player: React.ElementType;
    desc: string;
}
const SingleOrbitImage: React.FC<SingleOrbitAnimationProps> = ({id, player, desc}) => {
    const {animation} = useLottie(id + desc)
    const Player = player

    return (
            <Player src={animation} className={id + desc} autoplay/>
    );
}

export default SingleOrbitImage