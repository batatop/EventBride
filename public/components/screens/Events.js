import React from "react";
import { View, FlatList, TouchableHighlight, Image } from "react-native";
import glamorous from "glamorous-native"

import EventListItem from '../elements/EventListItem';

export default class Events extends React.Component {
    componentWillMount() {
        let events = this.getEvents(this.props.screenProps.groups)
        this.setState({
            events: events
        })
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.groupInfo.groupName,
        headerRight: (
            <TouchableHighlight
                style={{ padding: 18 }}
                onPress={() => navigation.navigate("NewEvent", { groupInfo: navigation.state.params.groupInfo })}
            >
                <Image source={require("../../assets/addIcon.png")} />
            </TouchableHighlight>
        )
    });

    componentWillReceiveProps(nextProps) {
        let events = this.getEvents(nextProps.screenProps.groups)
        this.setState({
            events: events
        });
    }

    getEvents(groups) {
        let self = this
        let events = groups.filter(function (group) {
            return group.key == self.props.navigation.state.params.groupInfo.key;
        });

        let eventsObj = []
        if (events[0].events !=  undefined){
            for (let i = 0; i < Object.keys(events[0].events).length; i++) {
                let singleEvent = Object.entries(events[0].events)[i][1]
                singleEvent.key = Object.keys(events[0].events)[i]
                eventsObj.push(singleEvent)
            }
        }

        return eventsObj
    }

    getFlatListData() {
        if (this.state.events != null) {
            let sortedEvents = this.state.events.sort(function (a, b) {
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
            <View flex={1} style={{backgroundColor: "#eff3f5"}}>
                <FlatList
                    data={this.getFlatListData()}
                    extraData={this.state}
                    renderItem={({ item }) =>
                        <EventListItem
                            title={item.eventName}
                            subtitle={item.subtitle}
                            navigation={this.props.navigation}
                            eventInfo={item}
                        />
                    }
                />
            </View>
        );
    }
}