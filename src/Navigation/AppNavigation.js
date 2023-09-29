import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import DrawerNavigation from './DrawerNavigation';
function AppNavigation() {
  return (
    <>
      <NavigationContainer>
        <DrawerNavigation />
        {/* <StackNavigation /> */}
      </NavigationContainer>
     
    </>
  );
}

export default AppNavigation;
