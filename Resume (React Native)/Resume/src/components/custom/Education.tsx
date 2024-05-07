import { useEffect, useState } from "react";
import { Dimensions, ViewStyle } from "react-native";
import Environment from "../../state/environment/Environment";
import StateManager from "../../state/publishers/StateManager";
import ResSmallButton from "../base/ResButton/ResSmallButton";
import ResHyperlink from "../base/ResHyperlink/ResHyperlink";
import ResText from "../base/ResText/ResText";
import HStack from "../containers/HStack";
import ResColors from "../styling/ResColors";
import ResDimensions from "../styling/ResDimensions";
import ResTypography from "../styling/ResTypography";
import BasicCard from "./BasicCard";
import VGap from "../containers/layout/VGap";
import VStack from "../containers/VStack";

interface Props {
    style?: ViewStyle;
}

const Education: React.FC<Props> = ({ style }) => {
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

    const downloadAcademicTranscript = async () => {
        const fileUrl = require("/assets/files/academic_transcript_official.pdf");
        try {
            // Assume we're on web
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = "academic_transcript_andrepham.pdf";
            link.click();
        } catch (error) {
            console.error("File download failed:", error);
        }
    };

    const downloadHonoursListInclusions = async () => {
        const fileUrl = require("/assets/files/honour_list_inclusions.zip");
        try {
            // Assume we're on web
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = "honour_list_inclusions_andrepham.zip";
            link.click();
        } catch (error) {
            console.error("File download failed:", error);
        }
    };

    const downloadLettersOfCommendation = async () => {
        const fileUrl = require("/assets/files/letters_of_commendation.zip");
        try {
            // Assume we're on web
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = "letters_of_commendation_andrepham.zip";
            link.click();
        } catch (error) {
            console.error("File download failed:", error);
        }
    };

    return (
        <HStack
            spacing={ResDimensions.cardColumnSpacing}
            style={{
                width: componentWidth,
                ...style,
            }}
        >
            <BasicCard
                title="Bachelor of Software Engineering (Honours)"
                style={{ width: (componentWidth - gap) / columnCount }}
            >
                <ResText typography={ResTypography.body}>{"Monash University, Mar 2020 - Nov 2023"}</ResText>
            </BasicCard>

            <BasicCard title="First Class Honours" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResText typography={ResTypography.body}>{"WAM: 88.255\nGPA: 3.938"}</ResText>

                <ResHyperlink
                    typography={ResTypography.body}
                    url="https://www.monash.edu/students/admin/assessments/results/wam"
                >
                    {"Reading WAM"}
                </ResHyperlink>

                <ResHyperlink
                    typography={ResTypography.body}
                    url="https://www.monash.edu/students/admin/assessments/results/gpa"
                >
                    {"Reading GPA"}
                </ResHyperlink>
            </BasicCard>

            <BasicCard title="Academic Transcript" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResHyperlink
                    typography={ResTypography.body}
                    url="https://www.myequals.net/sharelink/0780a40a-9e70-420d-a905-31117d1a9388/0d22dbc1-5b1b-4d2a-99d8-8fda0d5e1b03"
                >
                    {"Online academic transcript"}
                </ResHyperlink>

                <ResHyperlink
                    typography={ResTypography.body}
                    url="https://www.monash.edu/students/support/connect/official-documents/academic-transcripts"
                    style={{ paddingBottom: 6 }}
                >
                    {"What's an academic transcript?"}
                </ResHyperlink>

                <ResSmallButton
                    label="Download Transcript"
                    typography={ResTypography.buttonSmall.withColor(ResColors.textLightPersistent)}
                    color={ResColors.accent}
                    wide={false}
                    onPress={downloadAcademicTranscript}
                    style={{ alignSelf: "flex-start" }}
                />
            </BasicCard>

            <BasicCard title="High Achiever" style={{ width: (componentWidth - gap) / columnCount }}>
                <ResText typography={ResTypography.body} style={{ paddingBottom: 6 }}>
                    {
                        "I was included in the Faculty of Engineering Dean's Honour List every year of my degree, and have received multiple letters of commendation for my high academic performance."
                    }
                </ResText>

                <ResSmallButton
                    label="Honour List Inclusions"
                    typography={ResTypography.buttonSmall.withColor(ResColors.textLightPersistent)}
                    color={ResColors.accent}
                    wide={false}
                    onPress={downloadHonoursListInclusions}
                    style={{ alignSelf: "flex-start" }}
                />

                <ResSmallButton
                    label="Letters of Commendation"
                    typography={ResTypography.buttonSmall.withColor(ResColors.textLightPersistent)}
                    color={ResColors.accent}
                    wide={false}
                    onPress={downloadLettersOfCommendation}
                    style={{ alignSelf: "flex-start" }}
                />
            </BasicCard>
        </HStack>
    );
};

export default Education;
