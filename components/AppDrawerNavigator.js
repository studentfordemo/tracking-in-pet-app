import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import DonorDetailsScreen from '../screens/DonorDetailsScreen';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
  
  DonorDetails:{
    screen:DonorDetailsScreen
  },
},
  {
    contentComponent:CustomSideBarMenu
  },

  {
    initialRouteName : 'Home'
  })