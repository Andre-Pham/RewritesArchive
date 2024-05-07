import React from "react";
import { Text, TextStyle } from "react-native";
import { ResFontFamily } from "../../styling/typography/ResFontFamily";
import ResTypographyConfig from "../../styling/typography/ResTypographyConfig";

interface Props {
    // Text or other components to be embedded
    children: any;
    // Typography applied
    typography: ResTypographyConfig;
    // If the component should expand to take up available horizontal space
    wide?: boolean | null;
    // If the frame should exactly match the text
    verticalWrap?: boolean;
    // Number of lines (predefined)
    numberOfLines?: number;
    // Custom styling
    style?: TextStyle;
}

const ResText: React.FC<Props> = ({
    children,
    typography,
    verticalWrap = false,
    wide = true,
    numberOfLines,
    style,
}) => {
    // For some reason the poppins font is slightly offset
    // This is a workaround
    let lineHeightMultiplier = typography.fontFamily == ResFontFamily.poppins ? 1.15 : 1.0;
    return (
        <Text
            numberOfLines={numberOfLines}
            style={[
                wide ? { width: "100%" } : { alignSelf: wide == undefined || wide == null ? undefined : "center" },
                typography.getStylesheet(),
                verticalWrap
                    ? {
                          lineHeight: typography.size * lineHeightMultiplier,
                      }
                    : null,
                style,
            ]}
        >
            {children}
        </Text>
    );
};

export default ResText;
