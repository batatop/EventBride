import React from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';
import firebase from "react-native-firebase";
import glamorous from "glamorous-native"

export default class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            user: null,
            email: "",
            password: ""
        }
        this.onPressSignUp = this.onPressSignUp.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.screenProps.user != null) {
            nextProps.screenProps.rootNavigation.navigate("Groups")
        }
    }
    
    onPressSignUp() {
        var self = this
        if (this.state.email != "" && this.state.password != "") {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((user) => {
                    firebase.database().ref('users/' + user.uid).set({
                        id: user.uid,
                        username: this.state.email,
                        email: this.state.email,
                    });
                })
                .catch((error) => {
                    const { code, message } = error;
                    console.log(message)
                });
        }
        else {
            console.log("One of the columns are blank")
        }
    }

    render() {
        return (
            <SignUpView>
                <EmailInput
                    placeholder="e-mail"
                    onChangeText={(email) => this.setState({ email })}
                />
                <PasswordInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <SignUpButton onPress={this.onPressSignUp}>
                    <ButtonText>Sign Up</ButtonText>
                </SignUpButton>
                <BackButton onPress={() => this.props.navigation.goBack()}>
                    <ButtonText>Back</ButtonText>
                </BackButton>
            </SignUpView>
        )
    }
}

const SignUpView = glamorous.view({
    flex: 1,
    backgroundColor: "#eff3f5",
    alignItems: "center",
})

const EmailInput = glamorous.textInput({
    height: 50,
    width: 375,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
})

const PasswordInput = glamorous.textInput({
    height: 50,
    width: 375,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
})

const SignUpButton = glamorous.touchableHighlight({
    height: 55,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3c4c85",
    marginTop: 50,
    marginBottom: 10,
})

const BackButton = glamorous.touchableHighlight({
    height: 55,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d43a3c",
    marginTop: 10,
})

const ButtonText = glamorous.text({
    color: "white",
    fontSize: 25
})