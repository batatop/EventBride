import React from 'react';
import { View, TextInput, TouchableHighlight, Text, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from "react-native-firebase";
import glamorous from "glamorous-native"

export default class SignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            user: null,
            email: "",
            password: "",
        }
        this.onPressSignIn = this.onPressSignIn.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.screenProps.user != null) {
            nextProps.screenProps.rootNavigation.navigate("Groups")
        }
    }

    onPressSignIn() {
        var self = this
        if (this.state.email != "" && this.state.password != "") {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .catch(function(error) {
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
            <SignInView>
                <EmailInput
                    placeholder="e-mail"
                    onChangeText={(email) => this.setState({ email })}
                />
                <PasswordInput
                    placeholder="password"
                    secureTextEntry={true}                    
                    onChangeText={(password) => this.setState({ password })}
                />
                <SignInButton onPress={this.onPressSignIn}>
                    <ButtonText>Sign In</ButtonText>
                </SignInButton>
                <SignUpButton onPress={() => this.props.navigation.navigate('SignUp')}>
                    <ButtonText>Sign-up</ButtonText>
                </SignUpButton>
            </SignInView>
        )
    }
}

const SignInView = glamorous.view({
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

const SignInButton = glamorous.touchableHighlight({
    height: 55,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#90bc29",
    marginTop: 50,
    marginBottom: 10,
})

const SignUpButton = glamorous.touchableHighlight({
    height: 55,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3c4c85",
    marginTop: 10,
})

const ButtonText = glamorous.text({
    color: "white",
    fontSize: 25
})

// backgroundColor: "#3c4c85",