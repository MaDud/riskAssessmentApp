import * as actionTypes from "../actions/actionTypes";

const initialState = {
    activeBtn: 'active',
    search: {searchValue: '',
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
    message: null
};

const userPanel = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.CLEAN_SORT_PANEL:
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
            }
        case actionTypes.CHANGE_PAGE_VIEW:
            return {
                ...state,
                activeBtn: action.event,
                pagination: {...state.pagination,
                            page: 1},
                search: {searchValue: '',
                        searchField: false}           
            }
        case actionTypes.SEARCH:
            let empty = state.search.searchValue;
            if (state.search.searchField) {
                empty= ''
            }
            return {
                ...state,
                search: {...state.search,
                        searchField: !state.search.searchField,
                        searchValue: empty}
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
            }
        case actionTypes.ADD_SUCCESS:
            return {
                ...state,
                assessmentsList: {...state.assessmentsList,
                                [action.id]: action.data},
                statistic: {...state.statistic,
                            active: state.statistic.active + 1},
                error: false,
                loading: false,
                message: 'Nowa ocena ryzyka została dodana'
            }
        case actionTypes.ADD_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.message
            }
        case actionTypes.ADD_VERSION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                message: 'Nowa wersja oceny ryzyka zawodowego została zapisana'
            }
        case actionTypes.ADD_WORK_COPY_SUCCESS: 
            return {
                ...state,
                draftsList: {...state.draftsList,
                            [action.id]: action.data},
                error: false,
                loading: false,
                message: 'Kopia robocza została dodana do bazy.'
            }
        case actionTypes.REMOVE_WORK_COPY:
            let draftsList = state.draftsList;
            delete draftsList[action.id];
            return {
                ...state,
                draftsList: draftsList,
            }
        case actionTypes.CLEAN_ADD_DATA:
            return {
                ...state,
                loading: false,
                error: false,
                message: null
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
                            ...action.draftsData},
                statistic: {...state.statistic,
                            active: action.active,
                            overdue: action.overdue,
                            review: action.review
                }
            }
        case actionTypes.FETCH_HAZARD_LIST_FAIL:
            return {
                ...state,
                loading: false,
            } 
        case actionTypes.ARCHIVE_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ARCHIVE_SUCCESS:
            let assessmentsList= {};
            const filteredList = Object.keys(state.assessmentsList).filter( id => {
                return id !== action.id
            });
            filteredList.forEach( id => assessmentsList[id] = state.assessmentsList[id])
            
            return {
                ...state,
                loading: false,
                error: false,
                message: 'Ocena ryzyka została przeniesiona do archiwum',
                assessmentsList: assessmentsList
            }
        case actionTypes.ARCHIVE_FAIL:
            return {
                ...state,
                loading: false,
                message: 'Wystąpił błąd, spróbuj ponownie',
                error: true
            }
        case actionTypes.RA_OUTPUT_CLEAN:
            return {
                ...state,
                message: null,
                error: false
            }
        default:
            return state
    }

};

export default userPanel;