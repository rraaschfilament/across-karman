
interface PopUpLineProps {
    id: string;
    activeId: string;
}

const PopUpLine: React.FC<PopUpLineProps> = ({ id, activeId }) => {
    const orbitLineContainer = id + '_line_container';
    const orbitLine = id + '_line';

    return (
        <div className={`${orbitLineContainer} ${id === activeId ? 'drawing' : ''}`}>

            <div id={orbitLine} className="line"></div>

            {id === activeId && <div className="connecting_line"></div>}
            {id === activeId && <div className="connecting_line_dot"></div>}

        </div>
    )
}

export default PopUpLine