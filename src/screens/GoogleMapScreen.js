import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview'; // Nếu sử dụng WebView để hiển thị Google Maps
import {Separator} from '../components';
import {Color, Fonts} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Display } from '../utils';

const GoogleMapScreen = ({navigation}) => {
  const mapUrl = "https://www.google.com/maps"; // Thay thế bằng URL tích hợp Google Maps của bạn

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Color.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color={Color.DEFAULT_BLACK}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Google Maps</Text>
      </View>
      <WebView source={{ uri: mapUrl }} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.SECONDARY_WHITE,
    marginTop:40,
  },
  webview: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Color.DEFAULT_BLACK,
    marginLeft: 10,
    width: Display.setWidth(35),
    textAlign:'center',
  },
});

export default GoogleMapScreen;
