import React from "react";
import { View, FlatList, TouchableHighlight, Image } from "react-native";
import glamorous from "glamorous-native"

import GroupListItem from '../elements/GroupListItem';

export default class Groups extends React.Component {
    componentWillMount() {
        this.setState({
            groups: this.props.screenProps.groups
        });
    }

    static navigationOptions = ({ screenProps, navigation }) => ({
        title: "Groups",
        headerLeft: (
            <TouchableHighlight
                style={{padding: 18}}
                onPress={() => screenProps.rootNavigation.navigate("DrawerToggle")}
            >
                <Image source={require("../../assets/menuIcon.png")} />
            </TouchableHighlight>
        ),
        headerRight: (
            <IconContainer>
                <HeaderIcon
                    onPress={() => navigation.navigate("NewGroup")}
                >
                    <Image source={require("../../assets/addIcon.png")} />
                </HeaderIcon>
            </IconContainer>
        )
    });

    componentWillReceiveProps(nextProps) {
        this.setState({
            groups: nextProps.screenProps.groups
        });
    }

    getFlatListData() {
        if(this.state.groups != null) {
            let sortedGroups = this.state.groups.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            });
            return sortedGroups
        }
        else{
            return []
        }
    }
    
    render() {
        return (
            <View flex={1} style={{ backgroundColor: "#eff3f5" }}>
                <FlatList
                    data={this.getFlatListData()}
                    extraData={this.state}
                    renderItem={({ item }) =>
                        <GroupListItem
                            title={item.groupName}
                            navigation = {this.props.navigation}
                            groupInfo = {item}
                        />
                    }
                />
            </View>
        );
    }
}

const IconContainer = glamorous.view({
    flexDirection: "row",
    flex: 1,
})

const HeaderIcon = glamorous.touchableHighlight({
    paddingTop: 18,
    paddingRight: 18
})