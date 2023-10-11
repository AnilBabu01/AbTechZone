import React,{useEffect,} from 'react';
import CoachingNavigation from './CoachingNavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';

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
