import * as actionTypes from '../action/actionTypes'
import { updateObject } from  '../../util/etc'

const initialState = {
    loading: false,
    status: '',
    loadingEdit: false
}

const userStart = (state, action) => {
    return updateObject(state, {error:null, loading: true})
}

const userSave = (state, action) => {
    return updateObject(state, {error:null, loading: false})
}

const userEditStart = (state) => {
    return updateObject(state, {error:null, loadingEdit: true})
}

const userEditGet = (state) => {
    return updateObject(state, {error:null, loadingEdit: false})
}

// return reducer from variable
export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.USER_ADD:
            return userStart(state, action)
        case actionTypes.USER_SAVE:
            return userSave(state, action)
        case actionTypes.USER_EDITSTART:
            return userEditStart(state)
        case actionTypes.USER_EDITGET:
            return userEditGet(state)
        default:
            return state;
    }   
}