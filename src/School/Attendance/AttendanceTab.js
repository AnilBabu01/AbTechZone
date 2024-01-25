import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TakeAttendance from './TakeAttendance/TakeAttendance';
import TodayAttendance from './TodayAttendance/TodayAttendance';
import Analysis from './Analysis/Analysis';
import Header from '../../Component/Header/Header';
import BackHeader from '../../Component/Header/BackHeader';
const Tab = createMaterialTopTabNavigator();

function StudentTab() {
  return (
    <>
      <BackHeader title={'Attendance'} />
      <Tab.Navigator>
        <Tab.Screen name="Attendance" component={TakeAttendance} />
        <Tab.Screen name="Analysis" component={Analysis} />
      </Tab.Navigator>
    </>
  );
}

export default StudentTab;
