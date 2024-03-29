import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HelpCenter from '../Component/HelpCenter';
import LoginScreen from '../Auth/Login';
import SignUpScreen from '../Auth/SignUp';
import SplashScreen from '../Splash/Splash';
import HomeScreen from '../Owner/Home';
import DashboardCoaching from '../Coaching/Dashboard/Dashboard';
import DashboardCollege from '../College/Dashboard/Dashboard';
import DashboardSchool from '../School/Dashboard/Dashboard';
import DashboardEmplyee from '../Employee/Dashboard/Dashboard';
import DashboardStudent from '../Student/Dashboard/Dashboard';
import DashboardParent from '../Parent/Dashboard/Dashboard';
import DashboardOwner from '../Owner/Dashboard/Dashboard';
///Coaching screens

import FrontOfficeCoaching from '../Coaching/FrontOffice/FrontOffice';
import StudentTabCoaching from '../Coaching/Student/StudentTab';
import SearchaddCoaching from '../Coaching/Student/Add/Search';
import SearchadminssionCoaching from '../Coaching/Student/admission/Search';
import TakeAdmissionCoaching from '../Coaching/Student/admission/TakeAdmission';
import AddNewStudentCoaching from '../Coaching/Student/Add/AddNewStudent';
import AttendanceTabCoaching from '../Coaching/Attendance/AttendanceTab';
import AddEnquiryCoaching from '../Coaching/FrontOffice/AddEnquiry';
import UpdateEnquiryCoaching from '../Coaching/FrontOffice/UpdateEnquiry';
import AddTestCoaching from '../Coaching/Test/AddTest';
import TestCoaching from '../Coaching/Test/Test';
import UpdateTestCoaching from '../Coaching/Test/UpdateTest';
import ProfileCoaching from '../Coaching/Profile/Profile';
import UpdateInstituteCoaching from '../Coaching/Profile/UpdateInstitute';
import UpdateCredentialCoaching from '../Coaching/Profile/UpdateCredential';
import UpdateImgaesCoaching from '../Coaching/Profile/UpdateImgaes';
import UpdateCommunicationCoaching from '../Coaching/Profile/UpdateCommunication';
import AddCollectFeeCoaching from '../Coaching/Accounts/CollectFeee/AddCollectFee';
import UpdateCollectFeeCoaching from '../Coaching/Accounts/CollectFeee/UpdateCollectFee';
import FeeCollectCoaching from '../Coaching/Accounts/CollectFeee/FeeCollect';
import SearchPaidCoaching from '../Coaching/Accounts/PaidFee/SearchPaid';
import SearchPendingFeeCoaching from '../Coaching/Accounts/PendingFee/SearchPendingFee';
import FeeCollectOptionsCoaching from '../Coaching/Accounts/FeeCollectOptions';
import HumanResourseOptionsCoaching from '../Coaching/HumanResourse/HumanResourseOptions';
import ReportsOptionsCoaching from '../Coaching/Reports/ReportsOptions';

///School screens
import SchoolStudentOptions from '../School/Student/SchoolStudentOptions';
import SchoolHostelOptiins from '../School/Hostel/SchoolHostelOptiins';
import SchoolLibraryOptions from '../School/Library/SchoolLibraryOptions';
import SchoolTranportOptions from '../School/Transport/SchoolTranportOptions';
import SchoolTestOptions from '../School/Test/SchoolTestOptions';
import SchoolHrOptions from '../School/HumanResourse/SchoolHrOptions';
import AddStudent from '../School/Student/Add/AddStudent';
import Add from '../School/Student/Add/Add';
import Admission from '../School/Student/admission/Admission';
import UpdateAdmission from '../School/Student/admission/UpdateAdmission';
import TakeAdmissionSchool from '../School/Student/admission/TakeAdmission';
import AddNewStudentSchool from '../School/Student/Add/AddNewStudent';
import AttendanceTabSchool from '../School/Attendance/AttendanceTab';
import AddTestSchool from '../School/Test/AddTest';
import TestSchool from '../School/Test/Test';
import UpdateTestSchool from '../School/Test/UpdateTest';
import ProfileSchool from '../School/Profile/Profile';
import UpdateInstituteSchool from '../School/Profile/UpdateInstitute';
import UpdateCredentialSchool from '../School/Profile/UpdateCredential';
import UpdateImgaesSchool from '../School/Profile/UpdateImgaes';
import UpdateCommunicationSchool from '../School/Profile/UpdateCommunication';
import EmployeeSchool from '../School/HumanResourse/Staff/AddEmployee';

import AddCollectFeeSchool from '../School/Accounts/CollectFeee/AddCollectFee';
import UpdateCollectFeeSchool from '../School/Accounts/CollectFeee/UpdateCollectFee';

