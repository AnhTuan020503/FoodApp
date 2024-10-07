const types ={
    SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
    SET_TOKEN: 'SET_TOKEN'
}

const setIsApploading = isApploading => {
    return {
        type : types.SET_IS_APP_LOADING,
        payload: isApploading
    };
};

const setToken = token => {
    return {
        type : types.SET_TOKEN,
        payload: token
    };
};

export default {setIsApploading, setToken, types};