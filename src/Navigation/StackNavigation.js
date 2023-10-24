import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Auth/Login';
import SplashScreen from '../Splash/Splash';
import HomeScreen from '../Owner/Home';
import DrawerNavigation from './DrawerNavigation';
import DashboardCoaching from '../Coaching/Dashboard/Dashboard';
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
import DashboardCollege from '../College/Dashboard/Dashboard';
import DashboardSchool from '../School/Dashboard/Dashboard';
import DashboardEmplyee from '../Employee/Dashboard/Dashboard';
import DashboardStudent from '../School/Dashboard/Dashboard';
import DashboardParent from '../Parent/Dashboard/Dashboard';
import DashboardOwner from '../Owner/Dashboard/Dashboard';
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
      <Stack.Screen name="DashboardCollege" component={DashboardCollege} />
      <Stack.Screen name="DashboardSchool" component={DashboardSchool} />
      <Stack.Screen name="DashboardEmplyee" component={DashboardEmplyee} />
      <Stack.Screen name="DashboardStudent" component={DashboardStudent} />
      <Stack.Screen name="DashboardParent" component={DashboardParent} />
      <Stack.Screen name="DashboardOwner" component={DashboardOwner} />
      <Stack.Screen name="drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
