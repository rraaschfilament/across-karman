import React, { useRef } from 'react';
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
