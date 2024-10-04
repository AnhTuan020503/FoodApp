import { StyleSheet, Text, View,StatusBar,TouchableOpacity,Image,TextInput } from 'react-native'
import React,{useState} from 'react'
import { Display } from '../utils'
import { Fonts,Color,images } from '../contants'
import { Separator } from '../components'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
const ForgotPasswordScreen = ({navigation}) => {
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
            <Text style={styles.headerTitle}>Forget Password</Text>
      </View>
      <Text style={styles.title}>Forget Password</Text>
        <Text style={styles.content}>Please Enter Your Mail We Can Help You Recover Your Password</Text>
        <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
            <Feather 
                name="mail"
                size={22}
                color={Color.DEFAULT_GREY}
                style={{margnRight :10}}
            />
            <TextInput  
                placeholder="Enter your email"
                placeholderTextColor={Color.DEFAULT_GREY}
                selectionColor={Color.DEFAULT_GREY}
                style={styles.inputText}
            />
        </View>
      </View>
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ForgotPasswordScreen

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
        fontSize:15,
        fontFamily:Fonts.POPPINS_THIN,
        marginTop:10,
        marginBottom:80,
        marginHorizontal:20,
        opacity:0.4,
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