import React, { useEffect, useState } from "react";
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
      <img
        key={`${id}-${index}`}
        src={image}
        className={'risk_icon'}
      />
    ));
  
    return <div>{renderedImages}</div>;
  };

export default RiskIcons