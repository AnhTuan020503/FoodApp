import { StyleSheet, Text, View,StatusBar,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Separator,CategoryMenuItem, RestaurantCard,RestaurantMediumCard } from '../components'
import { Color, Fonts,Mock } from '../contants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { RestaurantService } from '../services'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Display } from '../utils'
const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : {...styles.sortListItem, borderBottomColor: Color.DEFAULT_WHITE};

const HomeScreen = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState()
  const [restaurants, setRestaurants] = useState(null);
  const [activeSortItem, setActiveSortItem] = useState('recent');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      RestaurantService.getRestaurants().then(response => {
        if (response?.status) {
          setRestaurants(response?.data);
        }
      });
    });
    return unsubscribe;
  }, []);

  
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
      <ScrollView style={styles.listContainer}>
        <View style={styles.horizontalListContainer}>
          <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>Top Rated</Text>
          <Text style={styles.listHeaderSubtitle}>See All</Text>
          </View>
          <FlatList
            data={restaurants}
            keyExtractor={item => item?.id}
            horizontal
            ListHeaderComponent={() => <Separator width={20} />}
            ListFooterComponent={() => <Separator width={20} />}
            ItemSeparatorComponent={() => <Separator width={10} />}
            renderItem={({item}) => <RestaurantCard
              {...item}
              navigate={restaurantId =>
                navigation.navigate('Restaurant', {restaurantId})
              }

            />}
          />
        </View>
        <View style={styles.sortListContainer}>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'recent')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('recent')}>
            <Text style={styles.sortListItemText}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'favorite')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('favorite')}>
            <Text style={styles.sortListItemText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'rating')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('rating')}>
            <Text style={styles.sortListItemText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'popular')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('popular')}>
            <Text style={styles.sortListItemText}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'trending')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('trending')}>
            <Text style={styles.sortListItemText}>Trending</Text>
          </TouchableOpacity>
        </View>
        {restaurants?.map(item => (
          <RestaurantMediumCard {...item} key={item?.id} />
        ))}
        <Separator height={Display.setHeight(5)} />
      </ScrollView>
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
    },
    listContainer: {
      paddingVertical: 5,
      zIndex: -5,
    },
    horizontalListContainer: {
      marginTop: 30,
    },
    listHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginBottom: 5,
    },
    listHeaderTitle: {
      color: Color.DEFAULT_BLACK,
      fontSize: 16,
      lineHeight: 16 * 1.4,
      fontFamily: Fonts.POPPINS_MEDIUM,
    },
    listHeaderSubtitle: {
      color: Color.DEFAULT_YELLOW,
      fontSize: 13,
      lineHeight: 13 * 1.4,
      fontFamily: Fonts.POPPINS_MEDIUM,
    },
    sortListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: Color.DEFAULT_WHITE,
      marginTop: 8,
      elevation: 1,
    },
    sortListItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: Color.DEFAULT_YELLOW,
      height: 40,
    },
    sortListItemText: {
      color: Color.DEFAULT_BLACK,
      fontSize: 13,
      lineHeight: 13 * 1.4,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
    },
})