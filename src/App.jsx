import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider, useDispatch} from 'react-redux';
import store from './redux/store';
import NavigationStack from './NavigationStacks';
import Toast from 'react-native-toast-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {setDispatch} from './app/api/AuthApiManager';

const AppWrapper = () => {
  const dispatch = useDispatch();

  // Set the dispatch function for global access
  useEffect(() => {
    setDispatch(dispatch);
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationStack />
      <Toast />
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppWrapper />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
