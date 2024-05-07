import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Environment from "../../state/environment/Environment";
import StateManager from "../../state/publishers/StateManager";
import { ActiveSection } from "../../state/publishers/types/ActiveSection";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import ResDimensions from "../styling/ResDimensions";
import SplashButton from "./SplashButton";
import SplashButtonMobile from "./SplashButtonMobile";
import SplashIntro from "./SplashIntro";

interface Props {
    // No props
}

const Splash: React.FC<Props> = ({}) => {
    const [screenIsPortrait, setScreenIsPortrait] = useState(Environment.instance.screenIsPortrait());

    useEffect(() => {
        Dimensions.addEventListener("change", (newDimensions) => {
            setScreenIsPortrait(Environment.instance.screenIsPortrait());
        });
    }, []);

    const onLayout = (event: any) => {
        const layout = event.nativeEvent.layout;
        if (layout.width > 0) {
            // Only if this component is visible
            StateManager.contentWidth.publish(layout.width);
        }
    };

    if (screenIsPortrait) {
        return (
            <VStack spacing={ResDimensions.mainScreenSpacing} onLayout={onLayout}>
                <SplashIntro style={{ flex: 1 }} />

                <VStack spacing={12}>
                    <SplashButtonMobile label="experience" section={ActiveSection.experience} />

                    <SplashButtonMobile label="skills" section={ActiveSection.skills} />

                    <SplashButtonMobile label="education" section={ActiveSection.education} />
                </VStack>
            </VStack>
        );
    } else {
        let buttonRadius = 58;
        let verticalButtonSpacing = 32;
        let horizontalButtonSpacing =
            Math.cos(Math.PI / 3 / 2) * (buttonRadius * 2 + verticalButtonSpacing) - buttonRadius * 2;
        return (
            <HStack spacing={64} style={{ alignItems: "flex-start" }} onLayout={onLayout}>
                <SplashIntro />

                <HStack spacing={horizontalButtonSpacing} style={{ alignItems: "center" }}>
                    <VStack spacing={verticalButtonSpacing}>
                        <SplashButton label="experience" section={ActiveSection.experience} radius={buttonRadius} />

                        <SplashButton label="skills" section={ActiveSection.skills} radius={buttonRadius} />
                    </VStack>

                    <SplashButton label="education" section={ActiveSection.education} radius={buttonRadius} />
                </HStack>
            </HStack>
        );
    }
};

export default Splash;
