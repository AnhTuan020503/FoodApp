import { StyleSheet, Text, View,StatusBar,ScrollView,Image,FlatList,TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { ApiContants, Color, Fonts, images } from '../contants'
import { RestaurantService,StaticImageService,CartService } from '../services'
import { Display } from '../utils'
import { CategoryListItem, FoodCard, Separator } from '../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {useDispatch, useSelector} from 'react-redux';
const ListHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        width: 40,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          backgroundColor: Color.LIGHT_YELLOW,
          width: 20,
          borderTopLeftRadius: 64,
          borderBottomLeftRadius: 64,
        }}
      />
    </View>
  );
  
  const ListFooter = () => (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        width: 40,
      }}>
      <View
        style={{
          backgroundColor: Color.LIGHT_YELLOW,
          width: 20,
          borderTopRightRadius: 64,
          borderBottomRightRadius: 64,
        }}
      />
    </View>
  );
const RestaurantScreen = ({navigation, route: {params:{restaurantId}}}) => {
    const [restaurant,setRestaurant] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const dispatch = useDispatch();
    


    useEffect(()=>{
        RestaurantService.getOneRestaurantById(restaurantId).then(response => {
            setSelectedCategory(response?.data?.categories[0]);
            setRestaurant(response?.data);
        })
    },[]);
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="default"
        translucent
        backgroundColor="transparent"
    />
    <>
     {/* Thêm icon mũi tên quay lại ở đây */}
            <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} // Quay lại trang trước
                >
                    <Ionicons 
                        name="arrow-back-outline" 
                        size={30} 
                        color={Color.DEFAULT_BLACK}
                    />
            </TouchableOpacity>
        <Image
            source={{
                uri:StaticImageService.getGalleryImage(
                restaurant?.images?.cover,
                ApiContants.STATIC_IMAGE.SIZE.SQUARE,
            ),
        }}
                style={styles.backgroundImage}
        />
        <ScrollView>
            <Separator height={Display.setHeight(35)}/>
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{restaurant?.name}</Text>
                    <Ionicons 
                        name={isBookmarked ? 'bookmark' : "bookmark-outline"}
                        color={Color.DEFAULT_YELLOW}
                        size={24}
                        onPress={() => setIsBookmarked(!isBookmarked)}
                        
                    />
                </View>
                <Text style={styles.tagText}>{restaurant?.tags?.join(' • ')}</Text>
                <View style={styles.ratingReviewsContainer}>
                    <FontAwesome 
                        name ="star"
                        size={18}
                        color={Color.DEFAULT_YELLOW}
                    />
                    <Text style={styles.ratingText}>4.2</Text>
                    <Text style={styles.reviewsText}>(455 Reviews)</Text>
                </View>
                <View style={styles.deliveryDetailsContainer}>
                    <View style={styles.rowAndCenter}>
                        <Image 
                            style={styles.deliveryDetailIcon}
                            source={images.DELIVERY_CHARGE}
                        />
                        <Text style={styles.deliveryDetailText}>Free Delivery</Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Image 
                            style={styles.deliveryDetailIcon}
                            source={images.DELIVERY_TIME}
                        />
                        <Text style={styles.deliveryDetailText}>
                            {restaurant?.time} min
                        </Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Image 
                            style={styles.deliveryDetailIcon}
                            source={images.MARKER}
                        />
                        <Text style={styles.deliveryDetailText}>
                            {restaurant?.distance /1000}km
                        </Text>
                    </View>
                    <View style={styles.restaurantType}>
                        <Text style={styles.restaurantTypeText}>
                            {restaurant?.type}
                        </Text>
                    </View>
                </View>
                <View style={styles.categoriesContainer}>
                    <FlatList
                        data={restaurant?.categories}
                        keyExtractor={item => item}
                        horizontal
                        ListHeaderComponent={() => <ListHeader/>}
                        ListFooterComponent={() => <ListFooter/>}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) =>( 
                        <CategoryListItem 
                            name={item} isActive={item === selectedCategory}
                            selectCategory={category => setSelectedCategory(category)}
                        /> 
                    )}
                    />
                </View>
                <View style={styles.foodList}>
                    {restaurant?.foods
                        ?.filter(food => food?.category === selectedCategory)
                        ?.map(item => (
                        <FoodCard
                        key={item?.id}
                        {...item}/>
                    ))}
                    <Separator height={Display.setHeight(4)}/>
                </View>
            </View>
        </ScrollView>
    </>
    </View>
  )
}

export default RestaurantScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        
    },
    backButton: {
        position: 'absolute',
        top: 40,  // Điều chỉnh tùy thuộc vào chiều cao của StatusBar
        left: 15, // Canh chỉnh vị trí icon
        zIndex: 1, // Đảm bảo nó nằm trên các phần tử khác
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Tạo một nền mờ cho nút
        borderRadius: 30, 
        padding: 5,
    },
    backgroundImage:{
        position: 'absolute',
        top: 0,
        height: Display.setWidth(45),
        width:Display.setWidth(50),
    },
    mainContainer:{
        backgroundColor: Color.SECONDARY_WHITE,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    titleContainer:{
        flexDirection: 'row',
        alignItems :'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 15,
    },
    title:{
       fontSize:23,
       lineHeight:23,
        fontFamily:Fonts.POPPINS_SEMI_BOLD,
        color:Color.DEFAULT_BLACK
    },
    tagText:{
        marginHorizontal: 25,
        marginTop: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Color.DEFAULT_GREY,
    },
    ratingReviewsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 10,
    },
    ratingText:{
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Color.DEFAULT_BLACK,
    },
    reviewsText:{
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Color.DEFAULT_BLACK,
    },
    deliveryDetailsContainer:{
        flexDirection: 'row',
        alignItems :'center',
        marginHorizontal: 25,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    deliveryDetailText:{
        marginLeft: 3,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color:Color.DEFAULT_BLACK,
    },
    deliveryDetailIcon:{
        height:20,
        width:16,
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      restaurantType: {
        backgroundColor: Color.LIGHT_YELLOW,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
      },
      restaurantTypeText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Color.DEFAULT_YELLOW,
      },
      categoriesContainer: {
        marginVertical: 20,
      },
      foodList: {
        marginHorizontal: 15,
      },
})