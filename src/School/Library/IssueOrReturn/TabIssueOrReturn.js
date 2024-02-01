import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import IssueBook from './IssueBook';
import ReturnBook from './ReturnBook';
import BackHeader from '../../../Component/Header/BackHeader';
const Tab = createMaterialTopTabNavigator();

function TabIssueOrReturn({navigation}) {
  return (
    <>
      <BackHeader title={'Issue-Return'} />
      <Tab.Navigator
        headerMode={'screen'}
        screenOptions={{
          header: ({navigation}) => <Header navigation={navigation} />,
        }}>
        <Tab.Screen name="IssueBook" component={IssueBook} />
        <Tab.Screen name="ReturnBook" component={ReturnBook} />
      </Tab.Navigator>
    </>
  );
}

export default TabIssueOrReturn;
