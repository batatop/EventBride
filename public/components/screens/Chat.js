import React from 'react';
import { View, TextInput, TouchableHighlight, Text, Image, FlatList, Keyboard } from 'react-native';
import firebase from "react-native-firebase";
import glamorous from "glamorous-native"

import GroupListItem from '../elements/ChatListItem';

export default class Chat extends React.Component {
    componentWillMount() {
        let chat = this.getMessages(this.props.screenProps.groups)
        this.setState({
            message: "",
            chat: chat
        })
        this.onPressSend = this.onPressSend.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.eventInfo.eventName
    });

    componentWillReceiveProps(nextProps) {
        let chat = this.getMessages(nextProps.screenProps.groups)
        this.setState({
            chat: chat
        });
    }

    getMessages(groups) {
        let self = this
        let groupKey = this.props.navigation.state.params.eventInfo.groupKey
        let eventKey = this.props.navigation.state.params.eventInfo.key

        let currentGroup = groups.filter(function (group) {
            return group.key == groupKey
        });

        let currentEvent = null
        if (currentGroup[0].events != undefined) {
            for (let i = 0; i < Object.keys(currentGroup[0].events).length; i++) {
                if (Object.keys(currentGroup[0].events)[i] == eventKey){
                    currentEvent = Object.entries(currentGroup[0].events)[i][1]
                }
            }
        }

        messagesObj = []
        if (currentEvent.messages != undefined) {
            for (let i = 0; i < Object.keys(currentEvent.messages).length; i++) {
                let singleMessage = Object.entries(currentEvent.messages)[i][1]
                singleMessage.key = Object.keys(currentEvent.messages)[i]
                messagesObj.push(singleMessage)
            }
        }

        return messagesObj
    }

    onPressSend() {
        if(this.state.message != "") {
            let groupKey = this.props.navigation.state.params.eventInfo.groupKey
            let eventKey = this.props.navigation.state.params.eventInfo.key
            let groupRef = firebase.database().ref('groups/' + groupKey)
            let eventRef = groupRef.child("events").child(eventKey)
            let messagesRef = eventRef.child("messages")
            let messageKey = messagesRef.push().key;

            messagesRef.child(messageKey).set({
                message: this.state.message,
                senderId: this.props.screenProps.user.uid,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            });
            
            eventRef.update({
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });

            Keyboard.dismiss()
        }
    }

    getFlatListData() {
        if (this.state.chat != null) {
            let sortedEvents = this.state.chat.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            });
            return sortedEvents
        }
        else {
            return []
        }
    }

    render() {
        return (
            <SignUpView>
                <FlatList
                    data={this.getFlatListData()}
                    extraData={this.state}
                    renderItem={({ item }) =>
                        <GroupListItem
                            message={item}
                            userId={this.props.screenProps.user.uid}
                        />
                    }
                />
                <InputView>
                    <ChatSide>
                        <ChatArea>
                            <ChatInput
                                placeholder="Type a message"
                                onChangeText={(message) => this.setState({ message })}
                            />
                        </ChatArea>
                    </ChatSide>
                    <InputIconSide>
                        <SendButton onPress={this.onPressSend}>
                            <SendIcon source={require("../../assets/sendIcon.png")} />
                        </SendButton>
                    </InputIconSide>
                </InputView>
            </SignUpView>
        )
    }
}

const SignUpView = glamorous.view({
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#eff3f5",
    justifyContent: "flex-end"
})

const InputView = glamorous.view({
    flexDirection: "row",
    height: 50,
})

const ChatSide = glamorous.view({
    flex: 0.85,
    height: 50,
    justifyContent: "center",
})

const InputIconSide = glamorous.view({
    flex: 0.15,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
})

const ChatArea = glamorous.view({
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10
})

const ChatInput = glamorous.textInput({
    height: 40,
    marginLeft: 10,
    marginRight: 10
})

const SendButton = glamorous.touchableHighlight({
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#3c4c85",
    justifyContent: "center",
    alignItems: "center",
})

const SendIcon = glamorous.image({
    width: 25,
    height: 25
})