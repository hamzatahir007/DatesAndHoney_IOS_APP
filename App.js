import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import MyStack from './src/view/navigation/navigation';
import store from './redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';

//pk_test_51NqAXdDYlVq1hwGLZCMYn0syTpXCPvkQ3n1TwbrS6pDYAOQjVIEjFjqLHBWcXAFPNAVJnIZobL53stVKLVmxymFF00qhQLUtWT

const App = () => {
  return (
    <StripeProvider
      publishableKey={'pk_live_51NSEnYKK582q5wyAXZvmsElHHqPLAgqGckDA6hB56kmzGcc2mQhztlKFLCPr4WFedryOQphLPzD1DlAgqawX8UHe00CFeb967F'}
    >
      <Provider store={store}>
        <MyStack />
      </Provider>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
