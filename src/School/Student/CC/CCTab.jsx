import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CharacterC from './CharacterC';
import PrintCC from './PrintCC';
import Header from '../../../Component/Header/Header';
import BackHeader from '../../../Component/Header/BackHeader';

const Tab = createMaterialTopTabNavigator();

function CCTab() {
  return (
    <>
      <BackHeader title={'Character Certificate'} />
      <Tab.Navigator
        headerMode={'screen'}
        screenOptions={{
          header: ({navigation}) => <Header navigation={navigation} />,
        }}>
        <Tab.Screen name="Issue CC" component={CharacterC} />
        <Tab.Screen name="Print" component={PrintCC} />
      </Tab.Navigator>
    </>
  );
}

export default CCTab;
