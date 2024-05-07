import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import ResColor from "../../styling/color/ResColor";
import ResIcon from "../ResIcon/ResIcon";
import ResImage from "../ResImage/ResImage";
import { ResImageScale } from "../ResImage/ResImageScale";

interface Props {
    color: ResColor;
    icon?: string; // https://pictogrammers.com/library/mdi/
    iconColor?: ResColor;
    fileName?: string;
    size: number;
    onlyIcon?: boolean;
    style?: ViewStyle;
    onPress?: () => void;
}

const ResIconButton: React.FC<Props> = ({
    color,
    icon = undefined,
    iconColor = undefined,
    fileName = undefined,
    size,
    onlyIcon = false,
    style,
    onPress,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={onPress == undefined}
            style={{
                backgroundColor: color.getColor(),
                borderRadius: 50,
                width: onlyIcon ? 0 : size,
                height: onlyIcon ? 0 : size,
                justifyContent: "center",
                ...style,
            }}
        >
            {fileName != undefined ? (
                <ResImage
                    fileName={fileName}
                    width={(size * 1.8) / 3.0}
                    height={(size * 1.8) / 3.0}
                    scale={ResImageScale.scaleToFit}
                    style={{
                        alignSelf: "center",
                        tintColor: iconColor?.getColor(),
                    }}
                />
            ) : undefined}

            {icon != undefined ? (
                <ResIcon
                    icon={icon}
                    size={(size * 2.2) / 3.0}
                    color={iconColor ?? new ResColor("#ffffff")}
                    style={{
                        alignSelf: "center",
                    }}
                />
            ) : undefined}
        </TouchableOpacity>
    );
};

export default ResIconButton;
