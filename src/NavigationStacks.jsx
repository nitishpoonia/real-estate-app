import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import OnboardingScreenTemplate from './screens/onboardingScreens/OnboardingScreenTemplate';
import ProductHomePage from './screens/products/ProductHomePage';
import SignUp from './screens/auth/SignUp';
import Login from './screens/auth/Login';
import LoadingScreen from './components/LoadingScreen';
import UserProfile from './screens/UserProfile';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import SupportScreen from './screens/SupportScreen';
import ProductDetailPage from './screens/products/ProductDetailPage';
import BookingForm from './screens/products/BookingForm';
import ViewAllImages from './screens/products/ViewAllImages';
import SearchScreen from './screens/SearchScreen';
import BasicProperties from './components/properties/BasicProperties';
import {checkLoggedIn} from './redux/slices/auth/authActions';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
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
        name="OnboardingScreenTemplate"
        component={OnboardingScreenTemplate}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductHomePage"
        component={ProductHomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetailPage"
        component={ProductDetailPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookingForm"
        component={BookingForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewAllImages"
        component={ViewAllImages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BasicProperties"
        component={BasicProperties}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';

        return {
          tabBarStyle: (() => {
            switch (routeName) {
              case 'SupportScreen':
                return {display: 'none'};
              case 'ProductDetailPage':
                return {display: 'none'};
              case 'BookingForm':
                return {display: 'none'};
              default:
                return {display: 'flex'};
            }
          })(),
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Icon name={iconName} size={size} color={'#003366'} />;
          },
          tabBarActiveTintColor: '#003366',
          tabBarInactiveTintColor: 'gray',
        };
      }}>
      <Tab.Screen
        name="Home"
        component={ProductStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={SupportStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
const SupportStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SupportScreen"
        component={SupportScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const NavigationStacks = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, loading} = useSelector(state => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkLoggedIn());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainApp /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationStacks;
