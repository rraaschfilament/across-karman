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
        <div>
            <Player src={animation} className={id + desc} autoplay/>
        </div>
    )
}

export default SingleOrbitImage