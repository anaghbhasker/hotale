import Axiosinstance from "../Axiosinstance";

export const getOwner=async()=>{
    try {
        const response = await Axiosinstance.get('/owner/getOwner',{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const addHotel=async(obj)=>{
    try {
        const response = await Axiosinstance.post('/owner/addHotel',obj,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const addLocation=async(obj)=>{
    try {
        const response=await Axiosinstance.post('/owner/addLocation',obj,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getOwnerHotel=async()=>{
    try {
        const response=await Axiosinstance.get('/owner/getOwnerHotel',{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getEdithotel=async(hotelId)=>{
    try {
        const response=await Axiosinstance.get(`/owner/getEdithotel/${hotelId}`,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const editHotel=async(obj)=>{
    try {
        const response=await Axiosinstance.post('/owner/editHotel',obj,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const deletehotel=async(id)=>{
    try {
        const response=await Axiosinstance.get(`/owner/deleteHotel/${id}`,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const hotelbann=async(id)=>{
    try {
        const response=await Axiosinstance.get(`/owner/hotelBann/${id}`,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const fullDetails=async()=>{
    try {
        const response=await Axiosinstance.get('/owner/fullDetails',{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const editProfile=async (obj)=>{
    try {
        const response =await Axiosinstance.post('/owner/editProfile',obj,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getBookings=async (hotelId)=>{
    try {
        const response=await Axiosinstance.get(`/owner/getBookings/${hotelId}`,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}