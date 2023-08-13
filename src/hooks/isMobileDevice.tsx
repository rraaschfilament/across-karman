import React from "react";

export default function useIsMobileDevice() {
  const [screenWidth, setscreenWidth] = React.useState<number>(
    window.innerWidth
  );
  React.useEffect(() => {
    const updateDimension = () => {
      setscreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateDimension);
  }, [screenWidth]);
  return screenWidth <= 1132;
}
