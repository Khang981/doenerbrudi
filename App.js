import React from "react";
import { SafeAreaView } from "react-native";
import StreetMap from "./app/(tabs)/openStreetMapScreen";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <StreetMap />
        </SafeAreaView>
    );
}