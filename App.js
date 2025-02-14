import React from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StreetMap from "./app/(tabs)/openStreetMapScreen";

export default function App() {
    return (
        <GestureHandlerRootView style= {{felx: 1}}>
             <SafeAreaView style={{ flex: 1}}>
                <StreetMap />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}