import React from "react";
import { View, Text, Keyboard } from "react-native";
import glamorous from "glamorous-native";
import firebase from "react-native-firebase";
import { NavigationActions } from 'react-navigation';

export default class NewEvent extends React.Component {
    componentWillMount() {
        this.setState({
            eventName: "noName",
        })
        this.onPressCreate = this.onPressCreate.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: "New Event"
    });

    onPressCreate() {
        let userRef = firebase.database().ref('users/' + this.props.screenProps.user.uid)
        let groupRef = firebase.database().ref('groups/' + this.props.navigation.state.params.groupInfo.key)
        let eventsRef = groupRef.child("events")
        let eventKey = eventsRef.push().key;

        eventsRef.child(eventKey).set({
            eventName: this.state.eventName,
            groupKey: this.props.navigation.state.params.groupInfo.key,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        
        groupRef.update({
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        Keyboard.dismiss()

        this.props.navigation.goBack()
    }

    render() {
        return (
            <SignUpView>
                <NewGroupInput
                    placeholder="Event Name"
                    onChangeText={(eventName) => this.setState({ eventName })}
                />
                <CreateButton onPress={this.onPressCreate}>
                    <ButtonText>Create</ButtonText>
                </CreateButton>
            </SignUpView>
        )
    }
}

const SignUpView = glamorous.view({
    flex: 1,
    backgroundColor: "#eff3f5",
    alignItems: "center",
})

const NewGroupInput = glamorous.textInput({
    height: 50,
    width: 375,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
})

const CreateButton = glamorous.touchableHighlight({
    height: 55,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3c4c85",
})

const ButtonText = glamorous.text({
    color: "white",
    fontSize: 25
})