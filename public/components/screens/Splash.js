import React from "react";
import { View, Text } from "react-native";
import glamorous from "glamorous-native"

export default class Splash extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <SplashView>
                <SplashText>Loading</SplashText>
            </SplashView>
        )
    }
}

const SplashView = glamorous.view({
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eff3f5",
})

const SplashText = glamorous.text({
    fontSize: 50
})