import FeeCollectSchool from '../School/Accounts/CollectFeee/FeeCollect';
import SearchPaidSchool from '../School/Accounts/PaidFee/SearchPaid';
import SearchPendingFeeSchool from '../School/Accounts/PendingFee/SearchPendingFee';
import FeeCollectOptionsSchool from '../School/Accounts/FeeCollectOptions';
import FeeCollectOptions from '../School/Accounts/FeeCollectOptions';
import ReportsOptionsSchool from '../School/Reports/ReportsOptions';
import CharacterC from '../School/Student/CC/CharacterC';
import AddOtherFee from '../School/Student/OtherFee/AddOtherFee';
import PCreadentials from '../School/Student/PCreadentials/PCreadentials';
import SCreadentials from '../School/Student/SCreadentials/SCreadentials';
import SendSms from '../School/Student/SendSms.js/SendSms';
import TransferCer from '../School/Student/TC/TransferCer';
import AddTimeTable from '../School/Student/TimeTable/AddTimeTable';
import ChangeSession from '../School/Student/ChangeSession/ChangeSession';
import PrintReceipt from '../School/Accounts/PrintReceipt/PrintReceipt';
import SearchFeeTab from '../School/Accounts/SearchFee/SearchFeeTab';
import EmpAddholiday from '../School/HumanResourse/AddHoliday/EmpAddholiday';
import EmpAssignRole from '../School/HumanResourse/AssignRole/EmpAssignRole';
import EmpAddpayroll from '../School/HumanResourse/AddPayRoll/EmpAddpayroll';
import SearchAttendance from '../School/HumanResourse/SearchAttendance/SearchAttendance';
import SendSmdEmp from '../School/HumanResourse/SendSmsEmp/SendSmdEmp';
import AddBook from '../School/Library/AddBook/AddBook';
import AddStudentToLibrary from '../School/Library/AddStudentToSchool/AddStudentToLibrary';
import TabIssueOrReturn from '../School/Library/IssueOrReturn/TabIssueOrReturn';
import SearchBook from '../School/Library/SearchBook/SearchBook';
import AddBus from '../School/Transport/AddBus/AddBus';
import AddStudentToTransport from '../School/Transport/AddStudentToTransport/AddStudentToTransport';
import TabGiveBusOrRemove from '../School/Transport/GiveBusOrRemove/TabGiveBusOrRemove';
import SearchBus from '../School/Transport/SearchBus/SearchBus';
import SendSmsToBusStudent from '../School/Transport/SendSms/SendSmsToBusStudent';
import VehicleType from '../School/Transport/VehicleType/VehicleType';
import AddRoute from '../School/Transport/VehicleRoute/AddRoute';
import MasterOptionsSchool from '../School/Masters/MasterOptions';
import AddCaste from '../School/Masters/AddCaste/AddCaste';
import AddClass from '../School/Masters/AddClass/AddClass';
import AddDepartment from '../School/Masters/AddDepartment/AddDepartment';
import AddDesignation from '../School/Masters/AddDesignation/AddDesignation';
import AddFee from '../School/Masters/AddFee/AddFee';
import AddReceiptFormat from '../School/Masters/AddReceiptFormat/AddReceiptFormat';
import AddSection from '../School/Masters/AddSection/AddSection';
import AddSession from '../School/Masters/AddSession/AddSession';
import AddStream from '../School/Masters/AddStream/AddStream';
import AddSlider from '../School/Masters/AddSlider/AddSlider';
import FooterDetails from '../School/Masters/FooterDetails/FooterDetails';
import AddNotice from '../School/Masters/AddNotic/AddNotice';
import AddEmployee from '../School/HumanResourse/Staff/AddEmployee';
import UpdateEmployee from '../School/HumanResourse/Staff/UpdateEmployee';
import UpdateRole from '../School/HumanResourse/AssignRole/UpdateRole';
import Employee from '../School/HumanResourse/Staff/Employee';
import AddSubject from '../School/Masters/AddSubject/AddSubject';
import CommunicationTab from '../School/Student/SendSms.js/CommunicationTab';
import AttendanceTabEmployee from '../School/HumanResourse/EmpAttendance/AttendanceTab';
import CommunicationTabemp from '../School/HumanResourse/SendSmsEmp/CommunicationTab';
import SendmailToEmp from '../School/HumanResourse/SendSmsEmp/SendmailToEmp';
import Addholiday from '../School/HumanResourse/AddHoliday/Addholiday';
import Updateholiday from '../School/HumanResourse/AddHoliday/Updateholiday';
import SendEmailToStudent from '../School/Student/SendSms.js/SendEmailToStudent';

///add and update master data

