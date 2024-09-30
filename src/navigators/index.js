import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";

// Khởi tạo Stack Navigator
const Stack = createStackNavigator();
const Navigators =() =>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Splash" component={SplashScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigators;