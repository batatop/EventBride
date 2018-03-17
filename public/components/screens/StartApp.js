import React from "react";
import { View, Text, Image } from "react-native";
import { NavigationActions } from 'react-navigation';
import Splash from "./Splash"

export default class StartApp extends React.Component {
    componentDidMount() {
        if (this.props.screenProps.user == null) {
            this.props.screenProps.rootNavigation.navigate("Auth")
        }
        else {
            this.props.screenProps.rootNavigation.navigate("Groups")
        }
    }

    render() {
        return <Splash />
    }
}