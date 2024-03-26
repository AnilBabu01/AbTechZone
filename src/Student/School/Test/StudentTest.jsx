import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Result from './Result';
import TestList from './TestList';
import BackHeader from '../../../Component/Header/BackHeader';
const Tab = createMaterialTopTabNavigator();

function StudentTest() {
  return (
    <>
      <BackHeader title={'Test'} />
      <Tab.Navigator>
        <Tab.Screen name="TestList" component={TestList} />
        <Tab.Screen name="Result" component={Result} />
      </Tab.Navigator>
    </>
  );
}

export default StudentTest;
