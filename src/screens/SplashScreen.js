import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'
import React,{useEffect} from 'react'
import { Color, images,Fonts } from '../contants'
import { Display } from '../utils'
const SplashScreen = ({navigation}) => {

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('Welcome');
    },2000);
  },[])

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" 
        backgroundColor={Color.DEFAULT_GREEN}
        translucent
        />
        <Image
            source={images.PLATE}
            resizeMode="contain"
            style={styles.image}
        />
      <Text style={styles.titleText}>FoodDelivery</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.DEFAULT_GREEN,
    },
    image:{
        height:Display.setHeight(30),
        width:Display.setWidth(60),
    },
    titleText:{
        color:Color.DEFAULT_WHITE,
        fontSize:32,
        // fontWeight:'bold',
        fontFamily:Fonts.POPPINS_LIGHT,
    },
})