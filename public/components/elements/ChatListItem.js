import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    Image
} from "react-native";
import glamorous from "glamorous-native"

export default class ChatListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            selection: "neutral",
            backgroundColor: "#eff3f5"
        };
    }

    render() {
        console.log(this.props.userId)
        if (this.props.message.senderId == this.props.userId) {
            return (
                <SentMessageBox>
                    <MessageText>{this.props.message.message}</MessageText>
                </SentMessageBox>
            )
        }
        else{
            return (
                <RecievedMessageBox>
                    <MessageText>{this.props.message.message}</MessageText>
                </RecievedMessageBox>
            )
        }
    }
}

const SentMessageBox = glamorous.view({
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#d5daec",
    margin: 5,
    padding: 10,
    maxWidth: "75%",
    alignSelf: 'flex-end',  
})

const RecievedMessageBox = glamorous.view({
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#afb8da",
    margin: 5,
    padding: 10,
    maxWidth: "75%",
    alignSelf: 'flex-start',
})

// "#afb8da"

const MessageText = glamorous.text({
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold"
})