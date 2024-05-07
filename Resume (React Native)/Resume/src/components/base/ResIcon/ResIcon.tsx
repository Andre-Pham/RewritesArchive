import React from "react";
import { ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ResColor from "../../styling/color/ResColor";

interface Props {
    // Icon name (https://pictogrammers.com/library/mdi/)
    icon: string;
    // Icon fill color
    color: ResColor;
    // Icon size
    size: number;
    // Custom style
    style?: ViewStyle;
}

const ResIcon: React.FC<Props> = ({ icon, color, size, style }) => {
    return <Icon name={icon} size={size} color={color.getColor()} style={style} />;
};

export default ResIcon;
