import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React,{useState} from 'react'
import { Separator,CategoryMenuItem } from '../components'
import { Color, Fonts,Mock } from '../contants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState()
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Color.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight}/>
      <View style={styles.backgroundCurvedContainer}/>
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
          <Ionicons
            name="location-outline"
            size = {15}
            color = {Color.DEFAULT_BLACK}
          />
          <Text style={styles.locationText}>Delivered to</Text>
          <Text style={styles.selectedLocationText}>HOME</Text>
          <MaterialIcons
            name="keyboard-arrow-down" 
            size={16} 
            color={Color.DEFAULT_YELLOW}
          />
          <Feather
            name = "bell"
            size={16}
            color={Color.DEFAULT_WHITE}
            style={{position:'absolute', right :0}}
          />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <Ionicons
              name="search-outline"
              size={25}
              color = {Color.DEFAULT_GREY}
            />
            <Text style={styles.searchText}>Search...</Text>
          </View>
          <Feather
            name="sliders" 
            size={20} 
            color ={Color.DEFAULT_YELLOW}
            style={{marginRight: 10}}
          />
        </View>
        <View style={styles.categoriesContainer}>
          {Mock.CATEGORIES.map(({name,logo})=>(
            <CategoryMenuItem 
              name={name} 
              logo={logo} 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:Color.SECONDARY_WHITE,
    },
    backgroundCurvedContainer:{
      backgroundColor:Color.DEFAULT_GREEN,
      height: 2020,
      position: 'absolute',
      top : -1 * (2000 -230),
      width:2000,
      borderRadius: 2000,
      alignSelf:'center',
      zIndex: -1,
    },
    headerContainer:{
      justifyContent:'space-evenly',
      marginTop:60,
    },
    locationContainer:{
      flexDirection:'row',
      alignItems:'center',
      marginTop:10,
      marginHorizontal:20,
    },
    locationText:{
      color:Color.DEFAULT_WHITE,
      marginLeft:5,
      fontSize:13,
      lineHeight: 13 *1.4,
      fontFamily:Fonts.POPPINS_MEDIUM,
    },
    selectedLocationText:{
      color:Color.DEFAULT_YELLOW,
      marginLeft:5,
      fontSize:14,
      lineHeight: 14 *1.4,
      fontFamily:Fonts.POPPINS_MEDIUM,
    },
    alertBadge:{
      borderRadius: 32,
      backgroundColor: Color.DEFAULT_YELLOW,
      justifyContent: 'center',
      alignItems: 'center',
      height: 16,
      width: 16,
      position: 'absolute',
      right : -2,
      top : -10,
    },
    alertBadgeText:{
      color:Color.DEFAULT_WHITE,
      fontSize:10,
      lineHeight: 10 *1.4,
      fontFamily:Fonts.POPPINS_BOLD,
    },
    searchContainer:{
      backgroundColor: Color.DEFAULT_WHITE,
      height: 45,
      borderRadius:8,
      marginHorizontal: 20,
      marginTop: 20,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: 'center',
    },
    searchSection:{
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    searchText:{
      color:Color.DEFAULT_GREY,
      fontSize:16,
      lineHeight: 16 *1.4,
      fontFamily:Fonts.POPPINS_MEDIUM,
      marginLeft: 10,
    },
    categoriesContainer:{
      flexDirection:'row',
      justifyContent: 'space-evenly',
      marginTop :20,
    }
})