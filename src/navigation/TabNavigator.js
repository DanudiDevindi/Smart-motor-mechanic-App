import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../component/TabBar';
import HomeNavigator from './HomeNavigator';
import PeopleNavigator from './PeopleNavigator';
import HelpNavigator from './HelpNavigation'
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      tabBar={props => <TabBar {...props} />}>
         <Tab.Screen
        name='Home'
        component={HomeNavigator}
        initialParams={{ icon: 'home' }}
      />    
      <Tab.Screen
        name="custom"
        component={ComingSoonScreen}   
        initialParams={{ icon: 'shopping-cart' }}  
      />
      <Tab.Screen
        name="Quection"
        component={HelpNavigator}   
        initialParams={{ icon: null }}  
      />
      <Tab.Screen
        name='People'
        component={PeopleNavigator}        
        initialParams={{ icon: 'person-outline' }}
      />      
      <Tab.Screen
        name='Setting'
        component={SettingScreen}
        initialParams={{ icon: 'settings' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;