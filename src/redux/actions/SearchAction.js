import {
    CHANGE_SEARCH_FIELD,
    SEARCH_PRODUCT_PENDING,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAILED

} from '../../app/ActionConstants';
export const setSearchField=(text)=>({
    type: CHANGE_SEARCH_FIELD,
    payload: text
});


