
import React,{Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import PetDetailsScreen from '../screens/PetDetailsScreen';
import DonorDetailsScreen  from '../screens/DonorDetailsScreen';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';



export default class SwitchNavigation extends Component{
  render(){
  return (
   
    <AppContainer/>

  );
}
}

const switchNavigator = createSwitchNavigator({
  PetDetailsScreen:{screen: PetDetailsScreen},
 
  DonorDetailsScreen: {screen: DonorDetailsScreen},
  
})

const AppContainer =  createAppContainer(switchNavigator);