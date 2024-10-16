import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Separator} from '../components';
import {Color, Fonts, images} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {GeneralAction} from '../actions';
import { Display } from '../utils';

const UserProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const logout = () => {
    // Logic to logout
    dispatch(GeneralAction.setToken(''));
    dispatch(GeneralAction.setUserData(null));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Color.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={Color.DEFAULT_BLACK}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <View style={styles.profileHeaderContainer}>
        <Image style={styles.profileImage} source={images.AVATAR} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.nameText}>Ameen Farook</Text>
          <Text style={styles.emailText}>ameeen.faroook@gmail.com</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionHeaderText}>Personal Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username:</Text>
          <Text style={styles.infoValue}>ameeen_farook</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>123-456-7890</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoValue}>123 Main St, City, Country</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.SECONDARY_WHITE,
    padding: 20,
    marginTop:40
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Color.DEFAULT_BLACK,
    marginLeft: 10,
    width: Display.setWidth(35),
    textAlign: 'center',
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  profileTextContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Color.DEFAULT_BLACK,
  },
  emailText: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Color.INACTIVE_GREY,
  },
  detailsContainer: {
    marginTop: 20,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.LIGHT_GREY,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Color.DEFAULT_BLACK,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Color.INACTIVE_GREY,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: Color.DEFAULT_GREEN,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutText: {
    textAlign: 'center',
    color: Color.DEFAULT_WHITE,
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});

export default UserProfileScreen;
