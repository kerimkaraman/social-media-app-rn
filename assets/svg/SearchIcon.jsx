import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SearchIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill={props.focused ? "#1ED860" : "none"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle
      cx={11}
      cy={11}
      r={6}
      stroke={props.focused ? "#1ED860" : "#222222"}
    />
    <Path
      d="M20 20L17 17"
      stroke={props.focused ? "#1ED860" : "#222222"}
      strokeLinecap="round"
    />
  </Svg>
);
export default SearchIcon;
