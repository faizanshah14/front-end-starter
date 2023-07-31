import axiosInstance from "./axiosConfig";
const API_PreFix = '/manufacturer'
export const getManufacturers = async () => {
    try {
        const response = await axiosInstance.get(API_PreFix + '/manufacturers')
        return response.data
    } catch (error) {
        return error?.response?.data?.result;
    }
}

export const getManufacturer = async (id) => {
    try {
        const response = await axiosInstance.get(API_PreFix + '/manufacturer/' + id)
        return response.data
    } catch (error) {
        return error?.response?.data?.result;
    }
}

export const createManufacturer = async (name , businessId , description) => {
    try {
        const response = await axiosInstance.post(API_PreFix + '/manufacturer', {
            name , businessId , description
        })
        return response.data
    } catch (error) {
        return error?.response?.data?.result;
    }
}

export const updateManufacturer = async (id , name , businessId , description) => {
    try {
        const response = await axiosInstance.put(API_PreFix + '/manufacturer/' + id, {
            name , businessId , description
        })
        return response.data
    } catch (error) {
        return error?.response?.data?.result;
    }
}

export const deleteManufacturer = async (id) => {
    try {
        const response = await axiosInstance.delete(API_PreFix + '/manufacturer/' + id)
        return response.data
    } catch (error) {
        return error?.response?.data?.result;
    }
}
