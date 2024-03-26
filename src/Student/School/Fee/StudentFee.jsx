import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import StudentSchoolFee from './StudentSchoolFee';
import StudentOthersFee from './StudentOthersFee';
import StudentTransport from './StudentTransport';
import StudentLedgerFee from './StudentLedgerFee';
import StudentHostelFee from './StudentHostelFee';
import BackHeader from '../../../Component/Header/BackHeader';
const Tab = createMaterialTopTabNavigator();

function StudentTab() {
  return (
    <>
      <BackHeader title={'Attendance'} />
      <Tab.Navigator>
        <Tab.Screen name="SchoolFee" component={StudentSchoolFee} />
        <Tab.Screen name="TransportFee" component={StudentTransport} />
        <Tab.Screen name="HostelFee" component={StudentHostelFee} />
        <Tab.Screen name="OthersFee" component={StudentOthersFee} />
        <Tab.Screen name="Ledger" component={StudentLedgerFee} />
      </Tab.Navigator>
    </>
  );
}

export default StudentTab;
