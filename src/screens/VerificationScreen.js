import { StyleSheet, Text, View,StatusBar,TextInput,TouchableOpacity } from 'react-native'
import React,{useRef, useState}from 'react'
import { Separator } from '../components'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Display } from '../utils'
import { Color,Fonts,CountryCode } from '../contants'


const VerificationScreen = ({route: 
    {params: {phoneNumber},

    },navigation

}) => {
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [otp, setOtp] = useState({1: '', 2: '', 3: '',4: ''})
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
            <Text style={styles.headerTitle}>OTP Verification</Text>
      </View>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.content}>Enter the OTP number just sent you at{' '}
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
            <TextInput 
                style={styles.otpText}
                keyboardType='number-pad'
                maxLength={1}
                ref={firstInput}
                onChangeText={(text)=> {
                    setOtp({...otp, 1: text})
                    text && secondInput.current.focus() 
                }}
            />
        </View>
        <View style={styles.otpBox}>
            <TextInput 
                style={styles.otpText}
                keyboardType='number-pad'
                maxLength={1}
                ref={secondInput}
                onChangeText={(text)=> {
                    setOtp({...otp, 2: text})
                    text ? thirdInput.current.focus() : firstInput.current.focus();
                }}
            />
        </View>
        <View style={styles.otpBox}>
            <TextInput 
                style={styles.otpText}
                keyboardType='number-pad'
                maxLength={1}
                ref={thirdInput}
                onChangeText={(text)=> {
                    setOtp({...otp, 3: text})
                    text && fourthInput.current.focus() 
                }}
            />
        </View>
        <View style={styles.otpBox}>
            <TextInput
                style={styles.otpText}
                keyboardType='number-pad'
                maxLength={1}
                ref={fourthInput}
                onChangeText={(text)=> {
                    setOtp({...otp, 4: text})
                    !text && thirdInput.current.focus() 
                }}
            />
        </View>
      </View>
      <TouchableOpacity style={styles.resetButton}
         onPress={() => console.log(otp)}>
        <Text style={styles.resetButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default VerificationScreen

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
        fontSize:25,
        fontFamily:Fonts.POPPINS_MEDIUM,
        lineHeight:20*1.4,
        marginTop:50,
        marginBottom:10,
        marginHorizontal:20,
      },
      content:{
        fontSize:25,
        fontFamily:Fonts.POPPINS_THIN,
        marginTop:10,
        marginBottom:80,
        marginHorizontal:20,
        
    },
    phoneNumberText:{
        fontSize: 18,
        fontFamily: Fonts.POPPINS_REGULAR,
        lineHeight : 18 * 1.4,
        color:Color.DEFAULT_YELLOW,
    },
    otpContainer:{
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
    },
    otpBox:{
        borderRadius:8,
        borderColor:Color.DEFAULT_GREEN,
        borderWidth:0.5,
    },
    otpText:{
        fontSize:25,
        color:Color.DEFAULT_BLACK,
        padding:0,
        textAlign:'center',
        paddingHorizontal :18,
        paddingVertical: 10,
    },
    resetButton:{
        backgroundColor:Color.DEFAULT_GREEN,
        borderRadius:8,
        marginHorizontal:20,
        height:Display.setHeight(6),
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    resetButtonText:{
        fontSize:18,
        lineHeight:18*1.4,
        color:Color.DEFAULT_WHITE,
        fontFamily:Fonts.POPPINS_MEDIUM,
    },
})