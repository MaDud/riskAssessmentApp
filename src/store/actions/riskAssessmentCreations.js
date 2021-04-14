import * as actionTypes from './actionTypes';
import instance from '../../instance';

export const inputHandler = (e) => {
    return {
        type: actionTypes.INPUT_HANDLER,
        data: e.target.id,
        value: e.target.value,
    }
}

export const checkData = () => {
    return {
        type: actionTypes.CHECK_DATA
    }
}

export const RAtype = (type) => {
    return {
        type: actionTypes.RA_TYPE,
        RAtype: type
    }
}

export const setNumber = (number) => {
    return {
        type: actionTypes.SET_NUMBER,
        number: number
    }
}

export const setHazards = (hazards) => {
    return {
        type: actionTypes.SET_HAZARDS,
        hazardList: hazards
    }
}

export const RApreview = (id, data) => {
    return {
        type: actionTypes.RA_PREVIEW,
        id: id,
        number: data.number,
        version: data.version,
        assessmentData: data.assessmentData,
        hazardList: data.hazardList
    }
}

export const initRAForm = (type, id, version) => {
    return (dispatch, getState, {getFirebase}) => {
        let hazardsData, RAdata; 
        let hazardsList = {};
        
        getFirebase().auth().currentUser.getIdToken(true).then( token => {
            if (type === 'new') {
                Promise.all([instance.get('/hazardList.json?auth='+token),
                            instance.get('/prevNumber.json?auth='+token)])
                .then(response => {
                    hazardsData = response[0].data;
                    for (let el in hazardsData) {
                        hazardsList['hazard'+el] = {value: hazardsData[el], 
                            checked:false,
                            source: "",
                            possibleEffects: "",
                            protection: "",
                            effect: "",
                            propability: "",
                            save: false,
                            clean: true,
                            valid: false};
                    };
                    dispatch(setHazards(hazardsList));
                    dispatch(setNumber(response[1].data + 1)) 
                })
                .catch(error => console.log(error))        
            }
            else if (type === 'preview') {
                instance.get('/riskAssessment/' + id + '.json')
                .then(response => { 
                    RAdata = response.data;
                    let lastSavedVersion = RAdata.version[RAdata.version.length - 1];

                    let data = {...RAdata,
                                version: RAdata.version.length -1,
                                assessmentData: lastSavedVersion.assessmentData,
                                hazardList: lastSavedVersion.hazardList}
                    
                    dispatch(RApreview(id,data))
                })
                .catch(error => console.log(error))   
            }
            else if (type === 'new_version' || type === 'draft') {
                Promise.all([instance.get('/hazardList.json'),
                            instance.get('/riskAssessment/' + id + '.json')])
                .then(response => { 
                    const date = new Date();
                    const year = date.getFullYear() + 1;
                    const month = date.getMonth();
                    const day = date.getDate();
                    const reviewDate = new Date(year, month, day).toISOString().substring(0,10);
                    let assessmentData;
                    hazardsData = response[0].data;
                    RAdata = response[1].data;
                    for (let el in hazardsData) {
                        hazardsList['hazard'+el] = {value:hazardsData[el], 
                            checked:false,
                            source: "",
                            possibleEffects: "",
                            protection: "",
                            effect: "",
                            propability: "",
                            save: false,
                            clean: true,
                            valid: false};
                    };
                    
                    if (type === 'new_version') {
                        assessmentData = RAdata.version[Number(version) - 1];
                    } else if (type === 'draft') {
                        assessmentData = RAdata.draft[version]
                    }

                    for (let el in assessmentData.hazardList) {
                        hazardsList[el] = {...assessmentData.hazardList[el],
                                            checked: true}
                    }

                    let data = {...RAdata,
                                version: version,
                                assessmentData: {...assessmentData.assessmentData,
                                                date: new Date().toISOString().substring(0,10),
                                                reviewDate: reviewDate},
                                hazardList: hazardsList}
                    
                    dispatch(RApreview(id,data))
                })
                    .catch(error => console.log(error))
            }
        })
        .catch(error => console.log(error))
    }
}



export const hazardSwitch = (id) => {
    return {
        type: actionTypes.HAZARD_SWITCH,
        id: id
    }
}

export const cleanData = (id) => {
    return {
        type: actionTypes.CLEAN_DATA,
        id: id
    }
}

export const saveData = (id) => {
    return {
        type: actionTypes.SAVE_DATA,
        id: id
    }
}

export const check = () => {
    return {
        type: actionTypes.CHECK
    }
}

export const hazardInputHandler = (event,id) => {
    return {
        type: actionTypes.HAZARD_INPUT_HANDLER,
        id: id,
        name: event.target.name,
        value: event.target.value
    }
}

export const cleanState = () => {
    return {
        type: actionTypes.CLEAN_STATE
    }
}

