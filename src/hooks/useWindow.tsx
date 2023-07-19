// import { useEffect, useState } from "react";

const useWindow = (elementWidth: any) => {
    //const [{windowWidth},setWidthHeight] = useState({ windowWidth: window.innerWidth })
    //const [{newElementWidth},setnewElementWidth] = useState(elementWidth)

    console.log("initial window width, new document method: " + document.documentElement.clientWidth);


    // useEffect(() => {
    //   const fn = () => {
    //     if (window.innerWidth === 1920) {
    //         setnewElementWidth(elementWidth)
    //     }
    //     if (window.innerWidth !== windowWidth ) {
    //         //how many pixels did we lose?

    //         console.log("Window width (set state): " + windowWidth);
    //         console.log("Current window width: " + document.documentElement.clientWidth);

    //         const loss = windowWidth - document.documentElement.clientWidth;
    //         console.log("loss: " + loss);

    //         const newWidth = elementWidth - loss;
    //         //const newWidth = window.innerWidth - elementWidth;
    //         console.log("new width" + newWidth);

    //         //figure out which of these actually need to be set
    //         setWidthHeight({ windowWidth: window.innerWidth})
    //         setnewElementWidth(newWidth)

    //     } 
    //   }
    //   window.addEventListener('resize', fn)
    //   return () => window.removeEventListener('resize', fn)
    // }, []);

    if (document.documentElement.clientWidth !== 1920 ) {
        //how many pixels did we lose?

        console.log("Current window width: " + document.documentElement.clientWidth);

        const loss = 1920 - document.documentElement.clientWidth;
        console.log("loss: " + loss);

        const percentLoss = Math.round(loss / 19.2);
        console.log("percent loss: " + percentLoss);

        const elementPercentLoss = (elementWidth / 100) * percentLoss;
        console.log("element percent loss: " + elementPercentLoss);

        const newWidth = elementWidth - elementPercentLoss;
        //const newWidth = elementWidth - percentLoss;
        //const newWidth = elementWidth - (loss / 2);
        //const newWidth = (elementWidth / 100) * (100 - percentLoss);
        //const newWidth = (elementWidth * 0.1) / (0.1 * (1 - 35))

        console.log("useWindow returns: " + newWidth);
        return {  newWidth };
    } else {
        const newWidth = elementWidth;
        console.log("useWindow returns: " + newWidth);
        return {  newWidth };
    }

    }

export default useWindow;