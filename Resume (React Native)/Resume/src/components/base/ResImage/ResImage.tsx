import React, { useEffect, useState } from "react";
import { Image, ImageResizeMode, ImageStyle } from "react-native";
import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { ResImageScale } from "./ResImageScale";

interface Props {
    fileName: string;
    width?: number | string;
    height?: number | string;
    scale?: ResImageScale;
    style?: ImageStyle;
}

const ResImage: React.FC<Props> = ({ fileName, width = 0, height = 0, scale = ResImageScale.none, style }) => {
    const [size, setSize] = useState<{ width?: number | string; height?: number | string }>({
        width: width,
        height: height,
    });
    const [resizeMode, setResizeMode] = useState<ImageResizeMode | undefined>(undefined);
    const [imageSize, setImageSize] = useState({
        // Don't set these to 0, causes NaN issues
        width: 1,
        height: 1,
    });

    useEffect(() => {
        const imagePath = require("/assets/images/" + fileName);
        Image.getSize(
            imagePath,
            (width, height) => {
                setImageSize({ width: width, height: height });
            },
            (error) => {
                console.log("Error getting image dimensions:", error);
            },
        );

        if (scale == ResImageScale.scaleToFill && typeof width == "number" && typeof height == "number") {
            if (width > height) {
                setSize({ width: width, height: undefined });
            } else {
                setSize({ width: (imageSize.width * height) / imageSize.height, height: undefined });
            }
        }
    }, []);

    useEffect(() => {
        switch (scale) {
            case ResImageScale.none:
                setResizeMode("stretch");
                break;
            case ResImageScale.scaleToFit:
                setResizeMode("contain");
                break;
            case ResImageScale.scaleToFill:
                setResizeMode("cover");
                break;
            case ResImageScale.scaleToFillCrop:
                setResizeMode("cover");
                break;
            default:
                throw new UnreachableCaseError(scale);
        }
    }, []);

    return (
        <Image
            source={require("/assets/images/" + fileName)}
            resizeMode={resizeMode}
            style={{
                width: size.width,
                height: size.height,
                aspectRatio: scale == ResImageScale.none ? undefined : 1,
                ...style,
            }}
        />
    );
};

export default ResImage;
