import {View, Text} from 'react-native';
import React from 'react';
// import Man from '../screens/Man';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      {/* <Drawer.Screen
        name="Feed"
        options={{headerShown: false}}
        component={Man}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
