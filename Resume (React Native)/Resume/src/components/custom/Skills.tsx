import { useEffect, useState } from "react";
import { Dimensions, ViewStyle } from "react-native";
import Environment from "../../state/environment/Environment";
import StateManager from "../../state/publishers/StateManager";
import ResText from "../base/ResText/ResText";
import HStack from "../containers/HStack";
import ResDimensions from "../styling/ResDimensions";
import ResTypography from "../styling/ResTypography";
import BasicCard from "./BasicCard";

interface Props {
    style?: ViewStyle;
}

const Skills: React.FC<Props> = ({ style }) => {
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

    let columnCount = screenIsPortrait ? 1 : 1;
    let gap = (columnCount - 1) * ResDimensions.cardColumnSpacing;

    return (
        <HStack
            spacing={ResDimensions.cardColumnSpacing}
            style={{
                width: componentWidth,
                alignItems: "flex-start",
                ...style,
            }}
        >
            <BasicCard title="Being a Developer" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResText typography={ResTypography.body}>
                    {
                        "I know all the basic skills you would expect a developer to have such as git and source control, IDE tools, development practices, etc. I'm experienced in many different areas of development including UI, 3D computer graphics, 2D computer graphics, thread management, interacting with web services, applied mathematics, data persistence, databases, package management, localisation, and more."
                    }
                </ResText>
            </BasicCard>

            <BasicCard title="Native iOS" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResText typography={ResTypography.body}>
                    {
                        "My primary area of expertise is native iOS development, having worked on an extensive number of both individual and team-based projects. Using Swift, I've built apps and packages using all kinds of frameworks including SwiftUI, UIKit, Core Graphics, SceneKit, Vision, AVFoundation, Speech, Core Video, Core Data, Combine, and more. I'm well versed in package management using Swift Packages and Cocoa Pods, developing unit tests, localisation, and working with the rest of the iOS ecosystem. I have extensive experience in common app architectures such as MVVM and MVC, as well as design patterns such as the delegate pattern, publisher subscriber pattern, dependency injection, and so on."
                    }
                </ResText>
            </BasicCard>

            <BasicCard title="React Native" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResText typography={ResTypography.body}>
                    {
                        "I have experience building React Native apps using expo (including this site!), having worked on both individual and team-based projects. Using TypeScript I've become familiar with the React Native ecosystem, having used redux architecture to develop multi-platform apps. Areas of experience include frontend development, interfacing with databases, localisation, and more."
                    }
                </ResText>
            </BasicCard>

            <BasicCard title="Native Android" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResText typography={ResTypography.body}>
                    {
                        "I have experience building native Android apps in Kotlin and Java using XML Layouts. I'm formally educated in Android development and have built two apps in team settings. I'm experienced in basic Android architecture, activity and fragment lifecycles, UI development, persisting data using Shared Preferences and Room, interacting with web services, and interfacing with accessibility services."
                    }
                </ResText>
            </BasicCard>

            <BasicCard title="Databases" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResText typography={ResTypography.body}>
                    {
                        "I have a range of experience working with various types of databases, including designing, querying, and integrating them into applications. Databases I have experience with include SQL (including SQLite and PostgreSQL), Firebase's Firestore, MongoDB, Realm, and Neo4j."
                    }
                </ResText>
            </BasicCard>

            <BasicCard title="Creative Applications" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResText typography={ResTypography.body}>
                    {
                        "I greatly enjoy the practice of art and design and pursue it in my own time. I have experience in applications such as Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, Audacity, Procreate (iPadOS graphics software), Figma, and more. Apart from considering design and usability in my applications, I also have a Behance portfolio linked above."
                    }
                </ResText>
            </BasicCard>

            <BasicCard title="Python" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResText typography={ResTypography.body}>
                    {
                        "Sort of an outlier, but oddly enough I have a lot of experience with Python. I've used it in my own personal projects, in university projects, and for building scripts for processing and manipulating data. I have experience with Pandas, NumPy, OpenCV, PIL, and a bunch more."
                    }
                </ResText>
            </BasicCard>
        </HStack>
    );
};

export default Skills;
