import Axiosinstance from "../Axiosinstance";

export const getUser=async(token)=>{
    try {
        const response=await Axiosinstance.get('/getUser',{
            headers: {
                usertoken: token
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}