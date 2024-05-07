import { useEffect, useRef, useState } from "react";
import { Dimensions, View, useColorScheme } from "react-native";
import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";
import Environment from "../../state/environment/Environment";
import StateManager from "../../state/publishers/StateManager";
import { ActiveSection } from "../../state/publishers/types/ActiveSection";
import VStack from "../containers/VStack";
import Education from "../custom/Education";
import Experience from "../custom/Experience";
import Header from "../custom/Header";
import Skills from "../custom/Skills";
import Splash from "../custom/Splash";
import { NavProp } from "../navigation/NavProp";
import ResDimensions from "../styling/ResDimensions";
import { ColorScheme } from "../../state/types/ColorScheme";
import "./mainscreen.css";

interface Props {
    navigation?: NavProp;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
    const [activeSection, setActiveSection] = useState(StateManager.activeSection.read());

    useEffect(() => {
        Dimensions.addEventListener("change", (newDimensions) => {
            if (Environment.instance.screenIsPortrait()) {
                navigateToSection();
            }
        });

        const unsubscribe = StateManager.activeSection.subscribe(() => {
            setActiveSection(StateManager.activeSection.read());
            if (Environment.instance.screenIsPortrait()) {
                navigateToSection();
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const navigateToSection = () => {
        let activeSection = StateManager.activeSection.read();
        switch (activeSection) {
            case ActiveSection.none:
                break;
            case ActiveSection.education:
                navigation?.navigate("Andre Pham | Education");
                break;
            case ActiveSection.experience:
                navigation?.navigate("Andre Pham | Experience");
                break;
            case ActiveSection.skills:
                navigation?.navigate("Andre Pham | Skills");
                break;
            default:
                throw new UnreachableCaseError(activeSection);
        }
    };

    useEffect(() => {
        if (!Environment.instance.screenIsPortrait()) {
            scrollIntoContent();
        }
    }, [activeSection]);

    // Disable automatic scrolling on page refresh
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    const renderPageContent = () => {
        switch (activeSection) {
            case ActiveSection.none:
                return <></>;
            case ActiveSection.experience:
                return <Experience />;
            case ActiveSection.skills:
                return <Skills />;
            case ActiveSection.education:
                return <Education style={{ paddingBottom: 450 }} />;
            default:
                throw new UnreachableCaseError(activeSection);
        }
    };

    const scrollRef = useRef<any>(null);
    const scrollIntoContent = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [refresh, setRefresh] = useState(false);
    StateManager.colorScheme.subscribe(() => {
        setRefresh(!refresh);
    });

    // React to the device changing its color scheme
    const colorScheme = useColorScheme();
    useEffect(() => {
        if (colorScheme == "light") {
            StateManager.colorScheme.publish(ColorScheme.light);
        } else {
            StateManager.colorScheme.publish(ColorScheme.dark);
        }
    }, [colorScheme]);

    return (
        <View style={{ padding: ResDimensions.screenPadding }}>
            <VStack spacing={ResDimensions.mainScreenSpacing} style={{ alignContent: "center" }}>
                <Header />

                <Splash />
            </VStack>

            {/* We don't want to see the edge of the view above, so position this a little lower */}
            <View ref={scrollRef} style={{ marginTop: 24, marginBottom: -24 }} />

            <VStack
                spacing={ResDimensions.pageContentSpacing}
                style={{
                    alignContent: "center",
                    paddingTop: activeSection == ActiveSection.none ? 0 : ResDimensions.mainScreenSpacing,
                    paddingBottom: activeSection == ActiveSection.none ? 200 : 0,
                }}
            >
                {renderPageContent()}
            </VStack>
        </View>
    );
};

export default MainScreen;
