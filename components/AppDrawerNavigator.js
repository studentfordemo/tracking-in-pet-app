import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyAdoptionScreen from '../screens/MyAdoptionsScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    MyAdoptions : {
      screen : MyAdoptionScreen
    }
  },


  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })