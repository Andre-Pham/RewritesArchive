import React from "react";
import { ViewStyle } from "react-native";
import { ExperiencePeriods } from "../../data/experience/ExperiencePeriods";
import VStack from "../containers/VStack";
import ResDimensions from "../styling/ResDimensions";
import ExperienceSection from "./ExperienceSection";

interface Props {
    style?: ViewStyle;
}

const Experience: React.FC<Props> = ({ style }) => {
    return (
        <VStack spacing={ResDimensions.pageContentSpacing} style={{ ...style }}>
            {ExperiencePeriods().map((period) => (
                <ExperienceSection period={period} key={period.label} />
            ))}
        </VStack>
    );
};

export default Experience;
