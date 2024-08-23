import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreenTemplate from './screens/onboardingScreens/OnboardingScreenTemplate';
import ProductHomePage from './screens/products/ProductHomePage';
import SignUp from './screens/auth/SignUp';
import Login from './screens/auth/Login';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="OnboardingScreenTemplate"
              component={OnboardingScreenTemplate}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductHomePage"
              component={ProductHomePage}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
