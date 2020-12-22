import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import PetDetailsScreen from '../screens/PetDetailsScreen';
import DonorDetailsScreen  from '../screens/DonorDetailsScreen';




export const AppStackNavigator = createStackNavigator({
  PetDetailsScreen  : {
    screen : PetDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  DonorDetails : {
    screen : DonorDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  },

},
  {
    initialRouteName: 'PetDetailsScreen '
  }
);