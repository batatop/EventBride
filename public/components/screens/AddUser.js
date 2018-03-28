import React from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import glamorous from "glamorous-native";
import firebase from "react-native-firebase";

export default class AddUser extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Add User"
    });

    componentWillMount() {
        this.setState({
            userSearch: " ",
        })
        this.getUsers = this.getUsers.bind(this)
        this.addUser = this.addUser.bind(this)
    }

    getUsers() {
        let users = []
        if (this.state.userSearch == "" || this.state.userSearch == " ") {
            return []
        }
        else {
            users = this.props.screenProps.allUsers.filter(user => {
                if(user.username.includes(this.state.userSearch)) {
                    let userItem = user
                    userItem.key = user.id
                    return true
                }
                else {
                    return false
                }
            });
        }

        return users
    }

    addUser(userId, groupId) {
        let userGroupsRef = firebase.database().ref('users/' + userId + "/groups")
        userGroupsRef.child(groupId).set(true);
        let group = {}
        let groupsRef = firebase.database().ref('groups/' + groupId + "/groupUsers")
        group[userId] = true
        groupsRef.update(group);
    }

    render() {
        return (
            <AddUserView>
                <SearchInput
                    placeholder="Search"
                    onChangeText={(userSearch) => this.setState({ userSearch })}
                />
                <Text>Search Results</Text>
                <FlatList
                    data={this.getUsers()}
                    renderItem={({ item }) => 
                        <TouchableHighlight onPress={this.addUser.bind(this, item.id, this.props.navigation.state.params.groupInfo.key)}>
                            <View style={{ backgroundColor: 'white' }}>
                                <Text>{item.username}</Text>
                            </View>
                        </TouchableHighlight>
                    }
                />
            </AddUserView>
        )
    }
}

const AddUserView = glamorous.view({
    flex: 1,
    backgroundColor: "#eff3f5",
})

const SearchInput = glamorous.textInput({
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
})