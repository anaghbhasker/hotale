import Axiosinstance from "../Axiosinstance";

export const adminLogin =async(obj)=>{
    try {
        const response=await Axiosinstance.post('/admin/adminLogin',obj)
        const data = response.data
        if (data) return data;
    } catch (error) {
        return error.response.data.error;
    }
}

export const ownerDashboard=async ()=>{
    try {
        const response=await Axiosinstance.get('/admin/dashBoard',{
            headers: {
                adminToken: localStorage.getItem('adminToken'),
            },
        })
        const data = response.data
        if (data) return data;
    } catch (error) {
        return error.response.data.error;
    }
}



export const getUser=async()=>{
    try {
        const response=await Axiosinstance.get('/admin/getUsers',{
            headers: {
                adminToken: localStorage.getItem('adminToken'),
            },
        })
        const data=response.data
        if(data) return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getOwners=async()=>{
    try {
        const response=await Axiosinstance.get('/admin/getOwners',{
            headers: {
                adminToken: localStorage.getItem('adminToken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const doUserBlk=async(userId)=>{
    try {
        const response=await Axiosinstance.get(`/admin/userBlk/${userId}`,{
            headers: {
                adminToken: localStorage.getItem('adminToken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const doOwnerBlk=async(ownerId)=>{
    try {
        const response=await Axiosinstance.get(`/admin/ownerBlk/${ownerId}`,{
            headers: {
                adminToken: localStorage.getItem('adminToken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}


export const getHotel=async()=>{
    try {
        const response=await Axiosinstance.get('/admin/getHotels',{
            headers: {
                adminToken: localStorage.getItem('adminToken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const hotelApprove=async(hotelId)=>{
    try {
        const response=await Axiosinstance.get(`/admin/hotelApprove/${hotelId}`,{
            headers: {
                adminToken: localStorage.getItem('adminToken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getThathotel= async(hotelId)=>{
    try {
        const response=await Axiosinstance.get(`/admin/getThatHotel/${hotelId}`,{
            headers: {
                adminToken: localStorage.getItem('adminToken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const hotelBann=async (hotelId)=>{
    try {
        const response=await Axiosinstance.get(`/admin/hotelBann/${hotelId}`,{
            headers: {
                adminToken: localStorage.getItem('adminToken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}