import React from "react";
import { View } from "react-native";
import ResText from "../base/ResText/ResText";
import HStack from "../containers/HStack";
import ResTypography from "../styling/ResTypography";

interface Props {
    children: any;
}

const YearHeader: React.FC<Props> = ({ children }) => {
    let typography = ResTypography.sectionTitle;
    return (
        <HStack spacing={16} style={{ alignItems: "baseline" }}>
            <ResText typography={typography} wide={null}>
                {children}
            </ResText>

            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                    height: 2,
                    backgroundColor: typography.color,
                }}
            />
        </HStack>
    );
};

export default YearHeader;
