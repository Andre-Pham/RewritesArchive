import React from "react";
import { View } from "react-native";
import StateManager from "../../state/publishers/StateManager";
import { ColorScheme } from "../../state/types/ColorScheme";
import ResIconButton from "../base/ResIconButton/ResIconButton";
import ResImage from "../base/ResImage/ResImage";
import ResText from "../base/ResText/ResText";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import ResColors from "../styling/ResColors";
import ResDimensions from "../styling/ResDimensions";
import ResTypography from "../styling/ResTypography";

interface Props {
    // None
}

const Header: React.FC<Props> = (
    {
        // None
    },
) => {
    const inverseColorScheme = () => {
        let current = StateManager.colorScheme.read();
        if (current == ColorScheme.light) {
            StateManager.colorScheme.publish(ColorScheme.dark);
        } else {
            StateManager.colorScheme.publish(ColorScheme.light);
        }
    };

    return (
        <HStack spacing={16} style={{ alignItems: "center" }}>
            <ResImage
                height={64}
                width={64}
                fileName="profile_picture.png"
                style={{ borderRadius: 50, alignSelf: "center" }}
            />

            <VStack spacing={4} style={{ alignSelf: "center" }}>
                <ResText typography={ResTypography.pageTitle} verticalWrap={true}>
                    {"Andre Pham"}
                </ResText>

                <ResText typography={ResTypography.subscript} verticalWrap={true}>
                    {"andrekypham@gmail.com"}
                </ResText>
            </VStack>

            <HStack style={{ flex: 1 }}>
                <View style={{ flex: 1 }} />

                <ResIconButton
                    color={ResColors.background}
                    fileName={StateManager.colorScheme.read() == ColorScheme.dark ? "moon.png" : "sun.png"}
                    size={ResDimensions.iconButtonSize}
                    onPress={inverseColorScheme}
                    onlyIcon={true}
                />
            </HStack>
        </HStack>
    );
};

export default Header;
