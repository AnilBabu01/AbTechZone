import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RemoveBus from './RemoveBus';
import GiveBus from './GiveBus';
import BackHeader from '../../../Component/Header/BackHeader';
const Tab = createMaterialTopTabNavigator();

function TabGiveBusOrRemove({navigation}) {
  return (
    <>
      <BackHeader title={'Issue-Return'} />
      <Tab.Navigator
        headerMode={'screen'}
        screenOptions={{
          header: ({navigation}) => <Header navigation={navigation} />,
        }}>
        <Tab.Screen name="GiveBus" component={GiveBus} />
        <Tab.Screen name="RemoveBus" component={RemoveBus} />
      </Tab.Navigator>
    </>
  );
}

export default TabGiveBusOrRemove;
