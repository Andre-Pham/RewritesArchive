import React from "react";
import { ViewStyle } from "react-native";
import ResText from "../base/ResText/ResText";
import FlatContainer from "../containers/FlatContainer";
import VStack from "../containers/VStack";
import ResColors from "../styling/ResColors";
import ResDimensions from "../styling/ResDimensions";
import ResTypography from "../styling/ResTypography";

interface Props {
    title: string;
    children: any;
    style?: ViewStyle;
}

const BasicCard: React.FC<Props> = ({ title, children, style }) => {
    return (
        <FlatContainer color={ResColors.fillBackgroundLight} style={style}>
            <VStack spacing={ResDimensions.bodyParagraphSpacing}>
                <ResText typography={ResTypography.header}>{title}</ResText>

                {children}
            </VStack>
        </FlatContainer>
    );
};

export default BasicCard;
