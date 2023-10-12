import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import CoachingNavigation from './StackNavigation';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="CoachingNavigation"
        options={{headerShown: false}}
        component={CoachingNavigation}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
