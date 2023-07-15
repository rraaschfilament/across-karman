import React, { useState, useEffect, useRef } from 'react';
interface PopUpLineProps {
    id: string;
    activeId: string;
}

const PopUpLine: React.FC<PopUpLineProps> = ({ id, activeId }) => {
   // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [adjustedWidth, setAdjustedWidth] = useState(0);
    // const [isReady, setIsReady] = useState(false);
    const classRef = useRef<HTMLSpanElement>(null);
    //let adjustedWidth = null;
    
    const orbitLineContainer = id + '_line_container';
    const orbitLine = id + '_line';

    // useLayoutEffect(() => {
    //     const checkElementReady = () => {
    //         const element = classRef.current;
    //         if (!element || !element.offsetWidth) {
    //           requestAnimationFrame(checkElementReady);
    //         } else {
    //           setIsReady(true);
    //         }
    //       };
    //     requestAnimationFrame(checkElementReady);
    //     const updateWidthInitial = () => {
    //         const element = classRef.current;
    //         if (!element) return;

    //         const defaultWidth = element?.offsetWidth;
    //         console.log("Initial method: " + id + defaultWidth);
    //         setAdjustedWidth(defaultWidth ? defaultWidth : 0);
    //     }
    //     window.requestAnimationFrame(updateWidthInitial);
    // }, []);

    useEffect(() => {
        const updateWidth = () => {
            const element = classRef.current;
            const elementWidth = element?.getAttributeNames();
            console.log(elementWidth);
            const defaultWidth =  648;

            console.log("Default width: " + defaultWidth);
            const subtractWidth = 1920 - document.body.clientWidth;
            console.log(document.body.clientWidth)
            console.log("Subtract width: " + subtractWidth);
            const newWidth = defaultWidth ? defaultWidth - subtractWidth : 0;
            console.log("Resize method: " +id + newWidth);
            //adjustedWidth = newWidth;

            setAdjustedWidth(newWidth ? newWidth : 0);
        }

        const handleResize = () => {
            //setWindowWidth(window.innerWidth);
            updateWidth();
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const componentStyle = adjustedWidth ? { width: `${adjustedWidth}px` }: {};
    // console.log(id);
    // console.log(componentStyle);

    return (
          <span ref={classRef} className={`${orbitLineContainer} ${id === activeId ? 'drawing' : ''}`} style={componentStyle}>

            <div id={orbitLine} className="line"></div>

            {id === activeId && <div className="connecting_line"></div>}
            {id === activeId && <div className="connecting_line_dot"></div>}

        </span>
    );
};

export default PopUpLine