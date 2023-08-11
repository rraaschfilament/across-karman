import useLottie from "../hooks/useLottie";
import { Player } from "@lottiefiles/react-lottie-player";

interface SingleOrbitAnimationProps {
    id: string;
    desc: string;
    isSelectedOrbit: boolean;
}

const SingleOrbitAnimation: React.FC<SingleOrbitAnimationProps> = ({ id, desc, isSelectedOrbit }) => {
    const { animation } = useLottie(id + desc)

    return (
        <Player key={id + "_lottie"} id={id + "_lottie"} src={animation} className={id + desc} autoplay={isSelectedOrbit} loop style={{ opacity: isSelectedOrbit ? 1 : 0.25 }} />
    )
}

export default SingleOrbitAnimation;
