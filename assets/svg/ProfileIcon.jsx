import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
const ProfileIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill={props.focused ? "#1ED860" : "#33363F"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
      stroke={props.focused ? "#1ED860" : "#33363F"}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle
      cx={12}
      cy={8}
      r={4}
      stroke={props.focused ? "#1ED860" : "#33363F"}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
export default ProfileIcon;