import Addcast from '../School/Masters/AddCaste/Addcast';
import UpdateCaste from '../School/Masters/AddCaste/UpdateCaste';
import Addclss from '../School/Masters/AddClass/Addclss';
import UpdateClass from '../School/Masters/AddClass/UpdateClass';
import AddDepart from '../School/Masters/AddDepartment/AddDepart';
import UpdateDepart from '../School/Masters/AddDepartment/UpdateDepart';
import AddDesign from '../School/Masters/AddDesignation/AddDesign';
import UpdateDesignation from '../School/Masters/AddDesignation/UpdateDesignation';
import AddFe from '../School/Masters/AddFee/AddFe';
import UpdateFee from '../School/Masters/AddFee/UpdateFee';
import Addnote from '../School/Masters/AddNotic/Addnote';
import UpdateNotice from '../School/Masters/AddNotic/UpdateNotice';
import AddReceiFormat from '../School/Masters/AddReceiptFormat/AddReceiFormat';
import UpdateReceiptFormat from '../School/Masters/AddReceiptFormat/UpdateReceiptFormat';
import Addsec from '../School/Masters/AddSection/Addsec';
import UpdateSection from '../School/Masters/AddSection/UpdateSection';
import AddSessio from '../School/Masters/AddSession/AddSessio';
import UpdateSession from '../School/Masters/AddSession/UpdateSession';
import AddStrea from '../School/Masters/AddStream/AddStrea';
import UpdateStream from '../School/Masters/AddStream/UpdateStream';
import AddSubjec from '../School/Masters/AddSubject/AddSubjec';
import UpdateSubjec from '../School/Masters/AddSubject/UpdateSubjec';
import AddFooter from '../School/Masters/FooterDetails/AddFooter';
import UpdateFooter from '../School/Masters/FooterDetails/UpdateFooter';
import Addsliderimg from '../School/Masters/AddSlider/Addsliderimg';
import UpdateSliderImg from '../School/Masters/AddSlider/UpdateSliderImg';
import AdOtherFee from '../School/Student/OtherFee/AdOtherFee';
import UpdateOtherFee from '../School/Student/OtherFee/UpdateOtherFee';
import AdTimeTable from '../School/Student/TimeTable/AdTimeTable';
import UpdateTimeTable from '../School/Student/TimeTable/UpdateTimeTable';

///Expenses screens
import ExpensesOptions from '../School/Expenses/ExpensesOptions';
import AddExpenses from '../School/Expenses/AddExpenses/AddExpenses';
import AdExpenses from '../School/Expenses/AddExpenses/AdExpenses';
import UpdateExpenses from '../School/Expenses/AddExpenses/UpdateExpenses';

import TransferCachOnline from '../School/Expenses/CashBankTransfer/TransferCachOnline';
import TransferCaseOnline from '../School/Expenses/CashBankTransfer/TransferCaseOnline';
import UpdateTranscashOnline from '../School/Expenses/CashBankTransfer/UpdateTranscashOnline';

import Analysie from '../School/Expenses/ExpensesAnalysie/Analysie';

import ViewNotification from '../Component/Header/ViewNotification';
import ReadMore from '../Component/Header/ReadMore';
import FeeReceipt from '../School/Accounts/PrintReceipt/FeeReceipt';

///Hostel
import HosAddCategory from '../School/Hostel/HostelCategory/HosAddCategory';
import UpdateCategory from '../School/Hostel/HostelCategory/UpdateCategory';
import AddFacility from '../School/Hostel/HostelFaciliy/AddFacility';
import UpdateFacility from '../School/Hostel/HostelFaciliy/UpdateFacility';
import AdHostel from '../School/Hostel/AddHostel/AdHostel';
import UpdateHostel from '../School/Hostel/AddHostel/UpdateHostel';
import AdRooms from '../School/Hostel/AddRoom/AdRooms';
import UpdateRooms from '../School/Hostel/AddRoom/UpdateRooms';
import AddStudentInHostel from '../School/Hostel/AddStudentToHostel/AddStudentInHostel';
import Addhostel from '../School/Hostel/AddHostel/Addhostel';
import AddRoom from '../School/Hostel/AddRoom/AddRoom';
import AddStudentToHostel from '../School/Hostel/AddStudentToHostel/AddStudentToHostel';
import HostelCategory from '../School/Hostel/HostelCategory/HostelCategory';
import HostelFacility from '../School/Hostel/HostelFaciliy/HostelFacility';
import SearchHostel from '../School/Hostel/SearchHostel/SearchHostel';
import Checking from '../School/Hostel/CheckinOrCheckout/Checking';
import Checkout from '../School/Hostel/CheckinOrCheckout/Checkout';
import RoomChange from '../School/Hostel/CheckinOrCheckout/RoomChange';
import CheckinScreen from '../School/Hostel/CheckinOrCheckout/CheckinScreen';
import {primary} from '../utils/Colors';
import CheckoutScreen from '../School/Hostel/CheckinOrCheckout/CheckoutScreen';

