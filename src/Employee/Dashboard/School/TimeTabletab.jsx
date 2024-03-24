import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TodayTimeTable from './TodayTimeTable';
import WeklyTimeTable from './WeklyTimeTable';
const Tab = createMaterialTopTabNavigator();

function TimeTabletab() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Today" component={TodayTimeTable} />
        <Tab.Screen name="Weekly" component={WeklyTimeTable} />
      </Tab.Navigator>
    </>
  );
}

export default TimeTabletab;
