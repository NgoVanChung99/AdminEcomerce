import * as actionTypes from '../action/actionTypes'
import { updateObject } from  '../../util/etc'

const initialState = {
    loading: false,
    status: '',
    loadingEdit: false
}

const categoryStart = (state, action) => {
    return updateObject(state, {error:null, loading: true})
}

const categorySave = (state, action) => {
    return updateObject(state, {error:null, loading: false})
}

const categoryEditStart = (state) => {
    return updateObject(state, {error:null, loadingEdit: true})
}

const categoryEditGet = (state) => {
    return updateObject(state, {error:null, loadingEdit: false})
}

// return reducer from variable
export const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CATEGORY_ADD:
            return categoryStart(state, action)
        case actionTypes.CATEGORY_SAVE:
            return categorySave(state, action)
        case actionTypes.CATEGORY_EDITSTART:
            return categoryEditStart(state)
        case actionTypes.CATEGORY_EDITGET:
            return categoryEditGet(state)
        default:
            return state;
    }   
}