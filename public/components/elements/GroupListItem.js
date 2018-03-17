import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    Image
} from "react-native";
import glamorous from "glamorous-native"

export default class GroupListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            selection: "neutral",
            backgroundColor: "#eff3f5"
        };
    }

    render() {
        return (
            <GroupButton onPress={() => this.props.navigation.navigate('Events', { groupInfo: this.props.groupInfo })}>
                <GroupView>
                    <GroupIconSide>
                        <GroupIcon source={require("../../assets/emptyIcon.png")} />
                    </GroupIconSide>
                    <GroupContentSide>
                        <GroupTitle>{this.props.title}</GroupTitle>
                    </GroupContentSide>
                </GroupView>
            </GroupButton>
        );
    }
}

const GroupButton = glamorous.touchableHighlight({
    flexDirection: "row",
    flex: 1,
    height: 80
})

const GroupView = glamorous.view({
    flexDirection: "row",
    flex: 1,
    height: 80
})

const GroupIconSide = glamorous.view({
    flex: 0.2
})

const GroupContentSide = glamorous.view({
    flex: 0.8,
    justifyContent: "center",
})

const GroupIcon = glamorous.image({
    flex: 1,
    height: 60,
    width: 60,
    marginTop: 10,
    marginBottom: 10,
    left: "13%",
    borderRadius: 30
})

const GroupTitle = glamorous.text({
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold"
})