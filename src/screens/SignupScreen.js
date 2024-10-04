import { StyleSheet, Text, View,StatusBar,TextInput,TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import { Color,Fonts,images } from '../contants'
import { Separator } from '../components'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Display } from '../utils'
import Feather from "react-native-vector-icons/Feather"


const SignupScreen = ({navigation}) => {
    const [isPasswordShow, setIsPasswordShow] =useState(false);
  return (
    <View style={styles.container}>
        <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Color.DEFAULT_WHITE}
        translucent
        />
      <Separator
        height={StatusBar.currentHeight}
      />
      <View style={styles.headerContainer}>
            <Ionicons name="chevron-back" 
                size={30} onPress={()=> 
                navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Sign up</Text>
      </View>
      <Text style={styles.title}>Create Account</Text>
        <Text style={styles.content}>Enter your username and password, and enjoy ordering food</Text>
        <Text 
            style={styles.signuptext}
            onPress={()=> navigation.navigate('Signin')}>
            Already have account?
        </Text>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
            <Feather 
                name="user"
                size={22}
                color={Color.DEFAULT_GREY}
                style={{margnRight :10}}
            />
            <TextInput  
                placeholder="Username"
                placeholderTextColor={Color.DEFAULT_GREY}
                selectionColor={Color.DEFAULT_GREY}
                style={styles.inputText}
            />
        </View>
      </View>
      <Separator height={15}/>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
            <Feather 
                name="mail"
                size={22}
                color={Color.DEFAULT_GREY}
                style={{margnRight :10}}
            />
            <TextInput  
                placeholder="Email Address"
                placeholderTextColor={Color.DEFAULT_GREY}
                selectionColor={Color.DEFAULT_GREY}
                style={styles.inputText}
            />
        </View>
      </View>
      <Separator height={15}/>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
            <Feather 
                name="lock"
                size={22}
                color={Color.DEFAULT_GREY}
                style={{margnRight :10}}
            />
            <TextInput 
                secureTextEntry={isPasswordShow ? false : true}
                placeholder="Password"
                placeholderTextColor={Color.DEFAULT_GREY}
                selectionColor={Color.DEFAULT_GREY}
                style={styles.inputText}
            />
            <Feather 
                name={isPasswordShow ? 'eye' : 'eye-off'}
                size={22}
                color={Color.DEFAULT_GREY}
                style={{margnRight :10}}
                onPress={()=> setIsPasswordShow(!isPasswordShow)}
            />
        </View>
      </View>
      <TouchableOpacity style={styles.signinButton} 
                onPress={()=> navigation.navigate('Register')}>
        <Text style={styles.signinButtonText}>Create Account</Text>
      </TouchableOpacity>
      <Separator height={15}/>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonContainer}>
            <View style={styles.signinButtonLogoContainer}>
                <Image source={images.FACEBOOK}
                    style={styles.signinButtonLogo}
                />
            </View>
            <Text style={styles.socialSigninButtonText}>Connect with FaceBook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonContainer}>
            <View style={styles.signinButtonLogoContainer}>
                <Image source={images.GOOGLE}
                    style={styles.signinButtonLogo}
                />
            </View>
            <Text style={styles.socialSigninButtonText}>Connect with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Color.DEFAULT_WHITE,
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:20,
        marginTop:40,
    },
    headerTitle:{
        fontSize:20,
        fontFamily:Fonts.POPPINS_MEDIUM,
        lineHeight:16*1.4,
        width:Display.setWidth(40),
        textAlign:'center',
    },
    title:{
        fontSize:20,
        fontFamily:Fonts.POPPINS_MEDIUM,
        lineHeight:20*1.4,
        marginTop:50,
        marginBottom:10,
        marginHorizontal:20,
    },
    content:{
        fontSize:20,
        fontFamily:Fonts.POPPINS_MEDIUM,
        marginTop:10,
        marginBottom:20,
        marginHorizontal:20,
    },
    inputContainer:{
        backgroundColor:Color.LIGHT_GREY,
        paddingHorizontal:20,
        marginHorizontal:20,
        borderRadius:8,
        borderWidth:0.5,
        borderColor:Color.LIGHT_GREY2,
        justifyContent:'center',
    },
    inputSubContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    inputText:{
        fontSize:18,
        textAlignVertical:'center',
        padding:0,
        height:Display.setHeight(6),
        color:Color.DEFAULT_BLACK,
        flex:1,
    },
    signinButton:{
        backgroundColor:Color.DEFAULT_GREEN,
        borderRadius:8,
        marginHorizontal:20,
        height:Display.setHeight(6),
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18*1.4,
        color:Color.DEFAULT_WHITE,
        fontFamily:Fonts.POPPINS_MEDIUM,
    },
    orText:{
        fontSize:15,
        lineHeight:15*1.4,
        color:Color.DEFAULT_BLACK,
        fontFamily:Fonts.POPPINS_MEDIUM,
        marginLeft:5,
        alignSelf:'center',
    },
    facebookButton:{
        backgroundColor:Color.FABEBOOK_BLUE,
        paddingVertical:15,
        marginHorizontal:20,
        borderRadius:8,
        marginVertical:20,
        justifyContent:'center',
        alignItems:'center',
    },
    googleButton:{
        backgroundColor:Color.GOOGLE_BLUE,
        paddingVertical:15,
        marginHorizontal:20,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
    },
    signinButtonLogo:{
        height:18,
        width:18,
    },
    signinButtonLogoContainer:{
        backgroundColor:Color.DEFAULT_WHITE,
        padding:2,
        borderRadius:3,
        position:'absolute',
        left:25,
    },
    socialButtonContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
    },
    socialSigninButtonText:{
        color:Color.DEFAULT_WHITE,
        fontSize:13,
        lineHeight:13*1.4,
        fontFamily:Fonts.POPPINS_MEDIUM,
    },
    signuptext:{
        fontSize:13,
        lineHeight:13*1.4,
        color:Color.DEFAULT_GREEN,
        fontFamily:Fonts.POPPINS_MEDIUM,
        marginHorizontal:15,
        marginVertical:20,
    },
})