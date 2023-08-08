import useImage from "../hooks/useImage";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ShowIf } from "./ShowIf";

const StaticImgCloseup: React.FC = () => {
  const flyToId = useSelector((state: RootState) => state.app.flyToId);
  const currentStaticImg = useSelector(
    (state: RootState) => state.app.currentStaticImg
  );

  const imageName = flyToId + "_sat_" + currentStaticImg;
  const { image, loading } = useImage(imageName);

  return (
    <ShowIf value={!loading}>
      <div className="static_satellite_image_container">
        <img
          src={image}
          id={imageName}
          alt={imageName}
          className="static_satellite_closeup"
        />
      </div>
    </ShowIf>
  );
};

export default StaticImgCloseup;
