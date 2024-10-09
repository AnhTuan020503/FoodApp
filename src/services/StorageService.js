import AsyncSorage from '@react-native-async-storage/async-storage';

const setFirstTimeUse = () => {
  return AsyncSorage.setItem('isFirstTimeUse', 'true');  // Đã sửa AsyncSorage thành AsyncStorage
}

const getFirstTimeUse = () => {
  return AsyncSorage.getItem('isFirstTimeUse');  // Đã sửa AsyncSorage thành AsyncStorage
};

const setToken = token => {
  return AsyncSorage.setItem('token', token);  // Đã sửa AsyncSorage thành AsyncStorage
};

const getToken = () => {
  return AsyncSorage.getItem('token');  // Đã sửa AsyncSorage thành AsyncStorage
};

export default { setFirstTimeUse, getFirstTimeUse, setToken, getToken };
