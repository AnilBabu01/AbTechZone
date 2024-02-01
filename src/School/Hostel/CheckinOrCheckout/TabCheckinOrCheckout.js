import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Checking from './Checking';
import Checkout from './Checkout';
import BackHeader from '../../../Component/Header/BackHeader';
const Tab = createMaterialTopTabNavigator();

function TabCheckinOrCheckout({navigation}) {
  return (
    <>
      <BackHeader title={'Checkin-Checkout'} />
      <Tab.Navigator
        headerMode={'screen'}
        screenOptions={{
          header: ({navigation}) => <Header navigation={navigation} />,
        }}>
        <Tab.Screen name="Checking" component={Checking} />
        <Tab.Screen name="Checkout" component={Checkout} />
      </Tab.Navigator>
    </>
  );
}

export default TabCheckinOrCheckout;
