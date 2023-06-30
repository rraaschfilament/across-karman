
import orbitCloseupText from '../text/OrbitCloseups.json'

interface OrbitCloseupTextProps {
    id: string;
}

interface OrbitCloseupTextContent {
    [key: string]: string;
}

const OrbitCloseupText: React.FC<OrbitCloseupTextProps> = ({id}) => {
    const headerIndex = id + "_header";
    const subHeaderIndex = id + "_subheader";
    const bodyIndex = id + "_body";

    const headerText = (orbitCloseupText as OrbitCloseupTextContent)[headerIndex];
    const subHeaderText = (orbitCloseupText as OrbitCloseupTextContent)[subHeaderIndex];
    const bodyText = (orbitCloseupText as OrbitCloseupTextContent)[bodyIndex];

    return (
        <div className="orbit_closeup_text">
            <div className="orbit_closeup_header">{headerText}</div>
            <div className="orbit_closeup_subheader">{subHeaderText}</div>
            <div className="orbit_closeup_body">{bodyText}</div>
        </div>
    )
}

export default OrbitCloseupText

