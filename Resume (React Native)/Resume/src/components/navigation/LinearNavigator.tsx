import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import StateManager from "../../state/publishers/StateManager";
import NavHeader from "./NavHeader";
import NavStack from "./NavStack";

interface Props {
    stack: NavStack;
}

export const LinearNavigator: React.FC<Props> = ({ stack }) => {
    const Stack = createStackNavigator();
    const globalOptions = {}; // Options that apply to all screens

    const [refresh, setRefresh] = useState(false);
    StateManager.colorScheme.subscribe(() => {
        setRefresh(!refresh);
    });

    return (
        <Stack.Navigator>
            {stack.screens.map((screen, index) => {
                return (
                    <Stack.Screen
                        key={screen.id}
                        name={screen.id}
                        component={screen.component}
                        options={({ navigation }) => ({
                            ...screen.options,
                            ...globalOptions,
                            cardStyle: { backgroundColor: StateManager.backgroundColor.read() },
                            header: () =>
                                screen.title == null ? (
                                    <></>
                                ) : (
                                    <NavHeader title={screen.title} canGoBack={index > 0} navigation={navigation} />
                                ),
                        })}
                    />
                );
            })}
        </Stack.Navigator>
    );
};
