import * as actionTypes from './actionTypes'
import service from '../../util/axiosInstance'

export const categoryFetch = () => {
    return dispatch => {
        dispatch(categoryStart())
        try {
            service().get("/api/Admin/Category?limit=50").then((val) => {
                console.log(val.data.categories)
                dispatch(categorySuccess(val.data.categories))
            })
        } catch (error) {
            alert('loi categoryFetch')
            throw error
        }
    }
}

export const categoryDelete = (id, list) => {
    return dispatch => {
        dispatch(categoryStart('delete'))
        try {
            service().delete(`/api/Admin/Category/${id}`, ).then(() => {
                alert("ok delete categoryDelete")
                dispatch(categorySuccess(list, 'delete'))
                dispatch(categoryStatusDelete(true))
            }).catch(() => dispatch(categoryStatusDelete(false)))
        } catch (error) {
            dispatch(categoryStatusDelete(false))
        }
    }
}

export const categoryAddAsync = (params) => {
    return dispatch => {
        console.log("params"+params)
        dispatch(categoryAdd())
        try {
            return service().post('/api/Admin/Category', params).then((val) => {
                dispatch(categorySave(true))
                //alert("categoryAddAsync"+val.data.categories.id)
                return {status: true, id: val.data.categories.id}
            }).catch(() => {
                dispatch(categorySave(false))
                return false
            })
        } catch (error) {
            throw error
        }
        
    }
}
export const categoryEditStart = (params) => {
    return {
        type: actionTypes.CATEGORY_EDITSTART,
        status: params
    }
}

export const categoryEditAsync = (params,id) => {
    return dispatch => {
        dispatch(categoryAdd())
        try {
            return service().put(`/api/Admin/Category/${id}`, params).then((val) => {
                //alert("catEditAsyns"+params)
                dispatch(categorySave(true))
                return {status: true, id: val.data.categories.id}
            }).catch(() => {
                dispatch(categorySave(false))
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const getCategoryEditData = (params) => {
    return dispatch => {
        dispatch(categoryEditStart())
        try {
            return service().get(`/api/Admin/Category/${params}`).then((res) => {
                dispatch(categoryEditGet())
                //console.log("getCategoryEditData"+res.data)
                return res.data       
            }).catch(() => {
                dispatch(categoryEditGet())
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const categoryEditGet = (params) => {
    return {
        type: actionTypes.CATEGORY_EDITGET,
        status: params
    }
}

export const categoryAdd = (params) => {
    return {
        type: actionTypes.CATEGORY_ADD,
        status: params
    }
}

export const categorySave = (params) => {
    return {
        type: actionTypes.CATEGORY_SAVE,
        status: params
    }
}

export const categoryStatusDelete = (params) => {
    return  {
        type: actionTypes.CATEGORY_DELETESTATUS,
        status: params
    }
}

export const categoryStart = () => {
    return  {
        type: actionTypes.CATEGORY_START,
    }
}

export const categorySuccess = (params) => {
    return {
        type: actionTypes.CATEGORY_LIST,
        data: params,
    }
}
