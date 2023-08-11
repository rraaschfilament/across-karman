import React, { useEffect, useState } from "react";
import { Tooltip as Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
interface RiskIconsProps {
  id: string;
}

interface OrbitRiskIcons {
  [key: string]: string[];
}

const RiskIcons: React.FC<RiskIconsProps> = ({ id }) => {
  const orbitRiskIcons: OrbitRiskIcons = {
    leo: [
      "cyber",
      "electronic",
      "physical_kinetic",
      "physical_non_kinetic",
      "space_debris",
      "crowding_collision",
    ],
    meo: [
      "cyber",
      "electronic",
      "physical_kinetic",
      "physical_non_kinetic",
      "space_debris",
    ],
    heo: ["cyber", "electronic", "physical_kinetic", "physical_non_kinetic"],
    gso: ["cyber", "electronic", "physical_kinetic", "physical_non_kinetic"],
    geo: ["cyber", "electronic", "physical_kinetic", "physical_non_kinetic"],
    gto: ["space_debris"],
  };

  const imageDescs = orbitRiskIcons[id] || [];
  const [images, setImages] = useState<string[]>([]);

  const dict: any = {
    cyber: "Cyber",
    electronic: "Electronic",
    physical_kinetic: "Physical (Kinetic)",
    physical_non_kinetic: "Physical (Non-Kinetic)",
    space_debris: "Space Debris",
    crowding_collision: "Crowding/Collison",
  };

  const formatTooltipContent = (text: string | undefined) => {
    if (text === undefined) {
      return "";
    }

    return dict[text];
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls: string[] = [];

      for (const imageDesc of imageDescs) {
        const imagePath = await import(`../assets/${imageDesc}.webp`);
        imageUrls.push(imagePath.default);
      }

      setImages(imageUrls);
    };

    fetchImages();
  }, [id, imageDescs]);

  const renderedImages = images.map((image, index) => (
    <a
      key={imageDescs[index] + "_risk_icon_link"}
      data-tooltip-id={imageDescs[index]}
      data-tooltip-content={formatTooltipContent(imageDescs[index])}
    >
      <img
        key={imageDescs[index] + "_risk_icon"}
        src={image}
        className={"risk_icon"}
        alt={imageDescs[index] + "_risk_icon"}
      />
      <Tooltip key={imageDescs[index] + "_risk_icon_tooltip"} id={imageDescs[index]} />
    </a>
  ));

  return <div key="risk_icon_container" className="risk_icon_container">{renderedImages}</div>;
};

export default RiskIcons;
