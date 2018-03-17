import React from "react";
import { View, Text, Image } from "react-native";
import { NavigationActions } from 'react-navigation';
import firebase from "react-native-firebase";
import Splash from "./Splash"

export default class SignOut extends React.Component {
    componentWillMount() {
        this.setState({
            authed: true,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.screenProps.user == null) {
            nextProps.screenProps.rootNavigation.navigate("Auth")
        }
    }

    componentDidMount() {
        var self = this
        firebase.auth().signOut()
            .catch(function (error) {
                const { code, message } = error;
                console.log(message)
            });
    }

    render() {
        return <Splash />
    }
}