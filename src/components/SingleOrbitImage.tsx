import useIsMobileDevice from "../hooks/isMobileDevice";
import useImage from "../hooks/useImage";
import { ShowIf } from "./ShowIf";

interface SingleOrbitImageProps {
  id: string;
  imageDesc: string;
}

const SingleOrbitImage: React.FC<SingleOrbitImageProps> = ({
  id,
  imageDesc,
}) => {
  const imageName = id + imageDesc;

  const isMobileDevice = useIsMobileDevice();
  const needsMobileAsset = imageDesc === "_fill" || imageDesc === "_dotted";

  //ES Lint was complaining about calling useImage conditionally, so I made the imageName the part that is conditional
  const { image, loading } = useImage(
    isMobileDevice && needsMobileAsset ? imageName + "_mobile" : imageName
  )

  return (
    <ShowIf value={!loading}>
      <div className={`${id} ${imageDesc}`}>
        <img src={image} id={imageName} className={imageName} alt={imageName} />
      </div>
    </ShowIf>
  );
};

export default SingleOrbitImage;
