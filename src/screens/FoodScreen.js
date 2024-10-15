import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ApiContants, Color, Fonts, images} from '../contants';
import {FoodService, StaticImageService} from '../services';
import {Display} from '../utils';
import {Separator} from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {CartAction} from '../actions';

const setStyle = isActive =>
  isActive
    ? styles.subMenuButtonText
    : {...styles.subMenuButtonText, color: Color.DEFAULT_GREY};

const FoodScreen = ({
  navigation,
  route: {
    params: {foodId},
  },
}) => {
  const [food, setFood] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState('Details');

  const dispatch = useDispatch();
  const itemCount = useSelector(
    state =>
      state?.cartState?.cart?.cartItems?.find(item => item?.foodId === foodId)
        ?.count,
  );

  useEffect(() => {
    FoodService.getOneFoodById(foodId).then(response => {
      console.log(response?.data);
      setFood(response?.data);
    });
  }, []);

  const addToCart = foodId => dispatch(CartAction.addToCart({foodId}));
  const removeFromCart = (foodId) => {
    if (itemCount > 0) { // Kiểm tra nếu số lượng hiện tại lớn hơn 0
      dispatch(CartAction.removeFromCart({ foodId }));
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
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
        style={styles.image}
        source={{
          uri: StaticImageService.getGalleryImage(
            food?.image,
            ApiContants.STATIC_IMAGE.SIZE.SQUARE,
          ),
        }}
      />
      <ScrollView>
        <Separator height={Display.setWidth(40)} />
        <View style={styles.mainContainer}>
          <View style={styles.titleHeaderContainer}>
            <Text style={styles.titleText}>{food?.name}</Text>
            <Text style={styles.priceText}>$ {food?.price}</Text>
          </View>
          <View style={styles.subHeaderContainer}>
            <View style={styles.rowAndCenter}>
              <FontAwesome
                name="star"
                size={20}
                color={Color.DEFAULT_YELLOW}
              />
              <Text style={styles.ratingText}>4.2</Text>
              <Text style={styles.reviewsText}>(255)</Text>
            </View>
            <View style={styles.rowAndCenter}>
              <Image style={styles.iconImage} source={images.DELIVERY_TIME} />
              <Text style={styles.deliveryText}>20 min</Text>
            </View>
            <View style={styles.rowAndCenter}>
              <Image style={styles.iconImage} source={images.DELIVERY_CHARGE} />
              <Text style={styles.deliveryText}>Free Delivery</Text>
            </View>
          </View>
          <View style={styles.subMenuContainer}>
            <TouchableOpacity
              style={styles.subMenuButtonContainer}
              onPress={() => setSelectedSubMenu('Details')}>
              <Text style={setStyle(selectedSubMenu === 'Details')}>
                Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subMenuButtonContainer}
              onPress={() => setSelectedSubMenu('Reviews')}
              s>
              <Text style={setStyle(selectedSubMenu === 'Reviews')}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            {food?.description ? (
              <>
                <Text style={styles.detailHeader}>Description</Text>
                <Text style={styles.detailContent}>{food?.description}</Text>
              </>
            ) : null}
            {food?.ingredients ? (
              <>
                <Text style={styles.detailHeader}>Ingredients</Text>
                <Text style={styles.detailContent}>{food?.ingredients}</Text>
              </>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <View style={styles.itemAddContainer}>
          <AntDesign
            name="minus"
            color={Color.DEFAULT_YELLOW}
            size={18}
            onPress={() => removeFromCart(foodId)}
          />
          <Text style={styles.itemCountText}>{itemCount ? itemCount : 0}</Text>
          <AntDesign
            name="plus"
            color={Color.DEFAULT_YELLOW}
            size={18}
            onPress={() => addToCart(foodId)}
          />
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.8}>
          <Text style={styles.cartButtonText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.DEFAULT_WHITE,
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
  image: {
    position: 'absolute',
    height: Display.setWidth(45),
    width: Display.setWidth(45),
    top: 0,
  },
  mainContainer: {
    backgroundColor: Color.DEFAULT_WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titleHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  titleText: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
  },
  priceText: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_YELLOW,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Color.DEFAULT_BLACK,
    marginLeft: 5,
  },
  reviewsText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Color.DEFAULT_BLACK,
    marginLeft: 5,
  },
  iconImage: {
    height: 20,
    width: 20,
  },
  deliveryText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Color.DEFAULT_BLACK,
    marginLeft: 3,
  },
  subMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    marginTop: 20,
    borderColor: Color.DEFAULT_GREY,
    justifyContent: 'space-evenly',
  },
  subMenuButtonContainer: {
    paddingVertical: 15,
    width: Display.setWidth(20),
    alignItems: 'center',
  },
  subMenuButtonText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailHeader: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
    marginTop: 10,
    marginBottom: 2,
  },
  detailContent: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Color.INACTIVE_GREY,
    textAlign: 'justify',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: Display.setWidth(5),
    justifyContent: 'space-between',
    backgroundColor: Color.DEFAULT_WHITE,
    width: Display.setWidth(48),
    paddingVertical: Display.setWidth(2.5),
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.LIGHT_GREY2,
    height: Display.setHeight(6),
    width: Display.setWidth(12),
    justifyContent: 'center',
    borderRadius: 8,
  },
  itemCountText: {
    color: Color.DEFAULT_BLACK,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    marginHorizontal: 8,
  },
  cartButton: {
    backgroundColor: Color.DEFAULT_GREEN,
    height: Display.setHeight(6),
    width: Display.setWidth(22),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cartButtonText: {
    color: Color.DEFAULT_WHITE,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});

export default FoodScreen;