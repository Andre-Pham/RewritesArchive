import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import ExperiencePeriod from "../../data/experience/ExperiencePeriod";
import Environment from "../../state/environment/Environment";
import StateManager from "../../state/publishers/StateManager";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import ResDimensions from "../styling/ResDimensions";
import ExperienceCard from "./ExperienceCard";
import YearHeader from "./YearHeader";

interface Props {
    period: ExperiencePeriod;
}

const ExperienceSection: React.FC<Props> = ({ period }) => {
    const [screenIsPortrait, setScreenIsPortrait] = useState(Environment.instance.screenIsPortrait());
    const [componentWidth, setComponentWidth] = useState(StateManager.contentWidth.read());

    useEffect(() => {
        Dimensions.addEventListener("change", (newDimensions) => {
            setScreenIsPortrait(Environment.instance.screenIsPortrait());
        });

        const unsubscribe = StateManager.contentWidth.subscribe(() => {
            setComponentWidth(StateManager.contentWidth.read());
        });

        return () => {
            unsubscribe();
        };
    }, []);

    let columnCount = screenIsPortrait ? 1 : 2;
    let gap = (columnCount - 1) * ResDimensions.cardColumnSpacing;

    const renderExperienceCards = () => {
        return period.experiences.map((experience) => (
            <ExperienceCard
                key={experience.name}
                experience={experience}
                style={{ flex: undefined, width: (componentWidth - gap) / columnCount }}
            />
        ));
    };

    return (
        <VStack spacing={ResDimensions.pageContentSpacing} style={{ width: componentWidth }}>
            <YearHeader>{period.label}</YearHeader>

            <HStack spacing={ResDimensions.cardColumnSpacing}>{renderExperienceCards()}</HStack>
        </VStack>
    );
};

export default ExperienceSection;
