import React from "react";
import { View, Text, Keyboard } from "react-native";
import glamorous from "glamorous-native";
import firebase from "react-native-firebase";
import { NavigationActions } from 'react-navigation';

export default class NewGroup extends React.Component {
    componentWillMount() {
        this.setState({
            groupName: "noName",
        })
        this.onPressCreate = this.onPressCreate.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: "New Group"
    });

    onPressCreate(){
        let userRef = firebase.database().ref('users/' + this.props.screenProps.user.uid)
        let groupsRef = firebase.database().ref('groups')
        let groupKey = groupsRef.push().key;
        let userGroup = {}

        groupsRef.child(groupKey).set({
            groupName: this.state.groupName,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        userGroup[groupKey] = true
        userRef.child("groups").update(userGroup);
        
        Keyboard.dismiss()

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Groups' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <SignUpView>
                <NewGroupInput
                    placeholder="Group Name"
                    onChangeText={(groupName) => this.setState({ groupName })}
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