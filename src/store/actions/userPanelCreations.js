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

//dodawanie nowej oceny ryzykado bazy

export const addInit = () => {
    return {
        type: actionTypes.ADD_INIT
    }
}

export const addSuccess = (id, data) => {
    return {
        type: actionTypes.ADD_SUCCESS,
        id: id,
        data: data
    }
}

export const addWorkCopySuccess = (id, data) => {
    return {
        type: actionTypes.ADD_WORK_COPY_SUCCESS,
        id: id,
        data: data
    }
}

export const removeWorkCopy = (id) => {
    return {
        type: actionTypes.REMOVE_WORK_COPY,
        id : id,
    }
}

export const messageSwitchFail = (RAtype) => {
    let message;

    switch (RAtype) {
        case 'new':
            message = 'Nie udało się zapisać nowej oceny ryzyka. Spróbuj ponownie';
            break
        case 'new_version':
            message = 'Nie udało się zapisać nowej wersji oceny ryzyka. Spóbuj ponownie';
            break
        case 'new_work_copy':
            message = 'Nie udało się zapisać nowej kopii roboczej.';
            break
        case 'new_version_work_copy':
            message = 'Nie udało się zapisać kopii roboczej nowej wersji oceny ryzyka.';
            break
        case 'add_new_from_work_copy':
            message = 'Nie udało się zapisać nowej wersji/- oceny ryzyka. Spróbuj ponownie.';
            break
        default:
            message = null
    }

    return message
}

export const addVersionSuccess = () => {
    return {
        type: actionTypes.ADD_VERSION_SUCCESS
    }
}

export const addFail = (RAtype) => {
    return {
        type: actionTypes.ADD_FAIL,
        error: true,
        message: messageSwitchFail(RAtype)
    }
}

export const addNew = data => {
    return dispatch => {
        dispatch(addInit());
        Promise.all([instance.post('/riskAssessment.json', data),
                    instance.put('/prevNumber.json', data.number)])        
        .then(response => {
            const id = response[0].data.name;
            const assessmentData = data.version[0].assessmentData;
            const userPanel = {no: Number(data.number),
                                position: assessmentData.position,
                                owner: assessmentData.owner,
                                status: data.status,
                                review: false,
                                overdue: false}
            dispatch(addSuccess(id,userPanel))
        })
        .catch(error => {
            dispatch(addFail('new'))})
    }
}

//dodawanie nowej wersji do bazy
export const addNewVersion = (id, data) => {
    const version = Object.keys(data);
    const dataToAdd = data[version];
    return dispatch => {
        dispatch(addInit());
        instance.put('/riskAssessment/' + id + '/version/' + version +'.json', dataToAdd)
        .then(response => dispatch(addVersionSuccess()))
        .catch(error => {
            dispatch(addFail('new_version'))})
    }
}

//dodawanie nowej kopii roboczej do bazy
export const addNewWorkCopy = (data) => {
    return dispatch => {
        dispatch(addInit());
        Promise.all([instance.post('/riskAssessment.json', data),
                    instance.put('/prevNumber.json', data.number)])
        .then(response => {
            const id = response[0].data.name;
            const draftData = {no: '#' + data.number + ' wersja 0',
                                position: data.draft[0].assessmentData.position,
                                owner: data.draft[0].assessmentData.owner};
            dispatch(addWorkCopySuccess(id, draftData))
        })
        .catch(error => dispatch(addFail('new_work_copy')))
    }
}

//dodawanie nowej wersji roboczej do bazy
export const addNewVersionWorkCopy = (id, no, data) => {
    const version = Object.keys(data);
    const dataToAdd = data[version];
    return dispatch => {
        dispatch(addInit());
        instance.put('/riskAssessment/' + id + '/draft/' + version +'.json', dataToAdd)
        .then(response => {
            console.log(response.data)
            const draftData = {no: '#' + no + ' wersja ' + version,
                             postion: dataToAdd.assessmentData.position,
                             owner: dataToAdd.assessmentData.owner};
            dispatch(addWorkCopySuccess(id, draftData))
        })
        .catch(error => dispatch(addFail('new_version_work_copy')))
    }
}

//dodawanie nowej oceny ryzyka z kopii roboczej
export const addNewFromWorkCopy = (id, no, data) => {
    const version = Object.keys(data);
    const dataToAdd = data[version];
    return dispatch => {
        instance.get('/riskAssessment/' + id + '.json')
        .then(response => {
            if (response.data.status === 'active') {
                const versionNumber = response.data.version.length;
                Promise.all([instance.put('/riskAssessment/' + id + '/version/' + versionNumber + '.json', dataToAdd),
                            instance.delete('/riskAssessment/' + id + '/draft.json')])
                .then(response => {
                    dispatch(addVersionSuccess());
                    dispatch(removeWorkCopy(id))})
            } else if (response.data.status === 'draft') {
                Promise.all([instance.put('/riskAssessment/' + id + '/version/0.json', dataToAdd),
                            instance.put('/riskAssessment/' + id + '/status.json',  new String('active')),
                            instance.delete('/riskAssessment/' + id + '/draft.json')])
                .then(response => {
                    const userPanel = {no: Number(no),
                                        position: dataToAdd.assessmentData.position,
                                        owner: dataToAdd.assessmentData.owner,
                                        status: 'active',
                                        review: false,
                                        overdue: false}
                    dispatch(addSuccess(id,userPanel));
                    dispatch(removeWorkCopy(id))
                })
            }
        })
        .catch(error => dispatch('add_new_from_work_copy'))
    }
}

//czyszczenie danych o rezultacie dodania/usunięcia z bazy
export const cleanAddData = () => {
    return {
        type: actionTypes.CLEAN_ADD_DATA
    }
}

//pobieranie danych z bazy
export const hazardListInit = () => {
    return {
        type: actionTypes.HAZARD_LIST_INIT
    }
}

export const fetchHazardListSuccess = (RAdata, draftsData) => {
    return {
        type: actionTypes.FETCH_HAZARD_LIST_SUCCESS,
        RAdata: RAdata,
        draftsData: draftsData
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
            let RAlist = {};
            let draftsList = {};
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
                    RAlist[id] = {no: Number(data[id].number),
                            position: target.position,
                            owner: target.owner,
                            nextReview: reviewDate,
                            status: data[id].status,
                            review: days <= 30 ? true:false,
                            overdue: days < 0 ? true:false};
                    
                    active += 1;

                    if (RAlist[id].review) {
                        review += 1
                    } 
                    if (RAlist[id].overdue) {
                        overdue += 1
                    }
                    
                    if (data[id].status === 'active' && data[id].draft) {
                        for (let draft in data[id].draft) {
                            if (data[id].draft[draft] !== null) {
                            draftsList[id] = {no: '#' + data[id].number + ' wersja ' + draft,
                                              position: data[id].draft[draft].assessmentData.position,
                                              owner: data[id].draft[draft].assessmentData.owner}    
                            }
                        }
                    }
                } else if (data[id].status === 'draft') {
                    for (let draft in data[id].draft) {
                        draftsList[id] = {no: '#' + data[id].number + ' wersja ' + draft,
                                            position: data[id].draft[draft].assessmentData.position,
                                            owner: data[id].draft[draft].assessmentData.owner}
                    }
                }
            };
            dispatch(fetchHazardListSuccess(RAlist, draftsList));

            let activeCount = 0;
            let reviewCount = 0;
            let overdueCount = 0;
            let timer = 0;
            if (active !== 0) {
                timer = 2500/Math.max(active, review, overdue)
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


