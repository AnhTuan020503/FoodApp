import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen,WelcomeScreen,SigninScreen } from "../screens";
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigators;