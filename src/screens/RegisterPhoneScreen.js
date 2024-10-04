import { StyleSheet, Text, View,StatusBar,TextInput,TouchableOpacity,Image,FlatList } from 'react-native'
import React,{useState} from 'react'
import { Color,Fonts,CountryCode } from '../contants'
import { FlagItem, Separator } from '../components'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Display } from '../utils'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { StaticImageService } from '../services'

const getDropdownStyle = y => ({...styles.countryDropdown, top: y +60});

const RegisterPhoneScreen = ({navigation}) => {
  const [selectedCountry,setSelectedCountry]=useState(CountryCode.find(country =>country.name === 'Viet Nam'),
);
  const [inputsContainerY,setInputsContainerY]=useState(0);
  const [isDropdownOpen,setIsDropdownOpen] = useState(false)
  const [dropdownLayout,setDropdownLayout] = useState({})
  const [phoneNumber,setPhoneNumber]= useState("");

  const closeDropdown = (pageX, pageY) => {
    if(isDropdownOpen){
      if(pageX < dropdownLayout?.x || pageX > dropdownLayout?.x + dropdownLayout?.width
        || pageY < dropdownLayout?.y || pageY > dropdownLayout?.y + dropdownLayout?.height)
        {
          setIsDropdownOpen(false);
        }
    }
  }
  return (
    <View style={styles.container} 
          onStartShouldSetResponder={({nativeEvent:{pageX, pageY}}) => 
          closeDropdown(pageX, pageY)}>
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
            <Text style={styles.headerTitle}>Login into Food App</Text>
      </View>
      <Text style={styles.title}>Register Phone</Text>
      <Text style={styles.content}>Enter your registered phone number to log in</Text>
      <View style={styles.inputsContainer} 
            onLayout={({nativeEvent:{layout:{y},
            },
          }) => setInputsContainerY(y)
          }>
        <TouchableOpacity   
          style={styles.countryListContainer}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Image 
              source={{uri: StaticImageService.getFlagIcon(selectedCountry.code)}}
              style={styles.flatIcon}
          />
          <Text style={styles.countryCodeText}>
            {selectedCountry.dial_code}
          </Text>
          <MaterialIcons name ="keyboard-arrow-down" size={15}/>
        </TouchableOpacity>
        <View style={styles.phoneInputContainer}>
          <TextInput 
            placeholder="Phone Number"
            placeholderTextColor={Color.DEFAULT_GREY}
            selectionColor={Color.DEFAULT_GREY}
            keyboardType="number-pad"
            onFocus={() => setIsDropdownOpen(false)}
            style={styles.inputText}
            onChangeText={(text) => setPhoneNumber(selectedCountry?.dial_code + text)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Verification', {phoneNumber})}>
        <Text style={styles.signinButtonText}>Contiue</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
      <View style={getDropdownStyle(inputsContainerY)}
            onLayout={({
              nativeEvent:{
                layout: {x,y,height,width},
              },
            }) => setDropdownLayout({x,y, height, width})}>
        <FlatList 
          data={CountryCode}
          keyExtractor={(item) => item.code}
          renderItem={({item}) => 
          <FlagItem {...item} 
            onPress={(country) => {
            setSelectedCountry(country)
            setIsDropdownOpen(false)
          }}/>}
        />
      </View>
    )}
    </View>
  )
}

export default RegisterPhoneScreen

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
  inputsContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:20,
    marginVertical:50,
  },
  countryListContainer:{
    backgroundColor:Color.LIGHT_GREY,
    width:Display.setWidth(9),
    marginRight:10,
    borderRadius:8,
    height:Display.setHeight(6),
    justifyContent:'space-evenly',
    alignItems:'center',
    borderWidth:0.5,
    borderColor:Color.LIGHT_GREY2,
    flexDirection:'row',
  },
  phoneInputContainer:{
    backgroundColor:Color.LIGHT_GREY,
    paddingHorizontal:10,
    borderRadius:8,
    borderWidth:0.5,
    borderColor:Color.LIGHT_GREY2,
    justifyContent:'center',
    flex:1,
    height:Display.setHeight(6),
  },
  flatIcon:{
    height: 8,
    width: 8,
  },
  countryCodeText:{
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Color.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  inputText:{
    fontSize:18,
    textAlignVertical:'center',
    padding:0,
    height:Display.setHeight(6),
    color:Color.DEFAULT_BLACK,
  },
  countryDropdown:{
    backgroundColor:Color.LIGHT_GREY,
    position:'absolute',
    width:Display.setWidth(40),
    height:Display.setHeight(50),
    marginLeft:20,
    borderRadius:10,
    borderWidth:0.5,
    borderColor:Color.LIGHT_GREY2,
    zIndex:3,
  },
  signinButton: {
    backgroundColor: Color.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Color.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
})