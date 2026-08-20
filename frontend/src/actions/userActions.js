import axios from 'axios';
import { GET_USER_BYID_REQUEST,GET_USER_BYID_SUCCESS,GET_USER_BYID_FAIL } from '../constants/usersConstants';
import { UPDATE_USER_BYID_REQUEST,UPDATE_USER_BYID_SUCCESS,UPDATE_USER_BYID_FAIL } from '../constants/usersConstants';

export const getUserAction = (user) => async(dispatch) =>{
    try{

        dispatch({
            type:GET_USER_BYID_REQUEST,
        })
        const response = await axios.get(`/api/users/${user}`);
        console.log(response);
        dispatch({
            type:GET_USER_BYID_SUCCESS,
            payload:response.data.data
        })

    }
    catch(e)
    {
        dispatch({
            type:GET_USER_BYID_FAIL,
            payload: e.response?.data ?? e.message
        })
    }

}

export const updateUserAction = ({user,data,navigate}) => async(dispatch) =>{
    try{

        dispatch({
            type:UPDATE_USER_BYID_REQUEST,
        })

        const response = await axios.put(`/api/users/${user}`,data);

        if(response.status === 200)
            {
                navigate('/')
                window.location.reload()
                console.log("Profile successfully updated")
            }

        else alert("Unexpected error happened! Please come back later")

        dispatch({
            type:UPDATE_USER_BYID_SUCCESS,
            payload:response.data.data
        })

    }
    catch(e)
    {
        console.log("error",e)
        dispatch({
            type:UPDATE_USER_BYID_FAIL,
            payload: e.response?.data ?? e.message
        })
    }

}
