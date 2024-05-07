import React from "react";
import { View, ViewStyle } from "react-native";
import VStack from "../../containers/VStack";
import ResTypography from "../../styling/ResTypography";
import ResColor from "../../styling/color/ResColor";
import ResIconButton from "../ResIconButton/ResIconButton";
import ResText from "../ResText/ResText";

interface Props {
    color: ResColor;
    icon?: string; // https://pictogrammers.com/library/mdi/
    iconColor?: ResColor;
    fileName?: string;
    label: string;
    size: number;
    style?: ViewStyle;
    onPress: () => void;
}

const ResIconButtonLabelled: React.FC<Props> = ({
    color,
    icon = undefined,
    iconColor = undefined,
    fileName = undefined,
    label,
    size,
    style,
    onPress,
}) => {
    return (
        <VStack
            spacing={5}
            style={{
                alignItems: "center",
                alignSelf: "flex-start",
                // Adjsuts frame to match label (positioned aboslute)
                // Tested - it does scale (both the padding and the absolute positioning)
                paddingBottom: 16,
                ...style,
            }}
        >
            <ResIconButton
                icon={icon}
                iconColor={iconColor}
                fileName={fileName}
                color={color}
                size={size}
                onPress={onPress}
            />

            <View style={{ position: "absolute", top: size + 4, flex: 1 }}>
                <ResText typography={ResTypography.subscriptLabel} style={{ alignSelf: "center", textAlign: "center" }}>
                    {label}
                </ResText>
            </View>
        </VStack>
    );
};

export default ResIconButtonLabelled;
