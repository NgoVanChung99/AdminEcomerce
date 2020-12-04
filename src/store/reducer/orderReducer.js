import * as actionTypes from '../action/actionTypes'
import { updateObject } from  '../../util/etc'

const initialState = {
    loading: false,
    status: '',
    loadingEdit: false
}

const orderStart = (state, action) => {
    return updateObject(state, {error:null, loading: true})
}

const orderSave = (state, action) => {
    return updateObject(state, {error:null, loading: false})
}

const orderEditStart = (state) => {
    return updateObject(state, {error:null, loadingEdit: true})
}

const orderEditGet = (state) => {
    return updateObject(state, {error:null, loadingEdit: false})
}

// return reducer from variable
export const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ORDER_ADD:
            return orderStart(state, action)
        case actionTypes.ORDER_SAVE:
            return orderSave(state, action)
        case actionTypes.ORDER_EDITSTART:
            return orderEditStart(state)
        case actionTypes.ORDER_EDITGET:
            return orderEditGet(state)
        default:
            return state;
    }   
}