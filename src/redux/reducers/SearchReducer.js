import {CHANGE_SEARCH_FIELD} from '../../app/ActionConstants';
const initialState={
    value: '',
    results : [],
    isLoading:false
}

export const searchProduct = (state=initialState,action={})=>{
switch(action.type){
    case CHANGE_SEARCH_FIELD:
        return {...state,value:action.payload}
    default:
        return state;

}
}