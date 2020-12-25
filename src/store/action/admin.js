import * as actionTypes from './actionTypes'
//import service from '../../util/axiosInstance'
import axios from 'axios';

export const AdminFetch = () => {
    let USER_TOKEN = localStorage.getItem('token')
    const AuthStr = 'Bearer ' + USER_TOKEN;
    return dispatch => {
        dispatch(adminStart())
        try {
            axios.get("https://localhost:4001/admin/profile", { 'headers': { 'Authorization': AuthStr } }).then((val) => {
                dispatch(adminSuccess(val.data))
                //alert(val.data)
                console.log("profile123"+val.data.name);
            })
        } catch (error) {
            throw error
        }
    }
}

                    
export const adminStart = () => {
    return  {
        type: actionTypes.ADMIN_START,
    }
}

export const adminSuccess = (params) => {
    return {
        type: actionTypes.ADMIN_LIST,
        data: params,
    }
}
