import useLottie from '../hooks/useLottie';


interface SingleOrbitAnimationDetailsProps {
    id: string;
    player: React.ElementType;
    desc: string;
}
const SingleOrbitAnimationDetails: React.FC<SingleOrbitAnimationDetailsProps> = ({id, player, desc}) => {
    const {animation} = useLottie(id + desc)
    const Player = player

    return (
            <Player src={animation} className={id + desc} autoplay loop />
    );
}

export default SingleOrbitAnimationDetails