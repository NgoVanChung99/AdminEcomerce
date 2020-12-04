import * as actionTypes from '../action/actionTypes'
import { updateObject } from  '../../util/etc'

const initialState = {
    loading: false,
    list: [],
    status: ""
}

const productStart = (state, action) => {
    return updateObject(state, {error:null, loading:true, status: ""})
}
const categoryStart = (state, action) => {
    return updateObject(state, {error:null, loading:true, status: ""})
}
const orderStart = (state, action) => {
    return updateObject(state, {error:null, loading:true, status: ""})
}
const adminStart = (state, action) => {
    return updateObject(state, {error:null, loading:true, status: ""})
}
const userStart = (state, action) => {
    return updateObject(state, {error:null, loading:true, status: ""})
}



const productList = (state, action) => {
    return updateObject(state, {loading:false, list:[...action.data] })
}
const categoryList = (state, action) => {
    return updateObject(state, {loading:false, list:[...action.data] })
}
const orderList = (state, action) => {
    return updateObject(state, {loading:false, list:[...action.data] })
}
const userList = (state, action) => {
    return updateObject(state, {loading:false, list:[...action.data] })
}
const adminList = (state, action) => {
    return updateObject(state, {loading:false, list:{...action.data} })
}



const productDeleteStatus = (state, action) => {
    return updateObject(state, {loading:false, status: action.status })
}

const categoryDeleteStatus = (state, action) => {
    return updateObject(state, {loading:false, status: action.status })
}
const orderDeleteStatus = (state, action) => {
    return updateObject(state, {loading:false, status: action.status })
}
const userDeleteStatus = (state, action) => {
    return updateObject(state, {loading:false, status: action.status })
}

export const listReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PRODUCT_START:
            return productStart(state, action)
        case actionTypes.PRODUCT_LIST:
            return productList(state, action)
        case actionTypes.PRODUCT_DELETESTATUS:
            return productDeleteStatus(state, action)
        case actionTypes.CATEGORY_START:
            return categoryStart(state, action)
        case actionTypes.CATEGORY_LIST:
            return categoryList(state, action)
        case actionTypes.CATEGORY_DELETESTATUS:
            return categoryDeleteStatus(state, action)
        case actionTypes.ORDER_START:
            return orderStart(state, action)
        case actionTypes.ORDER_LIST:
            return orderList(state, action)
        case actionTypes.ORDER_DELETESTATUS:
            return orderDeleteStatus(state, action)
        case actionTypes.ADMIN_START:
            return adminStart(state, action)
        case actionTypes.ADMIN_LIST:
            return adminList(state, action)
        case actionTypes.USER_START:
            return userStart(state, action)
        case actionTypes.USER_LIST:
            return userList(state, action)
        case actionTypes.USER_DELETESTATUS:
            return userDeleteStatus(state, action)
        default:
            return state;
    }   
}