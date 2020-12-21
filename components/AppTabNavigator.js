import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PetDetailsScreen from '../screens/PetDetailsScreen';
import PetDonateScreen from '../screens/PetDonateScreen';



export const AppTabNavigator = createBottomTabNavigator({
  PetDetails : {
    screen: PetDetailsScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/pet1.jpg")} style={{width:80, height:40}}/>,
      tabBarLabel : "Donate Books",
    }
  },
  PetDonate: {
    screen: PetDonateScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/pet2.jpg")} style={{width:80, height:40}}/>,
      tabBarLabel : "Book Request",
    }
  }
});