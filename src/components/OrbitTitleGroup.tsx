
interface OrbitTitleGroupProps {
  text: string;
}

const OrbitTitleGroup: React.FC<OrbitTitleGroupProps> = ({text}) => {
  return (
    <g className='orbit_title_group' >
    <text className='orbit_title_text'><tspan x="0" y="0">{text}</tspan></text>
  </g>
  );
};

export default OrbitTitleGroup;
