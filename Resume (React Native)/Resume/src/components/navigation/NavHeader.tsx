import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StateManager from "../../state/publishers/StateManager";
import ResText from "../base/ResText/ResText";
import ResTypography from "../styling/ResTypography";

interface Props {
    title: string;
    canGoBack: boolean;
    navigation: any;
}

const NavHeader: React.FC<Props> = ({ title, canGoBack, navigation }) => {
    const [backgroundColor, setBackgroundColor] = React.useState<string | undefined>(
        StateManager.backgroundColor.read(),
    );

    useEffect(() => {
        const unsubscribe = StateManager.backgroundColor.subscribe(() => {
            setBackgroundColor(StateManager.backgroundColor.read());
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <SafeAreaView edges={["top"]} style={{ backgroundColor: backgroundColor }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 22,
                    paddingTop: 22,
                }}
            >
                {canGoBack ? (
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        style={{
                            alignItems: "center",
                            paddingRight: 6,
                        }}
                    >
                        <Icon
                            name={"chevron-left"}
                            size={45}
                            color={ResTypography.header.color}
                            style={{ marginLeft: -10 }}
                        />
                    </TouchableOpacity>
                ) : null}

                <ResText typography={ResTypography.header}>{title}</ResText>
            </View>
        </SafeAreaView>
    );
};

export default NavHeader;
