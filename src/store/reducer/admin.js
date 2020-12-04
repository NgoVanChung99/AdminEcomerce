import * as actionTypes from '../action/actionTypes'
import { updateObject } from  '../../util/etc'

const initialState = {
    loading: false,
    status: '',
    loadingEdit: false
}

const adminStart = (state, action) => {
    return updateObject(state, {error:null, loading: true})
}

const adminSave = (state, action) => {
    return updateObject(state, {error:null, loading: false})
}

const adminEditStart = (state) => {
    return updateObject(state, {error:null, loadingEdit: true})
}

const adminEditGet = (state) => {
    return updateObject(state, {error:null, loadingEdit: false})
}

// return reducer from variable
export const adminReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADMIN_ADD:
            return adminStart(state, action)
        case actionTypes.ADMIN_SAVE:
            return adminSave(state, action)
        case actionTypes.ADMIN_EDITSTART:
            return adminEditStart(state)
        case actionTypes.ADMIN_EDITGET:
            return adminEditGet(state)
        default:
            return state;
    }   
}