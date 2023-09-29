import {View, Text} from 'react-native';
import React from 'react';
import Home from '../Owner/Home';
import StackNavigation from './StackNavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Stack"
        options={{headerShown: false}}
        component={StackNavigation}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
