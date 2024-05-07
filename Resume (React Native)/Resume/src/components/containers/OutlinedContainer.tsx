import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import ResDimensions from "../styling/ResDimensions";
import ResColor from "../styling/color/ResColor";

interface Props {
    color: ResColor;
    children: any; // No type - can be any component
    style?: ViewStyle;
}

const OutlinedContainer: React.FC<Props> = ({ color, children, style }) => {
    return <View style={[styles.container, { borderColor: color.getColor() }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        borderRadius: ResDimensions.fillRadius,
        padding: ResDimensions.cardPadding,
        borderWidth: 4,
    },
});

export default OutlinedContainer;
