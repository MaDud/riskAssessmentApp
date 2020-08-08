//UserPanel
    //czyszczenie sortowania i typu wyświetlanych danych
    export const CLEAR_SORT_PANEL = 'CLEAR_SORT_PANEL';
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
    export const ADD_SUCCESS = 'ADD_SUCCESS';
    export const ADD_FAIL = 'ADD_FAIL';
    export const ADD_WORK_COPY_SUCCESS = 'ADD_WORK_COPY_SUCCESS';
    export const ADD_VERSION_SUCCESS = 'ADD_VERSION_SUCCESS';
    export const REMOVE_WORK_COPY = 'REMOVE_WORK_COPY';
    export const CLEAN_ADD_DATA = 'CLEAN_ADD_DATA';
    //pobieranie danych z bazy
    export const HAZARD_LIST_INIT = 'HAZARD_LIST_INIT';
    export const FETCH_HAZARD_LIST_SUCCESS = 'FETCH_HAZARD_LIST_SUCCESS';
    export const FETCH_HAZARD_LIST_FAIL = 'FETCH_HAZARD_LIST_FAIL';

//RiskAssessment

    //wprowadzanie danych
    export const INPUT_HANDLER = 'INPUT_HANDLER';
    export const HAZARD_INPUT_HANDLER = 'HAZARD_INPUT_HANDLER';
    //pobieranie danych z bazy - lista zagrożeń
    export const SET_HAZARDS = 'SET_HAZARDS';
    //pobieranie danych z bazy - numer oceny ryzyka
    export const SET_NUMBER = 'SET_NUMBER';
    //sterowanie zagrożeniami
    export const HAZARD_SWITCH = 'HAZARD_SWITCH';
    export const CLEAN_DATA = 'CLEAN_DATA';
    export const SAVE_DATA = 'SAVE_DATA';
    //sprawdzanie i zapisywanie danych
    export const CHECK = 'CHECK';
    export const CHECK_DATA = 'CHECK_DATA';
    //czyszczenie stanu
    export const CLEAN_STATE = 'CLEAN_STATE';
    //pobieranie danych dla użytkownika 
    export const RA_PREVIEW = 'RA_PREVIEW';
    export const FETCH_RA_FAIL= 'FETCH_RA_FAIL';
    //ustalanie rodzaju oceny ryzyka
    export const RA_TYPE = 'RA_TYPE';

//RiskAssessmentOutput
    //archiwizowanie oceny ryzyka
    export const ARCHIVE_INIT = 'ARCHIVE_INIT';
    export const ARCHIVE_SUCCESS = 'ARCHIVE_SUCCESS';
    export const ARCHIVE_FAIL = 'ARCHIVE_FAIL';
    export const RA_OUTPUT_CLEAN = 'RA_OUTPUT_CLEAN';

//ArchiveHistory
    export const ARCHIVE_HISTORY_INIT = 'ARCHIVE_HISTORY_INIT';
    export const FETCH_ARCHIVE_HISTORY_SUCCESS = 'FETCH_ARCHIVE_HISTIRY_SUCCESS';
    export const FETCH_ARCHIVE_HISTORY_FAIL = 'FETCH_ARCHIVE_HISTIRY_FAIL';

//Authentication
    export const INIT_LOGIN = 'INIT_LOGIN';
    export const INIT_LOGOUT = 'INIT_LOGOUT';
    export const INIT_SIGNUP = 'INIT_SIGNUP';
    export const LOGIN = 'LOGIN';
    export const LOGOUT = 'LOGOUT';
    export const LOGOUT_ERROR = 'LOGOUT_ERROR';
    export const LOGIN_ERROR = 'LOGIN_ERROR';
    export const SIGNUP = 'SIGNUP';
    export const SIGNUP_ERROR = 'SIGNUP_ERROR';
    export const CLEAN_ERROR = 'CLEAN_ERROR'

