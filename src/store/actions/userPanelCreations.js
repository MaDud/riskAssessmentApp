import * as actionTypes from './actionTypes';
import instance from '../../instance';

export const clearUserPanel = () => {
    return {
        type: actionTypes.CLEAR_SORT_PANEL
    }
}

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
        Promise.all([instance.post('/riskAssessment.json', data),
                    instance.put('/prevNumber.json', data.number)])        
        .then(response => {
            console.log(response);
            const id = response[0].data.name;
            const assessmentData = data.version[0].assessmentData;
            const userPanel = {no: Number(data.number),
                                position: assessmentData.position,
                                owner: assessmentData.owner,
                                status: data.status,
                                review: false,
                                overdue: false}
            dispatch(fetchAddSuccess(id,userPanel))
        })
        .catch(error => {
            dispatch(fetchAddFail())})
    }
}

//pobieranie danych z bazy
export const hazardListInit = () => {
    return {
        type: actionTypes.HAZARD_LIST_INIT
    }
}

export const fetchHazardListSuccess = (data) => {
    return {
        type: actionTypes.FETCH_HAZARD_LIST_SUCCESS,
        data: data
    }
}

export const fetchHazardListFail = () => {
    return {
        type: actionTypes.FETCH_HAZARD_LIST_FAIL
    }
}

//licznik
export const countUpActive = () => {
    return {
        type: actionTypes.COUNT_UP_ACTIVE,
    }
}

export const countUpReview = () => {
    return {
        type: actionTypes.COUNT_UP_REVIEW,
    }
}

export const countUpOverdue = () => {
    return {
        type: actionTypes.COUNT_UP_OVERDUE,
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
                
                if (data[id].status === 'active') {
                    const active_version = data[id].version.length -1;
                    const target = data[id].version[active_version].assessmentData;
                    const reviewDate = new Date(target.reviewDate);
                    const timeDiffrence= reviewDate-date;
                    const days= Math.floor(timeDiffrence/(1000 * 60 * 60 * 24));
                    values[id] = {no: Number(data[id].number),
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
            }};
            dispatch(fetchHazardListSuccess(values));

            let activeCount = 0;
            let reviewCount = 0;
            let overdueCount = 0;
            let timer = 0;
            if (active !== 0) {
                timer = 3000/Math.max(active, review, overdue)
            };
            const interval = setInterval( () => {
                if (activeCount < active) {
                    activeCount += 1;
                    dispatch(countUpActive())
                }
                if (reviewCount < review) {
                    reviewCount += 1;
                    dispatch(countUpReview())
                }
                if (overdueCount < overdue) {
                    overdueCount += 1;
                    dispatch(countUpOverdue())
                }
            }, timer);

            if(activeCount === active && reviewCount === review && overdueCount === overdue) {
                clearInterval(interval)
            }
        }).catch(error => {
            console.log(error);
            dispatch(fetchHazardListFail())})
    }
}


