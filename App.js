import * as React from 'react';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Scan from './screens/scanScreen'


export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const tabNavigator= createBottomTabNavigator({
  scanScreen:{screen:Scan},
  
})
const AppContainer=createAppContainer(tabNavigator)