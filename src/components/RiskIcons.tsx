import React, { useEffect, useState } from "react";
import { Tooltip as Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
interface RiskIconsProps {
    id: string;
}

interface OrbitRiskIcons{
    [key: string]: string[];
}

const RiskIcons: React.FC<RiskIconsProps> = ({id}) => {
    const orbitRiskIcons: OrbitRiskIcons = {
        leo: ["cyber", "electronic", "physical_kinetic", "physical_non-kinetic", "space_debris", "crowding_collision"],
        meo: ["cyber", "electronic", "physical_kinetic", "physical_non-kinetic", "space_debris"],
        heo: ["cyber", "electronic", "physical_kinetic", "physical_non-kinetic"],
        gso: ["cyber", "electronic", "physical_kinetic", "physical_non-kinetic"],
        geo: ["cyber", "electronic", "physical_kinetic", "physical_non-kinetic"],
        gto: ["space_debris"]
    }


    const imageDescs = orbitRiskIcons[id] || [];
    const [images, setImages] = useState<string[]>([]);

    const formatTooltipContent = (text: string): string => {
      if(text === undefined){
        return "";
      }
      return text
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
  
    useEffect(() => {
      const fetchImages = async () => {
        const imageUrls: string[] = [];
  
        for (const imageDesc of imageDescs) {
          const imagePath = await import(`../assets/${imageDesc}.png`);
          imageUrls.push(imagePath.default);
        }
  
        setImages(imageUrls);
      };
  
      fetchImages();
    }, [id, imageDescs]);
  
    const renderedImages = images.map((image, index) => (

        <a key={imageDescs[index]} data-tooltip-id={imageDescs[index]} data-tooltip-content={formatTooltipContent(imageDescs[index])}>
        < img src={image} className={"risk_icon"} />
        <Tooltip id={imageDescs[index]} />
</a>
    ));
  
    return <div className="risk_icon_container">{renderedImages}</div>;
  };

export default RiskIcons