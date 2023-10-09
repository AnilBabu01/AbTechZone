import React from 'react';
import AppNavigation from './src/Navigation/AppNavigation';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/redux/store';
export default function App() {
  const toastConfig = {
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
      <Provider store={store}>
        <PaperProvider>
          <AppNavigation />
        </PaperProvider>
      </Provider>

      <Toast config={toastConfig} />
    </>
  );
}
