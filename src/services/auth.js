import axiosInstance from './axiosConfig'; 
const API_URL = '/auth/';




export const login  = async (username, password,rememberMe) => {
    return axiosInstance.post( API_URL + 'login', {
        username,
        password
    }).then(response => {
        if (!!response?.data?.data?.accessToken) {
            if(rememberMe){
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('isAuthenticated', JSON.stringify (true))
            }else{
                sessionStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('isAuthenticated', JSON.stringify (true))
            }
            axiosInstance.setUser = function(user) {
                this.defaults.headers['Authorization'] = `Bearer ${user}`;
                // Add any other headers or data related to the user object
              };
              console.log(response.data.token)
            axiosInstance.setUser(response?.data?.data?.accessToken);
        }
        return response?.data?.result;
    }).catch(error => {
        console.log(error)
        return error?.response?.data?.result;
    });
}

export const Register = async (username, email,password , name='' , businessId)  => {
    return axiosInstance.post(API_URL + 'signup', {
        username,
        email,
        password,
        firstName: name,
        businessId
    }).then(response => {
        return response.data;
    }).catch(error => {
        return error?.response?.data?.result;
    });
}

export const createBusiness = async (businessName) => {
    return axiosInstance.post('business' + '/business', {
        name: businessName,
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error)
        return error?.response?.data?.result;
    });
}

export const createBusinessLocation = async (businessId , locationId , phone , email, website ) => {
    return axiosInstance.post('businessLocation/' + 'businessLocation', {
        businessId,
        locationId,
        phone,
        email,
        website
    }).then(response => {
        return response.data;
    }
    ).catch(error => {
        return error?.response?.data?.result;
    }
    );
}