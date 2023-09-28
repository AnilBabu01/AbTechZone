import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Owner/Home';

const Stack = createNativeStackNavigator();

function Main() {
  //   const dispatch = useDispatch();
  const [showsplash, setshowsplash] = useState(true);
  useEffect(() => {
    // dispatch(loadUser());
    setTimeout(() => {
      setshowsplash(false);
    }, 1000);
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default Main;
