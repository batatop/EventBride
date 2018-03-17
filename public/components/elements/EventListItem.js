import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    Image
} from "react-native";
import glamorous from "glamorous-native"

export default class EventListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            selection: "neutral",
            backgroundColor: "#eff3f5"
        };
        this.onPressGoing = this.onPressGoing.bind(this)
        this.onPressNotGoing = this.onPressNotGoing.bind(this)
        this.onPressReset = this.onPressReset.bind(this)
    }

    onPressGoing() {
        this.setState({
            selection: "going",
            eventColor: "#aebc8e"
        });
    }

    onPressNotGoing() {
        this.setState({
            selection: "notGoing",
            eventColor: "#eff3f5"
        });
    }

    onPressReset() {
        this.setState({
            selection: "neutral",
            eventColor: "#eff3f5"
        });
    }

    render() {
        return (
            <EventView>
                <EventIconSide>
                    <EventIcon source={require("../../assets/emptyIcon.png")} />
                </EventIconSide>
                <EventContentSide>
                    <EventTitle>{this.props.title}</EventTitle>
                    <EventSubtitle>{this.props.subtitle}</EventSubtitle>
                </EventContentSide>
                {this.state.selection == "neutral" &&
                    <EventButtonsSide>
                        <EventGoingButton onPress={this.onPressGoing}>
                            <Image
                                source={require("../../assets/goingIcon.png")}
                            />
                        </EventGoingButton>
                        <EventNotGoingButton onPress={this.onPressNotGoing}>
                            <Image
                                source={require("../../assets/notGoingIcon.png")}
                            />
                        </EventNotGoingButton>
                    </EventButtonsSide>
                }
                {this.state.selection == "going" &&
                    <EventButtonsSide>
                        <EventChatButton onPress={() =>
                                this.props.navigation.navigate('Chat', { eventInfo: this.props.eventInfo })
                            }
                        >
                            <Image
                                source={require("../../assets/chatIcon.png")}
                            />
                        </EventChatButton>
                        <EventGoingResetButton onPress={this.onPressReset}>
                            <Image
                                source={require("../../assets/resetIcon.png")}
                            />
                        </EventGoingResetButton>
                    </EventButtonsSide>
                }
                {this.state.selection == "notGoing" &&
                    <EventButtonsSide>
                        <EventResetButton onPress={this.onPressReset}>
                            <Image
                                source={require("../../assets/resetIcon.png")}
                            />
                        </EventResetButton>
                    </EventButtonsSide>
                }
            </EventView>
        );
    }
}

const EventView = glamorous.view({
    flexDirection: "row",
    flex: 1,
    height: 50
})

const EventIconSide = glamorous.view({
    flex: 0.15
})

const EventContentSide = glamorous.view({
    flexDirection: "column",
    flex: 0.60
})

const EventButtonsSide = glamorous.view({
    flexDirection: "row",
    flex: 0.25
})

const EventIcon = glamorous.image({
    flex: 1,
    height: 40,
    width: 40,
    marginTop: 5,
    marginBottom: 5,
    left: "15%",
    borderRadius: 20
})

const EventTitle = glamorous.text({
    flex: 0.7,
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold",
    marginTop: 2
})

const EventSubtitle = glamorous.text({
    flex: 0.7,
    color: "#777777"
})

const EventGoingButton = glamorous.touchableHighlight({
    height: 30,
    width: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    left: "20%",
    backgroundColor: "#90bc29",
    justifyContent: 'center',
    alignItems: 'center'
})

const EventNotGoingButton = glamorous.touchableHighlight({
    height: 30,
    width: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    left: "60%",
    backgroundColor: "#d43a3c",
    justifyContent: 'center',
    alignItems: 'center'
})

const EventChatButton = glamorous.touchableHighlight({
    height: 30,
    width: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    left: "20%",
    backgroundColor: "#3c4c85",
    justifyContent: 'center',
    alignItems: 'center'
})

const EventResetButton = glamorous.touchableHighlight({
    height: 30,
    width: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    left: "20%",
    backgroundColor: "#c0cdce",
    justifyContent: 'center',
    alignItems: 'center'
})

const EventGoingResetButton = glamorous.touchableHighlight({
    height: 30,
    width: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    left: "60%",
    backgroundColor: "#c0cdce",
    justifyContent: 'center',
    alignItems: 'center'
})