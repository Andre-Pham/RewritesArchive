import React from "react";
import { Linking, Text, TextStyle } from "react-native";
import { ResFontFamily } from "../../styling/typography/ResFontFamily";
import { ResFontWeight } from "../../styling/typography/ResFontWeight";
import ResTypographyConfig from "../../styling/typography/ResTypographyConfig";

interface Props {
    // Text or other components to be embedded
    children: any;
    // The URL to open
    url: string;
    // Typography applied
    typography: ResTypographyConfig;
    // If the component should expand to take up available horizontal space
    wide?: boolean;
    // If the frame should exactly match the text
    verticalWrap?: boolean;
    // Custom styling
    style?: TextStyle;
}

const ResHyperlink: React.FC<Props> = ({ children, url, typography, verticalWrap = false, wide = true, style }) => {
    let linkTypography = typography.withWeight(ResFontWeight.bold).withUnderline(true);

    const handlePress = React.useCallback(() => {
        Linking.openURL(url);
    }, [url]);

    // For some reason the poppins font is slightly offset
    // This is a workaround
    let lineHeightMultiplier = linkTypography.fontFamily == ResFontFamily.poppins ? 1.15 : 1.0;
    return (
        <Text
            style={[
                wide ? { width: "100%" } : { alignSelf: "center" },
                linkTypography.getStylesheet(),
                verticalWrap
                    ? {
                          lineHeight: linkTypography.size * lineHeightMultiplier,
                      }
                    : null,
                style,
            ]}
            onPress={handlePress}
        >
            {children}
        </Text>
    );
};

export default ResHyperlink;
