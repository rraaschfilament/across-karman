import useLottie from '../hooks/useLottie';
import { Player } from "@lottiefiles/react-lottie-player";


interface SingleOrbitAnimationDetailsProps {
    id: string;
    desc: string;
}
const SingleOrbitAnimationDetails: React.FC<SingleOrbitAnimationDetailsProps> = ({id, desc}) => {
    const {animation} = useLottie(id + desc)

    return (
            <Player key={id + desc} src={animation} className={id + desc} autoplay loop />
    );
}

export default SingleOrbitAnimationDetails