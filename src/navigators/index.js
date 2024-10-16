import React,{useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen,
        WelcomeScreen,
        SigninScreen,
        SignupScreen,
        ForgotPasswordScreen,
        RegisterPhoneScreen,
        VerificationScreen,
        HomeScreen,
        RestaurantScreen,
        FoodScreen,
        UserProfileScreen,
        GoogleMapScreen,
     } from "../screens";
import HomeTabs from "./BottomTabs"
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { GeneralAction } from "../actions";

// Khởi tạo Stack Navigator
const Stack = createStackNavigator();

const Navigators = () => {
    const {isAppLoading, token, isFirstTimeUse} = useSelector(
      state => state?.generalState,
    );
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(GeneralAction.appStart());
    }, []);
    return(
        <NavigationContainer>
             <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !token || token === null || token === '' ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            )}
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="RegisterPhone"
              component={RegisterPhoneScreen}
            />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </>
            ) :(
                <>
                  <Stack.Screen name="HomeTabs" component={HomeTabs}/>
                  <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
                  <Stack.Screen name="Food" component={FoodScreen}/>
                  <Stack.Screen name="UserProfile" component={UserProfileScreen}/>
                  <Stack.Screen name="GoogleMap" component={GoogleMapScreen}/>
                </>
                    
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default (Navigators);