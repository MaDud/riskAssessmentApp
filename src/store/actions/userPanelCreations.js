import * as actionTypes from './actionTypes';
import instance from '../../instance';

export const changeView = (e) => {
    e.preventDefault();
    return {
        type: actionTypes.CHANGE_PAGE_VIEW,
        event: e.target.id
    }
}

export const search = () => {
    return {
        type: actionTypes.SEARCH,
    }
}

export const searchValue = (e) => {
    let value= e.target.value;
    return {
        type: actionTypes.SEARCH_VALUE,
        searchValue: value.trim().toUpperCase()
    }
}

export const changePage = id => {
    return {
        type: actionTypes.PAGE,
        page: Number(id)
    }
}

export const sortData = (e) => {
    return {
        type: actionTypes.SORT,
        event: e.target.id
    }
}

//dodawanie nowej oceny ryzyka do bazy

export const addInit = () => {
    return {
        type: actionTypes.ADD_INIT
    }
}

export const fetchAddSuccess = (id, data) => {
    return {
        type: actionTypes.FETCH_ADD_SUCCESS,
        id: id,
        data: data
    }
}

export const fetchAddFail = () => {
    return {
        type: actionTypes.FETCH_ADD_FAIL,
        error: true
    }
}

export const addNew = data => {
    return dispatch => {
        dispatch(addInit());
        instance.post('/riskAssessment.json',data)
        .then(response => {
            const id = response.data.name;
            const assessmentData = data.assessmentData
            const userPanel = {no: assessmentData.number + 'v' + assessmentData.version,
                                position: assessmentData.position,
                                owner: assessmentData.owner,
                                status: data.status,
                                review: false,
                                overdue: false}
            
            dispatch(fetchAddSuccess(id,userPanel))
        })
        .catch(error => dispatch(fetchAddFail()))
    }
}

//pobieranie danych z bazy
export const hazardListInit = () => {
    return {
        type: actionTypes.HAZARD_LIST_INIT
    }
}

export const fetchHazardListSuccess = (data, active, review, overdue) => {
    return {
        type: actionTypes.FETCH_HAZARD_LIST_SUCCESS,
        data: data,
        active: active,
        review: review,
        overdue: overdue
    }
}

export const fetchHazardListFail = () => {
    return {
        type: actionTypes.FETCH_HAZARD_LIST_FAIL,
        error: true
    }
}

export const initHazardList = () => {
    return dispatch => {
        hazardListInit();
        instance.get('/riskAssessment.json')
        .then(response => {
            const data = response.data;
            const date = new Date();
            let values = {};
            let active = 0;
            let review = 0;
            let overdue = 0;
                
            for (let id in data) {

                const target = data[id].assessmentData;
                const reviewDate = new Date(target.reviewDate);
                const timeDiffrence= reviewDate-date;
                const days= Math.floor(timeDiffrence/(1000 * 60 * 60 * 24));
                
                if (data[id].status === 'active') {
                    values[id] = {no: target.number + ' v.' + target.version,
                            position: target.position,
                            owner: target.owner,
                            nextReview: reviewDate,
                            status: data[id].status,
                            review: days <= 30 ? true:false,
                            overdue: days < 0 ? true:false};
                    
                    active += 1;

                    if (values[id].review) {
                        review += 1
                    } 
                    if (values[id].overdue) {
                        overdue += 1
                    }
            }}
            console.log('values',values);
            console.log('active', active)
            dispatch(fetchHazardListSuccess(values, active, review, overdue))
        }).catch(error => dispatch(fetchHazardListFail()))
    }
}


