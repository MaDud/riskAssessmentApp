import * as actionTypes from "../actions/actionTypes";

const initialState = {
    activeBtn: 'active',
    search: {searchValue: "",
            searchField: false},
    pagination: {page: 1,
                range: 3},
    sorted: {id: 'number',
            sortType: 'asc',
            sort: true}
};

const userPanel = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.CHANGE_PAGE_VIEW:
            return {
                ...state,
                activeBtn: action.event
            }
        case actionTypes.SEARCH:
            return {
                ...state,
                search: {...state.search,
                        searchField: !state.search.searchField}
            }
        case actionTypes.SEARCH_VALUE:
            return {
                ...state,
                search: {...state.search,
                            searchValue: action.searchValue}
            }
        case actionTypes.CLEAR_SEARCH: 
        return {
            ...state,
            search: {...state.search,
                    searchValue: ''}
        } 
        case actionTypes.PAGE:
            return {
                ...state,
                pagination: {...state.pagination,
                            page: action.page}
            }
        case actionTypes.SORT: 
            const target = action.event;
            let columnId = state.sorted.id;
            let sortDirection = state.sorted.sortType;

            if (target === columnId) {
                if (sortDirection === 'asc') {
                    sortDirection = 'desc';
                } else {
                    sortDirection = 'asc'
                }
            } else {
                columnId = target;
                sortDirection = 'asc'
            }

            return {
                ...state,
                pagination: {...state.pagination,
                            page: 1},
                sorted: {...state.sorted,
                        id: columnId,
                        sortType: sortDirection}
            }


        
        default:
            return state
    }

};

export default userPanel;