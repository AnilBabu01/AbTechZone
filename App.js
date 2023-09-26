import React from 'react';
import AppNavigation from './src/Navigation/AppNavigation';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
export default function App() {
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: props => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'pink', width: '95%'}}
        contentContainerStyle={{paddingHorizontal: 12}}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: props => (
      <ErrorToast
        {...props}
        style={{width: '95%'}}
        contentContainerStyle={{paddingHorizontal: 12}}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };

  return (
    <>
      {/* <Provider store={store}>
        <AppNavigation />
      </Provider> */}
         <AppNavigation />
      <Toast config={toastConfig} />
    </>
  );
}
