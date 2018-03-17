import React from 'react';
import { TouchableHighlight, Image, Text, Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator, Header } from 'react-navigation';
import firebase from "react-native-firebase";

import Splash from './public/components/screens/Splash';
import StartApp from './public/components/screens/StartApp';
import SignIn from './public/components/screens/SignIn';
import SignUp from './public/components/screens/SignUp';
import SignOut from './public/components/screens/SignOut';
import Groups from './public/components/screens/Groups';
import NewGroup from './public/components/screens/NewGroup';
import Events from './public/components/screens/Events';
import NewEvent from './public/components/screens/NewEvent';
import Chat from './public/components/screens/Chat';
import Settings from './public/components/screens/Settings';

const AuthNavigator = StackNavigator(
  {
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const GroupsNavigator = StackNavigator(
  {
    Groups: { screen: Groups },
    Events: { screen: Events },
    Chat: { screen: Chat },
    NewGroup: { screen: NewGroup },
    NewEvent: { screen: NewEvent },
  }
  ,
  {
    navigationOptions: {
      headerTitleStyle: { width: Dimensions.get('window').width }
    }
  }
);

const RootNavigator = DrawerNavigator(
  {
    StartApp: { screen: ({ navigation, screenProps }) =>
      <StartApp
        screenProps={{
          rootNavigation: navigation,
          user: screenProps.user
        }}
      />
    },
    Auth: { screen: ({ navigation, screenProps }) =>
      <AuthNavigator
        screenProps={{
          rootNavigation: navigation,
          user: screenProps.user
        }}
      />
    },
    Groups: { screen: ({ navigation, screenProps }) =>
      <GroupsNavigator
        screenProps={{
          rootNavigation: navigation,
          user: screenProps.user,
          groups: screenProps.groups
        }}
      />
    },
    SignOut: { screen: ({ navigation, screenProps }) =>
      <SignOut
        screenProps={{
          rootNavigation: navigation,
          user: screenProps.user
        }}
      />
    },
  },
  {
    navigationOptions: {
      drawerLockMode: 'locked-closed',
    },
    contentOptions: {
      activeTintColor: 'black',
    }
  }
)

class App extends React.Component {
  componentWillMount() {
    this.setState({
      loading: true,
      user: null,
      groups: null,
    });
  }

  componentDidMount() {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let groups = []
        let userRef = firebase.database().ref("users/" + user.uid)
        let userGroupsRef = userRef.child("groups")
        //LOADING
        userGroupsRef.on("child_added", (snap) => {
          let groupRef = firebase.database().ref('groups/' + snap.key)
          groupRef.on('value', (snap) => {
            let group = snap.val()
            group.key = snap.key
            groups = groups.filter(function (group) {
              return group.key != snap.key;
            });
            groups.push(group)
            self.setState({
              groups: groups,
            })
          })
        })
        userGroupsRef.on("child_removed", (snap) => {
          firebase.database().ref('groups/' + snap.key).off()
          groups = groups.filter(function (group) {
            return group.key != snap.key;
          });
          self.setState({
            groups: groups,
          })
        })
        self.setState({
          loading: false,
          user: user,
        })
      }
      else {
        self.setState({
          loading: false,
          user: null,
          groups: null,
        })
      }
    });
  }

  render() {
    if (this.state.loading == false) {
      return <RootNavigator screenProps={{ user: this.state.user, groups: this.state.groups }} />
    }
    else {
      return <Splash />
    }
  }
}

export default () => <App />;

  /*
  //LOADING
  userGroupsRef.once('value', (snap) => {
    let initialGroupNum = snap.numChildren()
    for (let i = 0; i < snap.numChildren(); i++) {
      let groupRef = firebase.database().ref('groups/' + Object.keys(snap.val())[i])
      groupRef.on('value', (snap) => {
        let group = snap.val()
        group.key = snap.key
        groups = groups.filter(function (group) {
          return group.key != snap.key;
        });
        groups.push(group)
        if (groups.length == initialGroupNum) {
          self.setState({
            loading: false,
            groups: groups,
          })
        }
      })
    }
  })
  */