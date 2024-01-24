import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HelpCenter from '../Component/HelpCenter';
import LoginScreen from '../Auth/Login';
import SplashScreen from '../Splash/Splash';
import HomeScreen from '../Owner/Home';
import DashboardCoaching from '../Coaching/Dashboard/Dashboard';
import DashboardCollege from '../College/Dashboard/Dashboard';
import DashboardSchool from '../School/Dashboard/Dashboard';
import DashboardEmplyee from '../Employee/Dashboard/Dashboard';
import DashboardStudent from '../School/Dashboard/Dashboard';
import DashboardParent from '../Parent/Dashboard/Dashboard';
import DashboardOwner from '../Owner/Dashboard/Dashboard';
///Coaching screens

import FrontOfficeCoaching from '../Coaching/FrontOffice/FrontOffice';
import SearchEnquiryCoaching from '../Coaching/FrontOffice/SearchEnquiry';
import StudentTabCoaching from '../Coaching/Student/StudentTab';
import SearchaddCoaching from '../Coaching/Student/Add/Search';
import SearchadminssionCoaching from '../Coaching/Student/admission/Search';
import TakeAdmissionCoaching from '../Coaching/Student/admission/TakeAdmission';
import AddNewStudentCoaching from '../Coaching/Student/Add/AddNewStudent';
import AttendanceTabCoaching from '../Coaching/Attendance/AttendanceTab';
import AddEnquiryCoaching from '../Coaching/FrontOffice/AddEnquiry';
import UpdateEnquiryCoaching from '../Coaching/FrontOffice/UpdateEnquiry';
import MasterOptionsCoaching from '../Coaching/Masters/MasterOptions';
import BatchCoaching from '../Coaching/Masters/Batch/Batch';
import AddBatchCoaching from '../Coaching/Masters/Batch/AddBatch';
import UpdateBatchCoaching from '../Coaching/Masters/Batch/UpdateBatch';
import CategoryCoaching from '../Coaching/Masters/Category/Category';
import UpdatecategoryCoaching from '../Coaching/Masters/Category/Updatecategory';
import AddCatehoryCoaching from '../Coaching/Masters/Category/AddCatehory';
import AddCourseCoaching from '../Coaching/Masters/Course/AddCourse';
import UpdateCourseCoaching from '../Coaching/Masters/Course/UpdateCourse';
import CourseCoaching from '../Coaching/Masters/Course/Course';
import AddDepartmentCoaching from '../Coaching/Masters/Department/AddDepartment';
import UpdatedepartmentCoaching from '../Coaching/Masters/Department/Updatedepartment';
import DepartmentCoaching from '../Coaching/Masters/Department/Department';
import AddDesignationCoaching from '../Coaching/Masters/Designation/AddDesignation';
import DesignationCoaching from '../Coaching/Masters/Designation/Designation';
import AddDurationCoaching from '../Coaching/Masters/Duration/AddDuration';
import DurationCoaching from '../Coaching/Masters/Duration/Duration';
import AddFeesCoaching from '../Coaching/Masters/Fees/AddFees';
import FeesCoaching from '../Coaching/Masters/Fees/Fees';
import UpdateAddFeeCoaching from '../Coaching/Masters/Fees/UpdateAddFee';
import AddTestCoaching from '../Coaching/Test/AddTest';
import TestCoaching from '../Coaching/Test/Test';
import UpdateTestCoaching from '../Coaching/Test/UpdateTest';
import ProfileCoaching from '../Coaching/Profile/Profile';
import UpdateInstituteCoaching from '../Coaching/Profile/UpdateInstitute';
import UpdateCredentialCoaching from '../Coaching/Profile/UpdateCredential';
import UpdateImgaesCoaching from '../Coaching/Profile/UpdateImgaes';
import UpdateCommunicationCoaching from '../Coaching/Profile/UpdateCommunication';
import AddEmployeeCoaching from '../Coaching/HumanResourse/Staff/AddEmployee';
import SearchEmployeeCoaching from '../Coaching/HumanResourse/Staff/SearchEmployee';
import EmployeeCoaching from '../Coaching/HumanResourse/Staff/Employee';
import UpdateEmployeeCoaching from '../Coaching/HumanResourse/Staff/UpdateEmployee';
import AddCollectFeeCoaching from '../Coaching/Accounts/CollectFeee/AddCollectFee';
import UpdateCollectFeeCoaching from '../Coaching/Accounts/CollectFeee/UpdateCollectFee';
import FeeCollectCoaching from '../Coaching/Accounts/CollectFeee/FeeCollect';
import SearchPaidCoaching from '../Coaching/Accounts/PaidFee/SearchPaid';
import SearchPendingFeeCoaching from '../Coaching/Accounts/PendingFee/SearchPendingFee';
import FeeCollectOptionsCoaching from '../Coaching/Accounts/FeeCollectOptions';
import HumanResourseOptionsCoaching from '../Coaching/HumanResourse/HumanResourseOptions';
import ReportsOptionsCoaching from '../Coaching/Reports/ReportsOptions';
import UpdateDesignationCoaching from '../Coaching/Masters/Designation/UpdateDesignation';
import ReceiptPrefixCoaching from '../Coaching/Masters/ReceiptPrefix/ReceiptPrefix';
import UpdatePrefixCoaching from '../Coaching/Masters/ReceiptPrefix/UpdatePrefix';
import AddPrefixCoaching from '../Coaching/Masters/ReceiptPrefix/AddPrefix';

