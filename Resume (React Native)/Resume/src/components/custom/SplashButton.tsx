import React, { useEffect, useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import StateManager from "../../state/publishers/StateManager";
import { ActiveSection } from "../../state/publishers/types/ActiveSection";
import ResButton from "../base/ResButton/ResButton";
import ResColors from "../styling/ResColors";
import ResTypography from "../styling/ResTypography";

interface Props {
    label: string;
    section: ActiveSection;
    radius: number;
    style?: ViewStyle;
}

const SplashButton: React.FC<Props> = ({ label, section, radius, style }) => {
    const [activeSection, setActiveSection] = useState(StateManager.activeSection.read());

    useEffect(() => {
        const unsubscribe = StateManager.activeSection.subscribe(() => {
            setActiveSection(StateManager.activeSection.read());
        });

        return () => {
            unsubscribe();
        };
    }, []);

    let selectedTypography = ResTypography.button.withColor(ResColors.textLightPersistent);
    let unselectedTypography = ResTypography.button.withColor(ResColors.textDark);

    return (
        <ResButton
            label={label}
            typography={activeSection == section ? selectedTypography : unselectedTypography}
            color={activeSection == section ? ResColors.accent : ResColors.fillBackgroundLight}
            onPress={() => {
                let toPublish = activeSection == section ? ActiveSection.none : section;
                StateManager.activeSection.publish(toPublish);
            }}
            wide={false}
            style={[
                { width: radius * 2, height: radius * 2, borderRadius: 100 },
                activeSection == section ? styles.shadow : {},
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 11,
    },
});

export default SplashButton;
