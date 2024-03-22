import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TransferCer from './TransferCer';
import PrintTc from './PrintTc';
import Header from '../../../Component/Header/Header';
import BackHeader from '../../../Component/Header/BackHeader';

const Tab = createMaterialTopTabNavigator();

function TCTab() {
  return (
    <>
      <BackHeader title={'Transfer Certificate'} />
      <Tab.Navigator
        headerMode={'screen'}
        screenOptions={{
          header: ({navigation}) => <Header navigation={navigation} />,
        }}>
        <Tab.Screen name="Issue TC" component={TransferCer} />
        <Tab.Screen name="Print" component={PrintTc} />
      </Tab.Navigator>
    </>
  );
}

export default TCTab;
