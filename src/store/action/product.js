import * as actionTypes from './actionTypes'
//import service from '../../util/testproduct.js'
import service from '../../util/axiosInstance.js'
import axios from 'axios';

export const productFetch = () => {
    return dispatch => {
        dispatch(productStart())
        try {
            service().get('/api/Admin/Product?limit=50').then((val) => {
                dispatch(productSuccess(val.data.products))
                console.log("totalPage"+val.data.totalPage)
            })
        } catch (error) {
            throw error
        }
    }
}
//http://3.25.210.151/api/Admin/Product?limit=100

export const productFetchCategory = (params) => {
    return dispatch => {
        dispatch(productStart())
        try {
            service().get(`/api/Admin/Category/${params}/Product/`).then((val) => {
                dispatch(productSuccess(val.data.products))
                //console.log("media"+val.data.media)
            })
        } catch (error) {
            throw error
        }
    }
}

export const productAddAsync = (params) => {
    return dispatch => {
        //alert("add product"+params)
        dispatch(productAdd())
        try {
            return service().post('/api/Admin/Product', params).then((val) => {
                dispatch(productSave(true))
                return {status: true, id: val.data.products.id}
            }).catch(() => {
                dispatch(productSave(false))
                return false
            })
        } catch (error) {
            throw error
        }
    }
}



//https://localhost:4001/api/Media/product-image?productId=1
export const productAddImage = (params , id) => {
    
    console.log("upload img "+params)
    let USER_TOKEN = localStorage.getItem('token')
    const AuthStr = 'Bearer ' + USER_TOKEN;
    return () => {
        try {
            return axios.put(`https://localhost:4001/api/Media/product-image?productId=${id}`, params, { 'headers': { 'Authorization': AuthStr } }).then((val) => {
                return true
            }).catch(() => {
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const productSearch = (text) => {
    return dispatch => {
        try {
            service().get(`/product_search?productName=${text}`).then((val) => {
                dispatch(productSuccess(val.data))
            })
        } catch (error) {
            throw error
        }
    }
}

export const productDelete = (id, list) => {
    return dispatch => {
        dispatch(productStart('delete'))
        try {
            service().delete(`/api/Admin/Product/${id}`, ).then(() => {
                dispatch(productSuccess(list, 'delete'))
                dispatch(productStatusDelete(true))
            }).catch(() => dispatch(productStatusDelete(false)))
        } catch (error) {
            dispatch(productStatusDelete(false))
        }
    }
}

export const getProductEditData = (params) => {
    return dispatch => {
        dispatch(productEditStart())
        try {
            return service().get(`/api/Admin/Product/${params}`).then((res) => {
                dispatch(productEditGet())
                return res.data
            }).catch(() => {
                dispatch(productEditGet())
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const productEditAsync = (params,id) => {
    return dispatch => {
        alert("edit product")
        
        dispatch(productAdd())
        try {
            return service().put(`/api/Admin/Product/${id}`, params).then((val) => {
                dispatch(productSave(true))
                return {status: true, id: val.data.id}
            }).catch(() => {
                dispatch(productSave(false))
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const productEditStart = (params) => {
    return {
        type: actionTypes.PRODUCT_EDITSTART,
        status: params
    }
}

export const productEditGet = (params) => {
    return {
        type: actionTypes.PRODUCT_EDITGET,
        status: params
    }
}

export const productAdd = (params) => {
    return {
        type: actionTypes.PRODUCT_ADD,
        status: params
    }
}

export const productSave = (params) => {
    return {
        type: actionTypes.PRODUCT_SAVE,
        status: params
    }
}

export const productStatusDelete = (params) => {
    return  {
        type: actionTypes.PRODUCT_DELETESTATUS,
        status: params
    }
}

export const productStart = () => {
    return  {
        type: actionTypes.PRODUCT_START,
    }
}

export const productSuccess = (params) => {
    return {
        type: actionTypes.PRODUCT_LIST,
        data: params,
    }
}
