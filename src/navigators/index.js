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
     } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { GeneralAction } from "../actions";

// Khởi tạo Stack Navigator
const Stack = createStackNavigator();

const Navigators =() =>{
    const {isApploading, token, isFirstTimeUse}= useSelector(
        state => state?.generalState,
    );
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GeneralAction.appStart())
    },[])
    console.log(token);
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                {
                    isApploading? (
                        <Stack.Screen name="Splash" component={SplashScreen}/>
                    ):!token || token ===null || token==='' ? (
                        <>
                        {isFirstTimeUse && (
                            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                        )}
                       
                        <Stack.Screen name="Signin" component={SigninScreen}/>
                        <Stack.Screen name="Signup" component={SignupScreen}/>
                        <Stack.Screen 
                            name="Forgot" 
                            component={ForgotPasswordScreen}
                        />
                        <Stack.Screen
                            name="Register" 
                            component={RegisterPhoneScreen}
                        />
                        <Stack.Screen name="Verification" component={VerificationScreen}/>
                        </>

                    ) :(
                    <Stack.Screen name="Home" component={HomeScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default (Navigators);