//UserPanel

    //zmiana strony
    export const CHANGE_PAGE_VIEW = 'CHANGE_PAGE_VIEW';
    //wyszukiwanie
    export const SEARCH_VALUE = 'SEARCH_VALUE';
    export const CLEAR_SEARCH = 'CLEAR_SEARCH';
    export const SEARCH = 'SEARCH';
    //sortowanie
    export const PAGE = 'PAGE';
    export const SORT = 'SORT';
    //dodawanie nowej oceny do bazy
    export const ADD_INIT = 'ADD_INIT';
    export const FETCH_ADD_SUCCESS = 'FETCH_ADD_SUCCESS';
    export const FETCH_ADD_FAIL = 'FETCH_ADD_FAIL';
    //dodawanie nowego numer do bazy
    export const NUMBER_UPDATE_INIT = 'NUMBER_UPDATE_INIT';
    export const FETCH_NUMBER_UPDATE_SUCCESS = 'FETCH_NUMBER_UPDATE_SUCCESS';
    export const FETCH_NUMBER_UPDATE_ERROR = 'FETCH_NUMBER_UPDATE_ERROR';
    //pobieranie danych z bazy
    export const HAZARD_LIST_INIT = 'HAZARD_LIST_INIT';
    export const FETCH_HAZARD_LIST_SUCCESS = 'FETCH_HAZARD_LIST_SUCCESS';
    export const FETCH_HAZARD_LIST_FAIL = 'FETCH_HAZARD_LIST_FAIL';
    //liczniki danych
    export const COUNT_UP_ACTIVE = 'COUNT_UP_ACTIVE';
    export const COUNT_UP_REVIEW = 'COUNT_UP_REVIEW';
    export const COUNT_UP_OVERDUE = 'COUNT_UP_OVERDUE';

//RiskAssessment

    //wprowadzanie danych
    export const INPUT_HANDLER = 'INPUT_HANDLER';
    export const HAZARD_INPUT_HANDLER = 'HAZARD_INPUT_HANDLER';
    //pobieranie danych z bazy - lista zagrożeń
    export const SET_HAZARDS = 'SET_HAZARDS';
    export const FETCH_HAZARDS_ERROR = 'FETCH_HAZARDS_ERROR';
    //pobieranie danych z bazy - numer oceny ryzyka
    export const SET_NUMBER = 'SET_NUMBER';
    export const FETCH_NUMBER_ERROR = 'FETCH_NUMBER_ERROR';
    //sterowanie zagrożeniami
    export const HAZARD_SWITCH = 'HAZARD_SWITCH';
    export const CLEAN_DATA = 'CLEAN_DATA';
    export const SAVE_DATA = 'SAVE_DATA';
    //sprawdzanie i zapisywanie danych
    export const CHECK = 'CHECK';
    export const CHECK_DATA = 'CHECK_DATA';
    //czyszczenie stanu
    export const CLEAN_STATE = 'CLEAN_STATE';

