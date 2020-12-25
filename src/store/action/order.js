import * as actionTypes from './actionTypes'
import service from '../../util/axiosInstance'

export const orderFetch = () => {
    return dispatch => {
        dispatch(orderStart())
        try {
            service().get('/api/admin/AdminOrder?offset=1&limit=100').then((val) => {
                dispatch(orderSuccess(val.data.orders))
                //console.log("order"+val.data.orders)
            })
        } catch (error) {
            throw error
        }
    }
}


export const orderSearch = (text) => {
    return dispatch => {
        try {
            service().get(`/product_search?productName=${text}`).then((val) => {
                dispatch(orderSuccess(val.data))
            })
        } catch (error) {
            throw error
        }
    }
}

export const orderDelete = (id, list) => {
    return dispatch => {
        dispatch(orderStart('delete'))
        try {
            service().delete(`/product_delete?_id=${id}`, ).then(() => {
                dispatch(orderSuccess(list, 'delete'))
                dispatch(orderStatusDelete(true))
            }).catch(() => dispatch(orderStatusDelete(false)))
        } catch (error) {
            dispatch(orderStatusDelete(false))
        }
    }
}
//////////----------------------Action-Is--Order-----------------------------///////////////


export const orderActionAccept = (params) => {
    //alert("orderActionAccept"+params)
    return dispatch => {
        dispatch(orderAdd())
        try {
            return service().put(`/api/admin/AdminOrder?id=${params}&isActive=true`).then((val) => {
                //alert("orderActionAccept"+params)
                dispatch(orderSave(true))
                return {status: true, id: val.data.orders.id}
            }).catch(() => {
                dispatch(orderSave(false))
                return false
            })
        } catch (error) {
            throw error
        }
    }
}


export const orderActionRefuse = (params) => {
    //alert("orderActionRefuse"+params)
    return dispatch => {
        dispatch(orderAdd())
        try {
            return service().put(`/api/admin/AdminOrder?id=${params}&isActive=false`).then((val) => {
                //alert("orderActionRefuse"+params)
                dispatch(orderSave(true))
                return {status: true, id: val.data.orders.id}
            }).catch(() => {
                dispatch(orderSave(false))
                return false
            })
        } catch (error) {
            throw error
        }
    }
}


/////////////////////////////////////////////////////////
export const orderEditStart = (params) => {
    return {
        type: actionTypes.ORDER_EDITSTART,
        status: params
    }
}

export const orderEditGet = (params) => {
    return {
        type: actionTypes.ORDER_EDITGET,
        status: params
    }
}

export const orderAdd = (params) => {
    return {
        type: actionTypes.ORDER_ADD,
        status: params
    }
}

export const orderSave = (params) => {
    return {
        type: actionTypes.ORDER_SAVE,
        status: params
    }
}

export const orderStatusDelete = (params) => {
    return  {
        type: actionTypes.ORDER_DELETESTATUS,
        status: params
    }
}

export const orderStart = () => {
    return  {
        type: actionTypes.ORDER_START,
    }
}

export const orderSuccess = (params) => {
    return {
        type: actionTypes.ORDER_LIST,
        data: params,
    }
}
