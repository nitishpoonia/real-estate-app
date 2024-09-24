import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import OnboardingScreenTemplate from './screens/onboardingScreens/OnboardingScreenTemplate';
import ProductHomePage from './screens/products/ProductHomePage';
import SignUp from './screens/auth/SignUp';
import Login from './screens/auth/Login';
import LoadingScreen from './components/LoadingScreen';
import UserProfile from './screens/UserProfile/UserProfile';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import SupportScreen from './screens/SupportScreen';
import ProductDetailPage from './screens/products/ProductDetailPage';
import BookingForm from './screens/products/BookingForm';
import ViewAllImages from './screens/products/ViewAllImages';
import SearchScreen from './screens/search/SearchScreen';
import BasicProperties from './components/properties/BasicProperties';
import {checkLoggedIn} from './redux/slices/auth/authActions';
import ApScreen1 from './screens/addProduct/ApScreen1';
import EditUserProfile from './screens/UserProfile/EditUserProfile';
import WelcomeScreen from './screens/auth/WelcomeScreen';
import GeneralDetails from './screens/addProduct/GeneralDetails';
import PropertySpecification from './screens/addProduct/PropertySpecification';
import PropertyImages from './screens/addProduct/PropertyImages';
import ReviewDetails from './screens/addProduct/ReviewDetails';
import SearchCity from './screens/addProduct/SearchCity';
import ListedProperties from './screens/products/ListedProperties';
import SavedProperties from './screens/products/SavedProperties';
import ResetPassword from './screens/auth/ResetPassword';
// import UserTypeSelectionPage from './screens/UserTypeSelectionPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardingScreenTemplate">
      {/* <Stack.Screen
        name="OnboardingScreenTemplate"
        component={OnboardingScreenTemplate}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const ProductStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="UserTypeSelectionPage"
        component={UserTypeSelectionPage}
        options={{headerShown: false}}
      /> */}
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

const AddProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ApScreen1"
        component={ApScreen1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GeneralDetails"
        component={GeneralDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PropertySpecification"
        component={PropertySpecification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PropertyImages"
        component={PropertyImages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchCity"
        component={SearchCity}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewDetails"
        component={ReviewDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        // Get the name of the focused route
        const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
        const shouldHideTabBar = () => {
          const hideRoutes = [
            'SupportScreen',
            'ProductDetailPage',
            'BookingForm',
            'UserTypeSelectionPage',
            'ListedProperties',
          ];
          return hideRoutes.includes(routeName);
        };

        return {
          tabBarStyle: {
            display: shouldHideTabBar() ? 'none' : 'flex',
          },
          // Tab icon and other settings
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'AddProduct') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
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
        name="AddProduct"
        component={AddProductStack}
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
      <Stack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListedProperties"
        component={ListedProperties}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SavedProperties"
        component={SavedProperties}
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

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainApp /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationStacks;
