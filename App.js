import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppointmentScreen from './app/(tabs)/AppointmentScreen';
import openStreetMapScreen from "./app/(tabs)/openStreetMapScreen";

export default function App() {
    return (
        <GestureHandlerRootView style= {{felx: 1}}>
             <SafeAreaView style={{ flex: 1}}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false}}>
                        <Stack.Screen name="openStreetMapScreen" component={openStreetMapScreen} />
                        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}