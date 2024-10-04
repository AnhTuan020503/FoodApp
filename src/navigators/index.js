import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen,
        WelcomeScreen,
        SigninScreen,
        SignupScreen,
        ForgotPasswordScreen,
        RegisterPhoneScreen,
        VerificationScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";

// Khởi tạo Stack Navigator
const Stack = createStackNavigator();
const Navigators =() =>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Splash" component={SplashScreen}/>
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="Signin" component={SigninScreen}/>
                <Stack.Screen name="Signup" component={SignupScreen}/>
                <Stack.Screen name="Forgot" component={ForgotPasswordScreen}/>
                <Stack.Screen name="Register" component={RegisterPhoneScreen}/>
                <Stack.Screen name="Verification" component={VerificationScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigators;