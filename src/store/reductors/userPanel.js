import * as actionTypes from "../actions/actionTypes";

const initialState = {
    activeBtn: 'active',
    search: {searchValue: "",
            searchField: false},
    pagination: {page: 1,
                range: 3},
    sorted: {id: 'number',
            sortType: 'asc',
            sort: true},
    statistic: {active: 0, 
            review: 0, 
            overdue: 0},
    assessmentsList: {},
    draftsList: {},
    loading: false,
    error: false,
    message: ''
};

const userPanel = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.CLEAR_SORT_PANEL:
            return {
                ...state,
                activeBtn: 'active',
                search: {searchValue: "",
                        searchField: false},
                pagination: {...state.pagination,
                            page: 1,},
                sorted: {...state.sorted,
                        id: 'number',
                        sortType: 'asc'},
                statistic: {active: 0, 
                            review: 0, 
                            overdue: 0},
            }
        case actionTypes.CHANGE_PAGE_VIEW:
            return {
                ...state,
                activeBtn: action.event,
                pagination: {...state.pagination,
                            page: 1}
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
                        sortType: sortDirection}}
        case actionTypes.ADD_INIT: 
            return {
                ...state,
                loading: true,
                statistic: {active: 0,
                            review: 0,
                            overdue: 0}
            }
        case actionTypes.FETCH_ADD_SUCCESS:
            return {
                ...state,
                assessmentsList: {...state.assessmentsList,
                                [action.id]: action.data},
                statistic: {...state.statistic,
                            active: state.statistic.active + 1},
                loading: false
            }
        case actionTypes.FETCH_ADD_FAIL:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.HAZARD_LIST_INIT:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_HAZARD_LIST_SUCCESS:
            return {
                ...state,
                assessmentsList: {...state.assessmentsList,
                                ...action.RAdata},
                draftsList: {...state.draftsList,
                            ...action.draftsData}
            }
        case actionTypes.COUNT_UP_ACTIVE: {
            return {
                ...state,
                statistic: {...state.statistic,
                            active: state.statistic.active + 1}
            }
        }
        case actionTypes.COUNT_UP_REVIEW: {
            return {
                ...state,
                statistic: {...state.statistic,
                            review: state.statistic.review + 1}
            }
        }
        case actionTypes.COUNT_UP_OVERDUE: {
            return {
                ...state,
                statistic: {...state.statistic,
                            overdue: state.statistic.overdue + 1}
            }
        }
        case actionTypes.FETCH_HAZARD_LIST_FAIL:
            return {
                ...state,
                loading: false,
            } 
        default:
            return state
    }

};

export default userPanel;