import * as actionTypes from './actionTypes'
import service from '../../util/axiosInstance.js'

export const userFetch = () => {
    return dispatch => {
        dispatch(userStart())
        try {
            service().get('/api/admin/user?limit=100').then((val) => {
                dispatch(userSuccess(val.data.users))
                //console.log("media"+val.data.media)
            })
        } catch (error) {
            throw error
        }
    }
}
//http://3.25.210.151/api/admin/user?limit=100
export const userAddAsync = (params) => {
    return dispatch => {
        //alert("add user")
        dispatch(userAdd())
        try {
            return service().post('/api/Admin/User', params).then((val) => {
                dispatch(userSave(true))
                return {status: true, id: val.data.id}
            }).catch(() => {
                dispatch(userSave(false))
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const userAddImage = (formData) => {
    return () => {
        try {
            return service().post('/image_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((val) => {
                return true
            }).catch(() => {
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const userSearch = (text) => {
    return dispatch => {
        try {
            service().get(`/user=${text}`).then((val) => {
                dispatch(userSuccess(val.data))
            })
        } catch (error) {
            throw error
        }
    }
}

export const userDelete = (id, list) => {
    return dispatch => {
        //alert(id)
        dispatch(userStart('delete'))
        try {
            //alert("xoa on"+id)
            service().delete(`/api/Admin/User/${id}`, ).then(() => {
                //alert("xoa"+id)
                dispatch(userSuccess(list, 'delete'))
                dispatch(userStatusDelete(true))
            }).catch(() => dispatch(userStatusDelete(false)))
        } catch (error) {
            alert("loi")
            dispatch(userStatusDelete(false))
        }
    }
}

//http://3.25.210.151/api/Admin/User/2
export const getUserEditData = (params) => {
    return dispatch => {
        dispatch(userEditStart())
        try {
            return service().get(`/api/Admin/User/${params}`).then((res) => {
                dispatch(userEditGet())
                return res.data
            }).catch(() => {
                dispatch(userEditGet())
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const userEditAsync = (params , id) => {
    return dispatch => {
        dispatch(userAdd())
        try {
            return service().post('/api/Admin/User', params).then((val) => {
                dispatch(userSave(true))
                return {status: true, id: val.data.id}
            }).catch(() => {
                dispatch(userSave(false))
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const userEditStart = (params) => {
    return {
        type: actionTypes.USER_EDITSTART,
        status: params
    }
}

export const userEditGet = (params) => {
    return {
        type: actionTypes.USER_EDITGET,
        status: params
    }
}

export const userAdd = (params) => {
    return {
        type: actionTypes.USER_ADD,
        status: params
    }
}

export const userSave = (params) => {
    return {
        type: actionTypes.USER_SAVE,
        status: params
    }
}

export const userStatusDelete = (params) => {
    return  {
        type: actionTypes.USER_DELETESTATUS,
        status: params
    }
}

export const userStart = () => {
    return  {
        type: actionTypes.USER_START,
    }
}

export const userSuccess = (params) => {
    return {
        type: actionTypes.USER_LIST,
        data: params,
    }
}
