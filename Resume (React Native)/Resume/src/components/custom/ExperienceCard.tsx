import React from "react";
import { ViewStyle } from "react-native";
import Experience from "../../data/experience/Experience";
import ResSmallButton from "../base/ResButton/ResSmallButton";
import ResChip from "../base/ResChip/ResChip";
import ResHyperlink from "../base/ResHyperlink/ResHyperlink";
import ResText from "../base/ResText/ResText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import ResColors from "../styling/ResColors";
import ResDimensions from "../styling/ResDimensions";
import ResTypography from "../styling/ResTypography";
import ResImage from "../base/ResImage/ResImage";
import { ResImageScale } from "../base/ResImage/ResImageScale";

interface Props {
    experience: Experience;
    style?: ViewStyle;
}

const ExperienceCard: React.FC<Props> = ({ experience, style }) => {
    const renderLinks = () => {
        return experience.links.map((link) => (
            <ResText typography={ResTypography.body} key={link.url}>
                {link.label + ": "}

                <ResHyperlink url={link.url} typography={ResTypography.body}>
                    {link.shownURL}
                </ResHyperlink>
            </ResText>
        ));
    };

    const renderDownloads = () => {
        return experience.files.map((file) => (
            <ResSmallButton
                key={file.fileName}
                label={file.label}
                typography={ResTypography.buttonSmall.withColor(ResColors.textLightPersistent)}
                color={ResColors.accent}
                wide={false}
                onPress={() => {
                    const fileUrl = require("/assets/files/" + file.fileName);
                    try {
                        // Assume we're on web
                        const link = document.createElement("a");
                        link.href = fileUrl;
                        link.download = file.fileName;
                        link.click();
                    } catch (error) {
                        console.error("File download failed:", error);
                    }
                }}
                style={{ alignSelf: "flex-start" }}
            />
        ));
    };

    const renderTags = () => {
        return experience.tags.map((tag) => (
            <ResChip color={ResColors.chipBackground} key={tag}>
                <ResText typography={ResTypography.chip}>{tag}</ResText>
            </ResChip>
        ));
    };

    return (
        <FlatContainer color={ResColors.fillBackgroundLight} style={{ flex: 1, ...style }}>
            <HStack spacing={12} style={{ paddingBottom: 4 }}>
                {experience.image != null ? (
                    <ResImage
                        height={38}
                        width={38}
                        fileName={experience.image}
                        scale={ResImageScale.none}
                        style={{
                            borderRadius: 8,
                            alignSelf: "center",
                            borderWidth: 2,
                            borderColor: ResColors.textSemiDark.getColor(),
                        }}
                    />
                ) : undefined}

                <ResText typography={ResTypography.header} wide={false} numberOfLines={3}>
                    {experience.name}
                </ResText>
            </HStack>

            <VStack spacing={ResDimensions.bodyParagraphSpacing} style={{ paddingTop: 4 }}>
                <ResText typography={ResTypography.subscript}>{experience.subscriptText}</ResText>

                <ResText typography={ResTypography.body}>{experience.description}</ResText>

                {renderLinks()}

                {experience.files.length == 0 ? (
                    <></>
                ) : (
                    <VStack spacing={ResDimensions.tagSpacing} style={{ paddingTop: 6 }}>
                        {renderDownloads()}
                    </VStack>
                )}

                <HStack spacing={ResDimensions.tagSpacing} style={{ paddingTop: 6 }}>
                    {renderTags()}
                </HStack>
            </VStack>
        </FlatContainer>
    );
};

export default ExperienceCard;
