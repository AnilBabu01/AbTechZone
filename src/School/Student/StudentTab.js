import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AddStudent from './Add/AddStudent';
import Admission from './admission/Admission';
import Header from '../../Component/Header/Header';
const Tab = createMaterialTopTabNavigator();

function StudentTab({navigation}) {
  return (
    <>
      <Header />
      <Tab.Navigator
        headerMode={'screen'}
        screenOptions={{
          header: ({navigation}) => <Header navigation={navigation} />,
        }}>
        <Tab.Screen name="Admisssion" component={Admission} />
        <Tab.Screen name="Add Student" component={AddStudent} />
      </Tab.Navigator>
    </>
  );
}

export default StudentTab;
