import useImage from "../hooks/useImage";

interface SingleOrbitImageProps {
  id: string;
  imageDesc: string;
}

const SingleOrbitImage: React.FC<SingleOrbitImageProps> = ({
  id,
  imageDesc
}) => {
  const imageName = id + imageDesc;

  const needsMobileAsset = imageDesc === "_fill" || imageDesc === "_dotted";

  const { image } =
    document.documentElement.clientWidth <= 500 && needsMobileAsset
      ? useImage(imageName + "_mobile")
      : useImage(imageName);

  return (
    <div className={`${id} ${imageDesc}`}>
      <img src={image} id={imageName} className={imageName} alt={imageName}/>
    </div>
  );
};

export default SingleOrbitImage;
