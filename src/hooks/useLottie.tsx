import { useEffect, useState } from "react";


const useLottie = (fileName: string) => {
    const [animation, setAnimation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const importAnimation = async () => {
            try {
                const { default: lottie } = await import(`../lotties/${fileName}.json`);
                setAnimation(lottie);
            }
            catch (err) {
                setError(err as string);
            }
            finally {
                setLoading(false);
            }
        };
        importAnimation();
    }, [fileName]);

    return { animation, error, loading };
};

export default useLottie;