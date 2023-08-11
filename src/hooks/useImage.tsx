import { useEffect, useState } from "react";


const useImage = (fileName: string) => {
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const importImage = async () => {
            try {
                const { default: img } = await import(`../assets/${fileName}.webp`);
                if (!img) {
                    console.log(`Image ${fileName} not found`);
                } else {
                    setImage(img);
                }
            }
            catch (err) {
                setError(err as string);
            }
            finally {
                setLoading(false);
            }
        };
        importImage();
    }, [fileName]);

    return { image, error, loading };
};

export default useImage;