///School screens
import SchoolStudentOptions from '../School/Student/SchoolStudentOptions';
import SchoolAccounts from '../School/Accounts/SchoolAccounts';
import SchoolHostelOptiins from '../School/Hostel/SchoolHostelOptiins';
import SchoolLibraryOptions from '../School/Library/SchoolLibraryOptions';
import SchoolTranportOptions from '../School/Transport/SchoolTranportOptions';
import SchoolTestOptions from '../School/Test/SchoolTestOptions';
import SchoolHrOptions from '../School/HumanResourse/SchoolHrOptions';
import FrontOfficeSchool from '../School/FrontOffice/FrontOffice';
import SearchEnquirySchool from '../School/FrontOffice/SearchEnquiry';
import AddStudent from '../School/Student/Add/AddStudent';
import Add from '../School/Student/Add/Add';
import SearchaddSchool from '../School/Student/Add/Search';
import Admission from '../School/Student/admission/Admission';
import UpdateAdmission from '../School/Student/admission/UpdateAdmission';
import TakeAdmissionSchool from '../School/Student/admission/TakeAdmission';
import AddNewStudentSchool from '../School/Student/Add/AddNewStudent';
import AttendanceTabSchool from '../School/Attendance/AttendanceTab';
import AddEnquirySchool from '../School/FrontOffice/AddEnquiry';
import UpdateEnquirySchool from '../School/FrontOffice/UpdateEnquiry';
import MasterOptionsSchool from '../School/Masters/MasterOptions';
import BatchSchool from '../School/Masters/Batch/Batch';
import AddBatchSchool from '../School/Masters/Batch/AddBatch';
import UpdateBatchSchool from '../School/Masters/Batch/UpdateBatch';
import CategorySchool from '../School/Masters/Category/Category';
import UpdatecategorySchool from '../School/Masters/Category/Updatecategory';
import AddCatehorySchool from '../School/Masters/Category/AddCatehory';
import AddCourseSchool from '../School/Masters/Course/AddCourse';
import UpdateCourseSchool from '../School/Masters/Course/UpdateCourse';
import CourseSchool from '../School/Masters/Course/Course';
import AddDepartmentSchool from '../School/Masters/Department/AddDepartment';
import UpdatedepartmentSchool from '../School/Masters/Department/Updatedepartment';
import DepartmentSchool from '../School/Masters/Department/Department';
import AddDesignationSchool from '../School/Masters/Designation/AddDesignation';
import DesignationSchool from '../School/Masters/Designation/Designation';
import AddDurationSchool from '../School/Masters/Duration/AddDuration';
import DurationSchool from '../School/Masters/Duration/Duration';
import AddFeesSchool from '../School/Masters/Fees/AddFees';
import FeesSchool from '../School/Masters/Fees/Fees';
import UpdateAddFeeSchool from '../School/Masters/Fees/UpdateAddFee';
import AddTestSchool from '../School/Test/AddTest';
import TestSchool from '../School/Test/Test';
import UpdateTestSchool from '../School/Test/UpdateTest';
import ProfileSchool from '../School/Profile/Profile';
import UpdateInstituteSchool from '../School/Profile/UpdateInstitute';
import UpdateCredentialSchool from '../School/Profile/UpdateCredential';
import UpdateImgaesSchool from '../School/Profile/UpdateImgaes';
import UpdateCommunicationSchool from '../School/Profile/UpdateCommunication';
import AddEmployeeSchool from '../School/HumanResourse/Staff/AddEmployee';
import SearchEmployeeSchool from '../School/HumanResourse/Staff/SearchEmployee';
import EmployeeSchool from '../School/HumanResourse/Staff/Employee';
import UpdateEmployeeSchool from '../School/HumanResourse/Staff/UpdateEmployee';
import AddCollectFeeSchool from '../School/Accounts/CollectFeee/AddCollectFee';
import UpdateCollectFeeSchool from '../School/Accounts/CollectFeee/UpdateCollectFee';
import FeeCollectSchool from '../School/Accounts/CollectFeee/FeeCollect';
import SearchPaidSchool from '../School/Accounts/PaidFee/SearchPaid';
import SearchPendingFeeSchool from '../School/Accounts/PendingFee/SearchPendingFee';
import FeeCollectOptionsSchool from '../School/Accounts/FeeCollectOptions';
import HumanResourseOptionsSchool from '../School/HumanResourse/HumanResourseOptions';
import ReportsOptionsSchool from '../School/Reports/ReportsOptions';
import UpdateDesignationSchool from '../School/Masters/Designation/UpdateDesignation';
import ReceiptPrefixSchool from '../School/Masters/ReceiptPrefix/ReceiptPrefix';
import UpdatePrefixSchool from '../School/Masters/ReceiptPrefix/UpdatePrefix';
import AddPrefixSchool from '../School/Masters/ReceiptPrefix/AddPrefix';
import {primary} from '../utils/Colors';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  //   const dispatch = useDispatch();
  const [showsplash, setshowsplash] = useState(true);
  useEffect(() => {
    // dispatch(loadUser());
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
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
          title: 'Sign-in',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      {/* Coaching routes */}

      <Stack.Screen name="DashboardCoaching" component={DashboardCoaching} />
      <Stack.Screen name="StudentTabCoaching" component={StudentTabCoaching} />

      <Stack.Screen
        name="MasterOptionsCoaching"
        component={MasterOptionsCoaching}
      />
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
        options={{
          headerShown: true,
          title: 'Add Admission',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddNewStudent"
        component={AddNewStudentCoaching}
        options={{
          headerShown: true,
          title: 'Add New Student',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SearchEnquiryCoaching"
        component={SearchEnquiryCoaching}
        options={{
          headerShown: true,
          title: 'Search Enquiry',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AddEnquiryCoaching"
        component={AddEnquiryCoaching}
        options={{
          headerShown: true,
          title: 'Add Enquiry',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateEnquiryCoaching"
        component={UpdateEnquiryCoaching}
        options={{
          headerShown: true,
          title: 'Update Enquiry',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AttendanceTabCoaching"
        component={AttendanceTabCoaching}
      />
      <Stack.Screen
        name="AddBatchCoaching"
        component={AddBatchCoaching}
        options={{
          headerShown: true,
          title: 'Add Batch Time',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="BatchCoaching"
        component={BatchCoaching}
        options={{
          headerShown: true,
          title: 'Batch Time',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateBatchCoaching"
        component={UpdateBatchCoaching}
        options={{
          headerShown: true,
          title: 'Update Batch Time',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AddCourseCoaching"
        component={AddCourseCoaching}
        options={{
          headerShown: true,
          title: 'Add Course',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateCourseCoaching"
        component={UpdateCourseCoaching}
        options={{
          headerShown: true,
          title: 'Update Course',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="CourseCoaching"
        component={CourseCoaching}
        options={{
          headerShown: true,
          title: 'Course',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddDurationCoaching"
        component={AddDurationCoaching}
        options={{
          headerShown: true,
          title: 'Add Course Duration',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="DurationCoaching"
        component={DurationCoaching}
        options={{
          headerShown: true,
          title: 'Course Duration',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddCatehoryCoaching"
        component={AddCatehoryCoaching}
        options={{
          headerShown: true,
          title: 'Add Category',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="UpdatecategoryCoaching"
        component={UpdatecategoryCoaching}
        options={{
          headerShown: true,
          title: 'Update Category',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="CategoryCoaching"
        component={CategoryCoaching}
        options={{
          headerShown: true,
          title: 'Category',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AddFeesCoaching"
        component={AddFeesCoaching}
        options={{
          headerShown: true,
          title: 'Add Fees',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="UpdateAddFeeCoaching"
        component={UpdateAddFeeCoaching}
        options={{
          headerShown: true,
          title: 'Update Fees',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="FeesCoaching"
        component={FeesCoaching}
        options={{
          headerShown: true,
          title: 'Category',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddTestCoaching"
        component={AddTestCoaching}
        options={{
          headerShown: true,
          title: 'Add Test',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="UpdateTestCoaching"
        component={UpdateTestCoaching}
        options={{
          headerShown: true,
          title: 'Update Test',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="TestCoaching"
        component={TestCoaching}
        options={{
          headerShown: true,
          title: 'Test',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddDepartmentCoaching"
        component={AddDepartmentCoaching}
        options={{
          headerShown: true,
          title: 'Add Department',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdatedepartmentCoaching"
        component={UpdatedepartmentCoaching}
        options={{
          headerShown: true,
          title: 'Update Department',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="DepartmentCoaching"
        component={DepartmentCoaching}
        options={{
          headerShown: true,
          title: 'Department',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddDesignationCoaching"
        component={AddDesignationCoaching}
        options={{
          headerShown: true,
          title: 'Add Designation',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="DesignationCoaching"
        component={DesignationCoaching}
        options={{
          headerShown: true,
          title: 'Designation',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="ProfileCoaching" component={ProfileCoaching} />
      <Stack.Screen
        name="UpdateInstituteCoaching"
        component={UpdateInstituteCoaching}
        options={{
          headerShown: true,
          title: 'Edit Institute Details',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateImgaesCoaching"
        component={UpdateImgaesCoaching}
        options={{
          headerShown: true,
          title: 'Edit Images',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateCredentialCoaching"
        component={UpdateCredentialCoaching}
        options={{
          headerShown: true,
          title: 'Edit Credentials',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateCommunicationCoaching"
        component={UpdateCommunicationCoaching}
        options={{
          headerShown: true,
          title: 'Edit Communication Credentials ',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="EmployeeCoaching"
        component={EmployeeCoaching}
        options={{
          headerShown: true,
          title: 'Add Employee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SearchEmployeeCoaching"
        component={SearchEmployeeCoaching}
        options={{
          headerShown: true,
          title: 'Search Employee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AddEmployeeCoaching"
        component={AddEmployeeCoaching}
        options={{
          headerShown: true,
          title: 'Add Employee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="UpdateEmployeeCoaching"
        component={UpdateEmployeeCoaching}
        options={{
          headerShown: true,
          title: 'Update Employee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="FeeCollectOptionsCoaching"
        component={FeeCollectOptionsCoaching}
      />
      <Stack.Screen
        name="FeeCollectCoaching"
        component={FeeCollectCoaching}
        options={{
          headerShown: true,
          title: 'Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AddCollectFeeCoaching"
        component={AddCollectFeeCoaching}
        options={{
          headerShown: true,
          title: 'Collect Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateCollectFeeCoaching"
        component={UpdateCollectFeeCoaching}
        options={{
          headerShown: true,
          title: 'Update Collect Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SearchPendingFeeCoaching"
        component={SearchPendingFeeCoaching}
        options={{
          headerShown: true,
          title: 'Search Pending Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SearchPaidCoaching"
        component={SearchPaidCoaching}
        options={{
          headerShown: true,
          title: 'Search Paid Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateDesignationCoaching"
        component={UpdateDesignationCoaching}
        options={{
          headerShown: true,
          title: 'Update Designation',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ReceiptPrefixCoaching"
        component={ReceiptPrefixCoaching}
        options={{
          headerShown: true,
          title: 'Receipt Prefix',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdatePrefixCoaching"
        component={UpdatePrefixCoaching}
        options={{
          headerShown: true,
          title: 'Receipt Prefix',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddPrefixCoaching"
        component={AddPrefixCoaching}
        options={{
          headerShown: true,
          title: 'Receipt Prefix',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
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

      <Stack.Screen name="SchoolAccounts" component={SchoolAccounts} />

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
      <Stack.Screen name="FrontOfficeSchool" component={FrontOfficeSchool} />
      <Stack.Screen name="SearchaddSchool" component={SearchaddSchool} />

      <Stack.Screen
        name="TakeAdmissionSchool"
        component={TakeAdmissionSchool}
      />

      <Stack.Screen
        name="AddNewStudentSchool"
        component={AddNewStudentSchool}
      />
      <Stack.Screen
        name="SearchEnquirySchool"
        component={SearchEnquirySchool}
      />
      <Stack.Screen name="AddEnquirySchool" component={AddEnquirySchool} />
      <Stack.Screen
        name="UpdateEnquirySchool"
        component={UpdateEnquirySchool}
      />
      <Stack.Screen
        name="AttendanceTabSchool"
        component={AttendanceTabSchool}
      />
      <Stack.Screen name="AddBatchSchool" component={AddBatchSchool} />
      <Stack.Screen
        name="BatchSchool"
        component={BatchSchool}
        options={{
          headerShown: true,
          title: 'Batch Time',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateBatchSchool"
        component={UpdateBatchSchool}
        options={{
          headerShown: true,
          title: 'Update Batch Time',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AddCourseSchool"
        component={AddCourseSchool}
        options={{
          headerShown: true,
          title: 'Add Course',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateCourseSchool"
        component={UpdateCourseSchool}
        options={{
          headerShown: true,
          title: 'Update Course',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="CourseSchool"
        component={CourseSchool}
        options={{
          headerShown: true,
          title: 'Course',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddDurationSchool"
        component={AddDurationSchool}
        options={{
          headerShown: true,
          title: 'Add Course Duration',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="DurationSchool"
        component={DurationSchool}
        options={{
          headerShown: true,
          title: 'Course Duration',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddCatehorySchool"
        component={AddCatehorySchool}
        options={{
          headerShown: true,
          title: 'Add Category',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="UpdatecategorySchool"
        component={UpdatecategorySchool}
        options={{
          headerShown: true,
          title: 'Update Category',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="CategorySchool"
        component={CategorySchool}
        options={{
          headerShown: true,
          title: 'Category',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AddFeesSchool"
        component={AddFeesSchool}
        options={{
          headerShown: true,
          title: 'Add Fees',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="UpdateAddFeeSchool"
        component={UpdateAddFeeSchool}
        options={{
          headerShown: true,
          title: 'Update Fees',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="FeesSchool"
        component={FeesSchool}
        options={{
          headerShown: true,
          title: 'Category',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddTestSchool"
        component={AddTestSchool}
        options={{
          headerShown: true,
          title: 'Add Test',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="UpdateTestSchool"
        component={UpdateTestSchool}
        options={{
          headerShown: true,
          title: 'Update Test',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="TestSchool"
        component={TestSchool}
        options={{
          headerShown: true,
          title: 'Test',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddDepartmentSchool"
        component={AddDepartmentSchool}
        options={{
          headerShown: true,
          title: 'Add Department',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdatedepartmentSchool"
        component={UpdatedepartmentSchool}
        options={{
          headerShown: true,
          title: 'Update Department',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="DepartmentSchool"
        component={DepartmentSchool}
        options={{
          headerShown: true,
          title: 'Department',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddDesignationSchool"
        component={AddDesignationSchool}
        options={{
          headerShown: true,
          title: 'Add Designation',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="DesignationSchool"
        component={DesignationSchool}
        options={{
          headerShown: true,
          title: 'Designation',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="ProfileSchool" component={ProfileSchool} />
      <Stack.Screen
        name="UpdateInstituteSchool"
        component={UpdateInstituteSchool}
        options={{
          headerShown: true,
          title: 'Edit Institute Details',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateImgaesSchool"
        component={UpdateImgaesSchool}
        options={{
          headerShown: true,
          title: 'Edit Images',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateCredentialSchool"
        component={UpdateCredentialSchool}
        options={{
          headerShown: true,
          title: 'Edit Credentials',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateCommunicationSchool"
        component={UpdateCommunicationSchool}
        options={{
          headerShown: true,
          title: 'Edit Communication Credentials ',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="EmployeeSchool"
        component={EmployeeSchool}
        options={{
          headerShown: true,
          title: 'Add Employee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SearchEmployeeSchool"
        component={SearchEmployeeSchool}
        options={{
          headerShown: true,
          title: 'Search Employee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AddEmployeeSchool"
        component={AddEmployeeSchool}
        options={{
          headerShown: true,
          title: 'Add Employee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="UpdateEmployeeSchool"
        component={UpdateEmployeeSchool}
        options={{
          headerShown: true,
          title: 'Update Employee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="FeeCollectOptionsSchool"
        component={FeeCollectOptionsSchool}
      />
      <Stack.Screen
        name="FeeCollectSchool"
        component={FeeCollectSchool}
        options={{
          headerShown: true,
          title: 'Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="AddCollectFeeSchool"
        component={AddCollectFeeSchool}
        options={{
          headerShown: true,
          title: 'Collect Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateCollectFeeSchool"
        component={UpdateCollectFeeSchool}
        options={{
          headerShown: true,
          title: 'Update Collect Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SearchPendingFeeSchool"
        component={SearchPendingFeeSchool}
        options={{
          headerShown: true,
          title: 'Search Pending Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SearchPaidSchool"
        component={SearchPaidSchool}
        options={{
          headerShown: true,
          title: 'Search Paid Fee',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdateDesignationSchool"
        component={UpdateDesignationSchool}
        options={{
          headerShown: true,
          title: 'Update Designation',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ReceiptPrefixSchool"
        component={ReceiptPrefixSchool}
        options={{
          headerShown: true,
          title: 'Receipt Prefix',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UpdatePrefixSchool"
        component={UpdatePrefixSchool}
        options={{
          headerShown: true,
          title: 'Receipt Prefix',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AddPrefixSchool"
        component={AddPrefixSchool}
        options={{
          headerShown: true,
          title: 'Receipt Prefix',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="ReportsOptionsSchool"
        component={ReportsOptionsSchool}
      />

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
