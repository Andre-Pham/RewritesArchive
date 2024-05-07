import React from "react";
import { ViewStyle } from "react-native";
import Environment from "../../state/environment/Environment";
import StateManager from "../../state/publishers/StateManager";
import VStack from "../containers/VStack";
import ResDimensions from "../styling/ResDimensions";

interface Props {
    children: any;
    style?: ViewStyle;
}

const ContentContainer: React.FC<Props> = ({ children, style }) => {
    const onLayout = (event: any) => {
        const layout = event.nativeEvent.layout;
        if (layout.width > 0) {
            // Only if this component is visible
            StateManager.contentWidth.publish(Environment.instance.getScreenWidth() - ResDimensions.screenPadding * 2);
        }
    };

    return (
        <VStack
            style={{
                padding: ResDimensions.screenPadding,
                ...style,
            }}
            onLayout={onLayout}
        >
            {children}
        </VStack>
    );
};

export default ContentContainer;