///Transport
import AddVehicleType from '../School/Transport/VehicleType/AddVehicleType';
import UpdateVehicle from '../School/Transport/VehicleType/UpdateVehicle';
import AddNewRoute from '../School/Transport/VehicleRoute/AddNewRoute';
import UpdateRoute from '../School/Transport/VehicleRoute/UpdateRoute';
import AddNewBus from '../School/Transport/AddBus/AddNewBus';
import UpdateBus from '../School/Transport/AddBus/UpdateBus';
import AddSTInTransport from '../School/Transport/AddStudentToTransport/AddSTInTransport';
import GiveBusRemove from '../School/Transport/GiveBusOrRemove/GiveBusRemove';

///Library
import AdBook from '../School/Library/AddBook/AdBook';
import UpdateBook from '../School/Library/AddBook/UpdateBook';
import AddStudentLibrary from '../School/Library/AddStudentToSchool/AddStudentLibrary';
import IssueBookScreen from '../School/Library/IssueOrReturn/IssueBookScreen';
import ReturnBookScreen from '../School/Library/IssueOrReturn/ReturnBookScreen';

///pay roll
import AddPayRool from '../School/HumanResourse/AddPayRoll/AddPayRool';
import IdCardView from '../School/Student/IdCard/IdCardView';

import TCTab from '../School/Student/TC/TCTab';
import UpdateTC from '../School/Student/TC/UpdateTC';
import IssueTc from '../School/Student/TC/IssueTc';

import CCTab from '../School/Student/CC/CCTab';
import IssueCC from '../School/Student/CC/IssueCC';
import UpdateCC from '../School/Student/CC/UpdateCC';

///Report Screens
import AvailableRoomReport from '../School/Reports/AvailableRoomReport';
import BookReport from '../School/Reports/BookReport';
import BookReturnreport from '../School/Reports/BookReturnreport';
import IssueBookReport from '../School/Reports/IssueBookReport';
import BusAvaialbleSheets from '../School/Reports/BusAvaialbleSheets';
import BusReport from '../School/Reports/BusReport';
import FeeByMonthReport from '../School/Reports/FeeByMonthReport';
import HostelDuesFeeReport from '../School/Reports/HostelDuesFeeReport';
import HostelPaidReport from '../School/Reports/HostelPaidReport';
import OccuipiedRoomReport from '../School/Reports/OccuipiedRoomReport';
import PaidFeeReport from '../School/Reports/PaidFeeReport';
import StaffAttendanceReport from '../School/Reports/StaffAttendanceReport';
import StaffReport from '../School/Reports/StaffReport';
import StaffSalaryReport from '../School/Reports/StaffSalaryReport';
import StudentAttendanceReport from '../School/Reports/StudentAttendanceReport';
import StudentInRoom from '../School/Reports/StudentInRoom';
import StudentListReport from '../School/Reports/StudentListReport';
import StudentTestReport from '../School/Reports/StudentTestReport';
import TransDuesReport from '../School/Reports/TransDuesReport';
import TransPaidFee from '../School/Reports/TransPaidFee';
import PendingFeeReport from '../School/Reports/PendingFeeReport';

///Front Office
import AddEnquirySchool from '../School/FrontOffice/AddEnquiry/AddEnquiry';
import UpdateEnquirySchool from '../School/FrontOffice/AddEnquiry/UpdateEnquiry';
import FrontOfficeSchool from '../School/FrontOffice/AddEnquiry/FrontOffice';
import AddComplain from '../School/FrontOffice/AddComplain/AddComplain';
import Complain from '../School/FrontOffice/AddComplain/Complain';
import UpdateComplain from '../School/FrontOffice/AddComplain/UpdateComplain';
import AddVisitor from '../School/FrontOffice/AddVisitor/AddVisitor';
import Visitor from '../School/FrontOffice/AddVisitor/Visitor';
import UpdateVisitor from '../School/FrontOffice/AddVisitor/UpdateVisitor';
import FrontOfficeOptions from '../School/FrontOffice/FrontOfficeOptions';

///School and Parent
import StudentOptionsSchool from '../Student/School/StudentOptions';
import StudentOptionsCollege from '../Student/College/StudentOptions';
import StudentOptionsCoaching from '../Student/Coaching/StudentOptions';

//School
import StudentAttendance from '../Student/School/Attendance/StudentAttendance';
import StudentFee from '../Student/School/Fee/StudentFee';
import TimeTabletab from '../Student/School/TimeTbale/TimeTabletab';
import StudentTransport from '../Student/School/Transport/StudentTransport';
import StudentTest from '../Student/School/Test/StudentTest';
import StudentHostel from '../Student/School/Hostel/StudentHostel';
import StudentLibrary from '../Student/School/Library/StudentLibrary';
const Stack = createNativeStackNavigator();

