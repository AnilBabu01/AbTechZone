import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BackHeader from '../../../Component/Header/BackHeader';
import SendSmdEmp from './SendSmdEmp';
import SendEmail from './SendEmail';
const Tab = createMaterialTopTabNavigator();

function CommunicationTab() {
  return (
    <>
      <BackHeader title={'Communication'} />
      <Tab.Navigator>
        <Tab.Screen name="Sendemail" component={SendEmail} />
        <Tab.Screen name="sendsms" component={SendSmdEmp} />
      </Tab.Navigator>
    </>
  );
}

export default CommunicationTab;
