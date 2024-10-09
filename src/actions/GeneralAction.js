import { AuthenticationService, StorageService } from "../services";
import UserService from "../services/UserService";

const types = {
    SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
    SET_TOKEN: 'SET_TOKEN',
    SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
    SET_USER_DATA: 'SET_USER_DATA',
};

const setIsApploading = (isApploading) => {
    return {
        type: types.SET_IS_APP_LOADING,
        payload: isApploading,
    };
};

const setToken = (token) => {
    return {
        type: types.SET_TOKEN,
        payload: token,
    };
};

const setIsFirstTimeUse = () => {
    return {
        type: types.SET_FIRST_TIME_USE,
        payload: false,
    };
};

const appStart = () => {
    return (dispatch, getState) => {
        StorageService.getFirstTimeUse().then((isFirstTimeUse) => {
            dispatch({
                type: types.SET_FIRST_TIME_USE,
                payload: isFirstTimeUse ? false : true,
            });
        });

        StorageService.getToken().then((token) => {
            if (token) {
                dispatch({
                    type: types.SET_TOKEN,
                    payload: token,
                });

                UserService.getUserData().then((userResponse) => {
                    if (userResponse?.status) {
                        dispatch({
                            type: types.SET_USER_DATA,
                            payload: userResponse?.data,
                        });
                        dispatch({
                            type: types.SET_IS_APP_LOADING,
                            payload: false,
                        });
                    } else if (userResponse?.error?.message === 'TokenExpiredError') {
                        AuthenticationService.refreshToken().then((tokenResponse) => {
                            if (tokenResponse?.status) {
                                dispatch({
                                    type: types.SET_TOKEN,
                                    payload: tokenResponse?.data,
                                });

                                UserService.getUserData().then((userResponse) => {
                                    if (userResponse?.status) {
                                        dispatch({
                                            type: types.SET_USER_DATA,
                                            payload: userResponse?.data,
                                        });
                                        dispatch({
                                            type: types.SET_IS_APP_LOADING,
                                            payload: false,
                                        });
                                    }
                                });
                            } else {
                                dispatch({
                                    type: types.SET_TOKEN,
                                    payload: '',
                                });
                                dispatch({
                                    type: types.SET_IS_APP_LOADING,
                                    payload: false,
                                });
                            }
                        });
                    } 
                });
            }
                dispatch({
                    type: types.SET_IS_APP_LOADING,
                    payload: false,
                });
            
        });
    };
};

export default { setIsApploading, setToken, appStart, setIsFirstTimeUse, types };