function StackNavigation() {
  const [showsplash, setshowsplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setshowsplash(false);
    }, 1000);
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {showsplash && (
        <Stack.Screen name="OnBoarding" component={SplashScreen} />
      )}
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      {/* Coaching routes */}

      <Stack.Screen name="DashboardCoaching" component={DashboardCoaching} />
      <Stack.Screen name="StudentTabCoaching" component={StudentTabCoaching} />

      <Stack.Screen
        name="FrontOfficeCoaching"
        component={FrontOfficeCoaching}
      />
      <Stack.Screen name="SearchaddCoaching" component={SearchaddCoaching} />
      <Stack.Screen
        name="SearchadminssionCoaching"
        component={SearchadminssionCoaching}
      />
      <Stack.Screen
        name="TakeAdmissionCoaching"
        component={TakeAdmissionCoaching}
      />

      <Stack.Screen name="AddNewStudent" component={AddNewStudentCoaching} />

      <Stack.Screen name="AddEnquiryCoaching" component={AddEnquiryCoaching} />
      <Stack.Screen
        name="UpdateEnquiryCoaching"
        component={UpdateEnquiryCoaching}
      />
      <Stack.Screen
        name="AttendanceTabCoaching"
        component={AttendanceTabCoaching}
      />

      <Stack.Screen name="AddTestCoaching" component={AddTestCoaching} />

      <Stack.Screen name="UpdateTestCoaching" component={UpdateTestCoaching} />
      <Stack.Screen name="TestCoaching" component={TestCoaching} />

      <Stack.Screen name="ProfileCoaching" component={ProfileCoaching} />
      <Stack.Screen
        name="UpdateInstituteCoaching"
        component={UpdateInstituteCoaching}
      />
      <Stack.Screen
        name="UpdateImgaesCoaching"
        component={UpdateImgaesCoaching}
      />
      <Stack.Screen
        name="UpdateCredentialCoaching"
        component={UpdateCredentialCoaching}
      />
      <Stack.Screen
        name="UpdateCommunicationCoaching"
        component={UpdateCommunicationCoaching}
      />
      <Stack.Screen
        name="FeeCollectOptionsCoaching"
        component={FeeCollectOptionsCoaching}
      />
      <Stack.Screen name="FeeCollectOptions" component={FeeCollectOptions} />
      <Stack.Screen name="FeeCollectCoaching" component={FeeCollectCoaching} />
      <Stack.Screen
        name="AddCollectFeeCoaching"
        component={AddCollectFeeCoaching}
      />
      <Stack.Screen
        name="UpdateCollectFeeCoaching"
        component={UpdateCollectFeeCoaching}
      />
      <Stack.Screen
        name="SearchPendingFeeCoaching"
        component={SearchPendingFeeCoaching}
      />
      <Stack.Screen name="SearchPaidCoaching" component={SearchPaidCoaching} />

      <Stack.Screen
        name="HumanResourseOptionsCoaching"
        component={HumanResourseOptionsCoaching}
      />
      <Stack.Screen
        name="ReportsOptionsCoaching"
        component={ReportsOptionsCoaching}
      />

      {/* End Coching Routes */}

      {/* Start School Routes */}
      <Stack.Screen
        name="SchoolStudentOptions"
        component={SchoolStudentOptions}
      />

      <Stack.Screen name="SchoolHrOptions" component={SchoolHrOptions} />

      <Stack.Screen name="CharacterC" component={CharacterC} />
      <Stack.Screen name="AddOtherFee" component={AddOtherFee} />
      <Stack.Screen name="PCreadentials" component={PCreadentials} />
      <Stack.Screen name="SCreadentials" component={SCreadentials} />
      <Stack.Screen name="SendSms" component={SendSms} />
      <Stack.Screen name="TransferCer" component={TransferCer} />
      <Stack.Screen name="AddTimeTable" component={AddTimeTable} />
      <Stack.Screen name="ChangeSession" component={ChangeSession} />

      <Stack.Screen
        name="SchoolLibraryOptions"
        component={SchoolLibraryOptions}
      />

      <Stack.Screen
        name="SchoolHostelOptiins"
        component={SchoolHostelOptiins}
      />

      <Stack.Screen
        name="SchoolTranportOptions"
        component={SchoolTranportOptions}
      />

      <Stack.Screen name="SchoolTestOptions" component={SchoolTestOptions} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Admission" component={Admission} />
      <Stack.Screen name="AddStudent" component={AddStudent} />
      <Stack.Screen name="UpdateAdmission" component={UpdateAdmission} />
      <Stack.Screen
        name="MasterOptionsSchool"
        component={MasterOptionsSchool}
      />

      <Stack.Screen
        name="TakeAdmissionSchool"
        component={TakeAdmissionSchool}
      />

      <Stack.Screen
        name="AddNewStudentSchool"
        component={AddNewStudentSchool}
      />

      <Stack.Screen
        name="AttendanceTabSchool"
        component={AttendanceTabSchool}
      />

      <Stack.Screen name="AddTestSchool" component={AddTestSchool} />

      <Stack.Screen name="UpdateTestSchool" component={UpdateTestSchool} />
      <Stack.Screen name="TestSchool" component={TestSchool} />

      <Stack.Screen name="ProfileSchool" component={ProfileSchool} />
      <Stack.Screen
        name="UpdateInstituteSchool"
        component={UpdateInstituteSchool}
      />
      <Stack.Screen name="UpdateImgaesSchool" component={UpdateImgaesSchool} />
      <Stack.Screen
        name="UpdateCredentialSchool"
        component={UpdateCredentialSchool}
      />

      <Stack.Screen
        name="UpdateCommunicationSchool"
        component={UpdateCommunicationSchool}
      />

      <Stack.Screen name="EmployeeSchool" component={EmployeeSchool} />
      <Stack.Screen name="EmpAddholiday" component={EmpAddholiday} />
      <Stack.Screen name="EmpAssignRole" component={EmpAssignRole} />
      <Stack.Screen name="EmpAddpayroll" component={EmpAddpayroll} />
      <Stack.Screen
        name="AttendanceTabEmployee"
        component={AttendanceTabEmployee}
      />
      <Stack.Screen name="SearchAttendance" component={SearchAttendance} />
      <Stack.Screen
        name="CommunicationTabemp"
        component={CommunicationTabemp}
      />
      <Stack.Screen name="SendmailToEmp" component={SendmailToEmp} />

      <Stack.Screen name="Addhostel" component={Addhostel} />
      <Stack.Screen name="AddRoom" component={AddRoom} />
      <Stack.Screen name="AddStudentToHostel" component={AddStudentToHostel} />
      <Stack.Screen name="Checking" component={Checking} />
      <Stack.Screen name="HostelFacility" component={HostelFacility} />
      <Stack.Screen name="HostelCategory" component={HostelCategory} />
      <Stack.Screen name="SearchHostel" component={SearchHostel} />

      <Stack.Screen name="AddBook" component={AddBook} />
      <Stack.Screen
        name="AddStudentToLibrary"
        component={AddStudentToLibrary}
      />
      <Stack.Screen name="TabIssueOrReturn" component={TabIssueOrReturn} />
      <Stack.Screen name="SearchBook" component={SearchBook} />

      <Stack.Screen name="VehicleType" component={VehicleType} />
      <Stack.Screen name="AddRoute" component={AddRoute} />
      <Stack.Screen name="AddBus" component={AddBus} />
      <Stack.Screen
        name="AddStudentToTransport"
        component={AddStudentToTransport}
      />
      <Stack.Screen name="TabGiveBusOrRemove" component={TabGiveBusOrRemove} />
      <Stack.Screen name="SearchBus" component={SearchBus} />
      <Stack.Screen
        name="SendSmsToBusStudent"
        component={SendSmsToBusStudent}
      />

      <Stack.Screen name="AddCaste" component={AddCaste} />
      <Stack.Screen name="AddClass" component={AddClass} />
      <Stack.Screen name="AddDepartment" component={AddDepartment} />
      <Stack.Screen name="AddDesignation" component={AddDesignation} />
      <Stack.Screen name="AddFee" component={AddFee} />
      <Stack.Screen name="AddSection" component={AddSection} />
      <Stack.Screen name="AddSession" component={AddSession} />
      <Stack.Screen name="AddStream" component={AddStream} />
      <Stack.Screen name="AddSlider" component={AddSlider} />
      <Stack.Screen name="FooterDetails" component={FooterDetails} />
      <Stack.Screen name="AddNotice" component={AddNotice} />
      <Stack.Screen name="AddSubject" component={AddSubject} />
      <Stack.Screen name="AddReceiptFormat" component={AddReceiptFormat} />
      <Stack.Screen name="Employee" component={Employee} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
      <Stack.Screen name="UpdateEmployee" component={UpdateEmployee} />
      <Stack.Screen name="Addholidays" component={Addholiday} />
      <Stack.Screen name="Updateholiday" component={Updateholiday} />
      <Stack.Screen name="UpdateRole" component={UpdateRole} />

      {/* Add and Update master data */}

      <Stack.Screen name="AdOtherFee" component={AdOtherFee} />
      <Stack.Screen name="UpdateOtherFee" component={UpdateOtherFee} />
      <Stack.Screen name="AdTimeTable" component={AdTimeTable} />
      <Stack.Screen name="UpdateTimeTable" component={UpdateTimeTable} />
      <Stack.Screen name="Addcast" component={Addcast} />
      <Stack.Screen name="UpdateCaste" component={UpdateCaste} />
      <Stack.Screen name="Addclss" component={Addclss} />
      <Stack.Screen name="UpdateClass" component={UpdateClass} />
      <Stack.Screen name="AddDepart" component={AddDepart} />
      <Stack.Screen name="UpdateDepart" component={UpdateDepart} />
      <Stack.Screen name="AddDesign" component={AddDesign} />
      <Stack.Screen name="UpdateDesignation" component={UpdateDesignation} />
      <Stack.Screen name="AddFe" component={AddFe} />
      <Stack.Screen name="UpdateFee" component={UpdateFee} />
      <Stack.Screen name="Addnote" component={Addnote} />
      <Stack.Screen name="UpdateNotice" component={UpdateNotice} />
      <Stack.Screen name="AddReceiFormat" component={AddReceiFormat} />
      <Stack.Screen
        name="UpdateReceiptFormat"
        component={UpdateReceiptFormat}
      />
      <Stack.Screen name="Addsec" component={Addsec} />
      <Stack.Screen name="UpdateSection" component={UpdateSection} />
      <Stack.Screen name="AddSessio" component={AddSessio} />
      <Stack.Screen name="UpdateSession" component={UpdateSession} />
      <Stack.Screen name="AddStrea" component={AddStrea} />
      <Stack.Screen name="UpdateStream" component={UpdateStream} />
      <Stack.Screen name="AddSubjec" component={AddSubjec} />
      <Stack.Screen name="UpdateSubjec" component={UpdateSubjec} />
      <Stack.Screen name="AddFooter" component={AddFooter} />
      <Stack.Screen name="UpdateFooter" component={UpdateFooter} />
      <Stack.Screen name="Addsliderimg" component={Addsliderimg} />
      <Stack.Screen name="UpdateSliderImg" component={UpdateSliderImg} />
      <Stack.Screen
        name="FeeCollectOptionsSchool"
        component={FeeCollectOptionsSchool}
      />
      <Stack.Screen name="CommunicationTab" component={CommunicationTab} />
      <Stack.Screen name="SendEmailToStudent" component={SendEmailToStudent} />

      <Stack.Screen name="FeeCollectSchool" component={FeeCollectSchool} />
      <Stack.Screen name="SearchFeeTab" component={SearchFeeTab} />
      <Stack.Screen name="PrintReceipt" component={PrintReceipt} />
      <Stack.Screen
        name="AddCollectFeeSchool"
        component={AddCollectFeeSchool}
      />
      <Stack.Screen
        name="UpdateCollectFeeSchool"
        component={UpdateCollectFeeSchool}
      />
      <Stack.Screen
        name="SearchPendingFeeSchool"
        component={SearchPendingFeeSchool}
      />
      <Stack.Screen name="SearchPaidSchool" component={SearchPaidSchool} />

      <Stack.Screen
        name="ReportsOptionsSchool"
        component={ReportsOptionsSchool}
      />

      <Stack.Screen name="ExpensesOptions" component={ExpensesOptions} />
      <Stack.Screen name="AddExpenses" component={AddExpenses} />
      <Stack.Screen name="AdExpenses" component={AdExpenses} />
      <Stack.Screen name="UpdateExpenses" component={UpdateExpenses} />
      <Stack.Screen name="TransferCachOnline" component={TransferCachOnline} />
      <Stack.Screen name="TransferCaseOnline" component={TransferCaseOnline} />
      <Stack.Screen
        name="UpdateTranscashOnline"
        component={UpdateTranscashOnline}
      />
      <Stack.Screen name="Analysie" component={Analysie} />
      <Stack.Screen name="ViewNotification" component={ViewNotification} />
      <Stack.Screen name="ReadMore" component={ReadMore} />
      <Stack.Screen name="FeeReceipt" component={FeeReceipt} />
      {/* Hostel */}
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="RoomChange" component={RoomChange} />
      <Stack.Screen name="CheckinScreen" component={CheckinScreen} />
      <Stack.Screen name="AddStudentInHostel" component={AddStudentInHostel} />
      <Stack.Screen name="AdRooms" component={AdRooms} />
      <Stack.Screen name="UpdateRooms" component={UpdateRooms} />
      <Stack.Screen name="AdHostel" component={AdHostel} />
      <Stack.Screen name="UpdateHostel" component={UpdateHostel} />
      <Stack.Screen name="AddFacility" component={AddFacility} />
      <Stack.Screen name="UpdateFacility" component={UpdateFacility} />
      <Stack.Screen name="HosAddCategory" component={HosAddCategory} />
      <Stack.Screen name="UpdateCategory" component={UpdateCategory} />

      {/* Transport */}

      <Stack.Screen name="GiveBusRemove" component={GiveBusRemove} />
      <Stack.Screen name="AddSTInTransport" component={AddSTInTransport} />
      <Stack.Screen name="AddNewBus" component={AddNewBus} />
      <Stack.Screen name="UpdateBus" component={UpdateBus} />
      <Stack.Screen name="AddNewRoute" component={AddNewRoute} />
      <Stack.Screen name="UpdateRoute" component={UpdateRoute} />
      <Stack.Screen name="AddVehicleType" component={AddVehicleType} />
      <Stack.Screen name="UpdateVehicle" component={UpdateVehicle} />
      {/* Library */}

      <Stack.Screen name="CCTab" component={CCTab} />
      <Stack.Screen name="IssueCC" component={IssueCC} />
      <Stack.Screen name="UpdateCC" component={UpdateCC} />

      <Stack.Screen name="TCTab" component={TCTab} />
      <Stack.Screen name="IssueTc" component={IssueTc} />
      <Stack.Screen name="UpdateTC" component={UpdateTC} />
      <Stack.Screen name="AddPayRool" component={AddPayRool} />
      <Stack.Screen name="IdCardView" component={IdCardView} />

      <Stack.Screen name="IssueBookScreen" component={IssueBookScreen} />
      <Stack.Screen name="ReturnBookScreen" component={ReturnBookScreen} />
      <Stack.Screen name="AddStudentLibrary" component={AddStudentLibrary} />
      <Stack.Screen name="AdBook" component={AdBook} />
      <Stack.Screen name="UpdateBook" component={UpdateBook} />

      {/* reports */}
      <Stack.Screen
        name="AvailableRoomReport"
        component={AvailableRoomReport}
      />
      <Stack.Screen name="BookReport" component={BookReport} />
      <Stack.Screen name="BookReturnreport" component={BookReturnreport} />
      <Stack.Screen name="IssueBookReport" component={IssueBookReport} />
      <Stack.Screen name="BusAvaialbleSheets" component={BusAvaialbleSheets} />
      <Stack.Screen name="BusReport" component={BusReport} />
      <Stack.Screen name="FeeByMonthReport" component={FeeByMonthReport} />
      <Stack.Screen
        name="HostelDuesFeeReport"
        component={HostelDuesFeeReport}
      />
      <Stack.Screen name="HostelPaidReport" component={HostelPaidReport} />
      <Stack.Screen
        name="OccuipiedRoomReport"
        component={OccuipiedRoomReport}
      />

      <Stack.Screen name="PendingFeeReport" component={PendingFeeReport} />
      <Stack.Screen name="PaidFeeReport" component={PaidFeeReport} />
      <Stack.Screen name="StudentInRoom" component={StudentInRoom} />
      <Stack.Screen name="StudentListReport" component={StudentListReport} />
      <Stack.Screen name="StudentTestReport" component={StudentTestReport} />
      <Stack.Screen name="TransDuesReport" component={TransDuesReport} />
      <Stack.Screen name="TransPaidFee" component={TransPaidFee} />

      <Stack.Screen
        name="StaffAttendanceReport"
        component={StaffAttendanceReport}
      />
      <Stack.Screen name="StaffReport" component={StaffReport} />
      <Stack.Screen name="StaffSalaryReport" component={StaffSalaryReport} />
      <Stack.Screen
        name="StudentAttendanceReport"
        component={StudentAttendanceReport}
      />

      {/* Front Office  */}

      <Stack.Screen name="FrontOfficeOptions" component={FrontOfficeOptions} />
      <Stack.Screen name="FrontOfficeSchool" component={FrontOfficeSchool} />
      <Stack.Screen name="AddEnquirySchool" component={AddEnquirySchool} />
      <Stack.Screen
        name="UpdateEnquirySchool"
        component={UpdateEnquirySchool}
      />
      <Stack.Screen name="AddComplain" component={AddComplain} />
      <Stack.Screen name="Complain" component={Complain} />
      <Stack.Screen name="UpdateComplain" component={UpdateComplain} />
      <Stack.Screen name="AddVisitor" component={AddVisitor} />
      <Stack.Screen name="Visitor" component={Visitor} />
      <Stack.Screen name="UpdateVisitor" component={UpdateVisitor} />

      {/* Student */}
      <Stack.Screen
        name="StudentOptionsSchool"
        component={StudentOptionsSchool}
      />
      <Stack.Screen
        name="StudentOptionsCollege"
        component={StudentOptionsCollege}
      />
      <Stack.Screen
        name="StudentOptionsCoaching"
        component={StudentOptionsCoaching}
      />
      {/* Student Options */}

      <Stack.Screen name="StudentAttendance" component={StudentAttendance} />
      <Stack.Screen name="StudentFee" component={StudentFee} />
      <Stack.Screen name="TimeTabletab" component={TimeTabletab} />
      <Stack.Screen name="StudentTransport" component={StudentTransport} />
      <Stack.Screen name="StudentTest" component={StudentTest} />
      <Stack.Screen name="StudentHostel" component={StudentHostel} />
      <Stack.Screen name="StudentLibrary" component={StudentLibrary} />

      <Stack.Screen name="DashboardCollege" component={DashboardCollege} />
      <Stack.Screen name="DashboardSchool" component={DashboardSchool} />
      <Stack.Screen name="DashboardEmplyee" component={DashboardEmplyee} />
      <Stack.Screen name="DashboardStudent" component={DashboardStudent} />
      <Stack.Screen name="DashboardParent" component={DashboardParent} />
      <Stack.Screen name="DashboardOwner" component={DashboardOwner} />

      <Stack.Screen name="HelpCenter" component={HelpCenter} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
