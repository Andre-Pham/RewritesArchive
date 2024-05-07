import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import Environment from "../../state/environment/Environment";
import StateManager from "../../state/publishers/StateManager";
import { ActiveSection } from "../../state/publishers/types/ActiveSection";
import ContentContainer from "../custom/ContentContainer";
import Skills from "../custom/Skills";
import { NavProp } from "../navigation/NavProp";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
    navigation?: NavProp;
}

const SkillsScreen: React.FC<Props> = ({ navigation }) => {
    let forceExit = false;

    useEffect(() => {
        const unsubscribe = navigation?.addListener("blur", () => {
            // When the screen is about to lose focus
            navigation = undefined;
            if (!forceExit) {
                StateManager.activeSection.publish(ActiveSection.none);
            }
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const onResize = (newDimensions: any) => {
            if (!Environment.instance.screenIsPortrait()) {
                forceExit = true;
                navigation?.goBack();
                navigation = undefined;
            }
        };

        const subscription = Dimensions.addEventListener("change", onResize);

        // When this component is hidden, don't listen for resizes anymore
        return () => {
            subscription.remove();
        };
    }, []);

    const scrollRef = useRef<any>(null);
    const scrollIntoContent = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            // Enter focus
            scrollIntoContent();
            return () => {
                // Exist focus
            };
        }, []),
    );

    const [refresh, setRefresh] = useState(false);
    StateManager.colorScheme.subscribe(() => {
        setRefresh(!refresh);
    });

    return (
        <View ref={scrollRef}>
            <ContentContainer>
                <Skills />
            </ContentContainer>
        </View>
    );
};

export default SkillsScreen;
