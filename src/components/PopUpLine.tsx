import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";
import lineWidths from '../text/LineWidths.json';
interface PopUpLineProps {
    id: string;
}

interface LineWidths {
    [id: string]: number;
}

const PopUpLine: React.FC<PopUpLineProps> = ({ id }) => {

    const activeId = useSelector((state: RootState) => state.app.activeId);
    const classRef = useRef<HTMLSpanElement>(null);
    
    const orbitLineContainer = id + '_line_container';
    const orbitLine = id + '_line';

    const useWindow = (elementWidth: number) => {

        if (document.documentElement.clientWidth !== 1920 ) {
            //how many pixels did we lose?
            const loss = 1920 - document.documentElement.clientWidth;
    
            const percentLoss = Math.round(loss / 19.2);
    
            const elementPercentLoss = (elementWidth / 100) * percentLoss;
    
            const newWidth = elementWidth - elementPercentLoss;
    
            return {  newWidth };
        } else {
            const newWidth = elementWidth;
    
            return {  newWidth };
        }
    
        }

    const elementWidth = (lineWidths as LineWidths)[activeId];
     
    const returnedWidth = useWindow(elementWidth);

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
