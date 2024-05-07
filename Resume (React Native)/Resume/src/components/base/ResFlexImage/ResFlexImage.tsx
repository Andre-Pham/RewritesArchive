import React from "react";
import { Image, ImageStyle } from "react-native";

interface Props {
    fileName: string;
    flexVertical: boolean;
    style?: ImageStyle;
}

const ResFlexImage: React.FC<Props> = ({ fileName, flexVertical, style }) => {
    return (
        <Image
            source={require("/assets/images/" + fileName)}
            resizeMode="contain"
            style={{
                height: flexVertical ? "100%" : undefined,
                width: flexVertical ? undefined : "100%",
                aspectRatio: 1,
                ...style,
            }}
        />
    );
};

export default ResFlexImage;
