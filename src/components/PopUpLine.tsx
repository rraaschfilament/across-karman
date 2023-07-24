import React, { useEffect, useRef } from 'react';
import useWindow from '../hooks/useWindow';
import lineWidths from '../text/LineWidths.json';
interface PopUpLineProps {
    id: string;
    activeId: string;
}

interface LineWidths {
    [id: string]: number;
}

const PopUpLine: React.FC<PopUpLineProps> = ({ id, activeId }) => {
    const classRef = useRef<HTMLSpanElement>(null);
    
    const orbitLineContainer = id + '_line_container';
    const orbitLine = id + '_line';

    // useEffect(() => {
    //     const updateWidth = () => {
    //         //I think this is wrong, not getting the correct element width
    //         const element = classRef.current;
    //         const elementWidth = element?.getAttribute('style');
    //         console.log("Element width: " +elementWidth);

    //     }

    //     const handleResize = () => {
    //         updateWidth();
    //     }

    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     }
    // }, []);

     let elementWidth = (lineWidths as LineWidths)[activeId];
     
    let returnedWidth = useWindow(elementWidth);

    const componentStyle = returnedWidth ? { width: `${returnedWidth.newWidth}px` }: {width: elementWidth};
    

    return (
          <span ref={classRef} className={`${orbitLineContainer} ${id === activeId ? 'drawing' : ''}`} style={componentStyle}>

            <div id={orbitLine} className="line"></div>

            {id === activeId && <div className="connecting_line"></div>}
            {id === activeId && <div className="connecting_line_dot"></div>}

        </span>
    );
};

export default PopUpLine
