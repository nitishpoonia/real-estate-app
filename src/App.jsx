import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreenTemplate from './screens/onboardingScreens/OnboardingScreenTemplate';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen
              name="OnboardingScreenTemplate"
              component={OnboardingScreenTemplate}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
