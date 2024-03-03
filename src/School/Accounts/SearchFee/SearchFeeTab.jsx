import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchByMonth from './SearchByMonth';
import SearchFee from './SearchFee';
import BackHeader from '../../../Component/Header/BackHeader';
const Tab = createMaterialTopTabNavigator();

function SearchFeeTab() {
  return (
    <>
      <BackHeader title={'Search Fee'} />
      <Tab.Navigator>
        <Tab.Screen name="SearchByMonth" component={SearchByMonth} />
        <Tab.Screen name="SearchFee" component={SearchFee} />
      </Tab.Navigator>
    </>
  );
}

export default SearchFeeTab;
