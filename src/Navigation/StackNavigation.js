import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Auth/Login';
import SplashScreen from '../Splash/Splash';
import HomeScreen from '../Owner/Home';
import DrawerNavigation from '../Navigation/DrawerNavigation';
import DashboardCoaching from '../Coaching/Dashboard/Dashboard';
import FrontOfficeCoaching from '../Coaching/FrontOffice/FrontOffice';
import SearchEnquiryCoaching from '../Coaching/FrontOffice/SearchEnquiry';
import StudentTabCoaching from '../Coaching//Student/StudentTab';
import SearchaddCoaching from '../Coaching/Student/Add/Search';
import SearchadminssionCoaching from '../Coaching/Student/admission/Search';
import TakeAdmissionCoaching from '../Coaching/Student/admission/TakeAdmission';
import AddNewStudentCoaching from '../Coaching/Student/Add/AddNewStudent';
import AttendanceTabCoaching from '../Coaching/Attendance/AttendanceTab';
import AddEnquiryCoaching from '../Coaching/FrontOffice/AddEnquiry';
import MasterOptionsCoaching from '../Coaching/Masters/MasterOptions';
import BatchCoaching from '../Coaching/Masters/Batch/Batch';
import AddBatchCoaching from '../Coaching/Masters/Batch/AddBatch';
import CategoryCoaching from '../Coaching/Masters/Category/Category';
import AddCatehoryCoaching from '../Coaching/Masters/Category/AddCatehory';
import AddCourseCoaching from '../Coaching/Masters/Course/AddCourse';
import CourseCoaching from '../Coaching/Masters/Course/Course';
import AddDepartmentCoaching from '../Coaching/Masters/Department/AddDepartment';
import DepartmentCoaching from '../Coaching/Masters/Department/Department';
import AddDesignationCoaching from '../Coaching/Masters/Designation/AddDesignation';
import DesignationCoaching from '../Coaching/Masters/Designation/Designation';
import AddDurationCoaching from '../Coaching/Masters/Duration/AddDuration';
import DurationCoaching from '../Coaching/Masters/Duration/Duration';
import AddFeesCoaching from '../Coaching/Masters/Fees/AddFees';
import FeesCoaching from '../Coaching/Masters/Fees/Fees';
import Fees from '../Coaching/Masters/Fees/Fees';
import ProfileCoaching from '../Coaching/Profile/Profile';
import UpdateInstituteCoaching from '../Coaching/Profile/UpdateInstitute';
import UpdateCredentialCoaching from '../Coaching/Profile/UpdateCredential';
import UpdateImgaesCoaching from '../Coaching/Profile/UpdateImgaes';
import UpdateCommunicationCoaching from '../Coaching/Profile/UpdateCommunication';
import FeeCollectCoaching from '../Coaching/Accounts/FeeCollect';
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
      <Stack.Screen name="Login" component={LoginScreen} />
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
      <Stack.Screen name="FeeCollectCoaching" component={FeeCollectCoaching} />
      <Stack.Screen name="drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
