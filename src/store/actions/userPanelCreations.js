import * as actionTypes from './actionTypes';

export const cleanUserPanel = () => {
    return {
        type: actionTypes.CLEAN_SORT_PANEL
    }
}

export const changeView = (path) => {
    return {
        type: actionTypes.CHANGE_PAGE_VIEW,
        event: path
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

export const addSuccess = () => {
    return {
        type: actionTypes.ADD_SUCCESS,
    }
}

export const addWorkCopySuccess = () => {
    return {
        type: actionTypes.ADD_WORK_COPY_SUCCESS,
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
    return {
        type: actionTypes.ADD_NEW_PROCESS,
        data: data
    }
        
}

//dodawanie nowej wersji do bazy
export const addNewVersion = (id, data) => {
    const version = Object.keys(data)
    return {
        type: actionTypes.ADD_NEW_VERSION_PROCESS,
        id: id,
        version: version,
        dataToAdd: data[version]  
    }
}

//dodawanie nowej kopii roboczej do bazy
export const addNewWorkCopy = (data) => {
    return {
        type: actionTypes.ADD_WORK_COPY_PROCESS,
        data: data
    }
}

//dodawanie nowej wersji roboczej do bazy
export const addNewVersionWorkCopy = (id, no, data) => {
    const version = Object.keys(data)
    return {
        type: actionTypes.ADD_VERSION_WORK_COPY_PROCESS,
        id: id,
        no: no,
        data: data,
        version: version,
        dataToAdd: data[version]
    }
}

//dodawanie nowej oceny ryzyka z kopii roboczej
export const addNewFromWorkCopy = (id, no, data) => {
    const version = Object.keys(data)
    return {
        type: actionTypes.ADD_NEW_FROM_WORK_COPY_PROCESS,
        id: id,
        no: no,
        data: data,
        version: version,
        dataToAdd: data[version]
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

export const fetchHazardListSuccess = (RAdata, draftsData, active, overdue, review) => {
    return {
        type: actionTypes.FETCH_HAZARD_LIST_SUCCESS,
        RAdata: RAdata,
        draftsData: draftsData,
        active: active,
        overdue: overdue,
        review: review
    }
}

export const fetchHazardListFail = () => {
    return {
        type: actionTypes.FETCH_HAZARD_LIST_FAIL
    }
}

export const initHazardList = () => {
    return {
        type: actionTypes.HAZARD_LIST_INIT_PROCESS
    }
        
}

//proces archiwizacji

export const archiveInit = () => {
    return {
        type: actionTypes.ARCHIVE_INIT
    }
}

export const archiveSuccess = (id) => {
    return {
        type: actionTypes.ARCHIVE_SUCCESS,
        id: id
    }
}

export const archiveFail = () => {
    return {
        type: actionTypes.ARCHIVE_FAIL
    }
}

export const archiveRA = (id) => {
    return {
        type: actionTypes.ARCHIVE_PROCESS,
        id: id
    }
}

export const raOutputClean = () => {
    return {
        type: actionTypes.RA_OUTPUT_CLEAN
    }
}


