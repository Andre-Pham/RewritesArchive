import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import Environment from "../../state/environment/Environment";
import { OS } from "../../state/types/OS";
import ResDimensions from "../styling/ResDimensions";
import ResColor from "../styling/color/ResColor";

interface Props {
    color: ResColor;
    onPress?: () => void;
    children: any; // No type - can be any component
    style?: ViewStyle;
}

const FloatingContainer: React.FC<Props> = ({ color, onPress = undefined, children, style }) => {
    // Touchable opacity stops the highlighting of text - remove it if it's not a button
    return onPress == undefined ? (
        <View style={[styles.container, { backgroundColor: color.getColor() }, style]}>{children}</View>
    ) : (
        <TouchableOpacity onPress={onPress} disabled={onPress == undefined}>
            <View style={[styles.container, { backgroundColor: color.getColor() }, style]}>{children}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: ResDimensions.fillRadius,
        padding: ResDimensions.cardPadding,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        // Shadows appear sligntly differnt on web
        shadowOpacity: Environment.instance.getOS() == OS.web ? 0.16 : 0.12,
        shadowRadius: Environment.instance.getOS() == OS.web ? 12 : 7,
    },
});

export default FloatingContainer;
