import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SendEmail from './SendEmail';
import SendSms from './SendSms';
import BackHeader from '../../../Component/Header/BackHeader';

const Tab = createMaterialTopTabNavigator();

function CommunicationTab() {
  return (
    <>
      <BackHeader title={'Communication'} />
      <Tab.Navigator>
        <Tab.Screen name="SendEmail" component={SendEmail} />
        {/* <Tab.Screen name="SemdSms" component={SendSms} /> */}
      </Tab.Navigator>
    </>
  );
}

export default CommunicationTab;
