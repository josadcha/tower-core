import { IEOAction, ItemIEO, OrderIEOData } from './';
import {
    IEO_ADD_DATA,
    IEO_ADD_FETCH,
    IEO_EDIT_DATA,
    IEO_EDIT_FETCH,
    IEO_GET_DATA,
    IEO_GET_ERROR,
    IEO_GET_FETCH,
    IEO_HISTORY_DATA,
    IEO_HISTORY_ERROR,
    IEO_HISTORY_FETCH,
    IEO_HISTORY_RESET,
    IEO_LIST_DATA,
    IEO_LIST_ERROR,
    IEO_LIST_FETCH,
    IEO_SET_CURRENT_IEO,
    IEO_SET_CURRENT_IEO_IFUNSET,
    UPDATE_IEO_DETAILS_DATA,
    UPDATE_IEO_DETAILS_ERROR,
    UPDATE_IEO_DETAILS_FETCH,
} from './constants';

export interface StateIEO {
    loading: boolean;
    total: number;
    list: ItemIEO[];
    ieoItem?: ItemIEO | null;
    ieoDetails?: any; // tslint:disable-line
    currentIEO?: ItemIEO;
    history: OrderIEOData[];
    totalHistory: number;
    loadingHistory: boolean;
    success: boolean;
    error: boolean;
}

export const initialStateIEO: StateIEO = {
    loading: false,
    list: [],
    total: 0,
    success: false,
    history: [],
    loadingHistory: false,
    totalHistory: 0,
    error: false,
};

export const ieoReducer = (state = initialStateIEO, action: IEOAction) => {
    switch (action.type) {
        case IEO_LIST_FETCH:
            return {
                ...state,
                loading: true,
            };
        case IEO_LIST_DATA:
            return {
                ...state,
                loading: false,
                list: action.payload.list,
                total: action.payload.total,
            };
        case IEO_LIST_ERROR:
            return {
                ...state,
                loading: false,
                list: [],
                total: 0,
            };
        case IEO_ADD_FETCH:
            return {
                ...state,
                loading: true,
            };
        case IEO_ADD_DATA:
            return {
                ...state,
                loading: false,
            };
        case IEO_EDIT_FETCH:
            return {
                ...state,
                loading: true,
            };
        case IEO_EDIT_DATA:
            return {
                ...state,
                loading: false,
            };
        case IEO_GET_FETCH:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case IEO_GET_DATA:
            return {
                ...state,
                loading: false,
                ieoItem: action.payload.ieo,
                ieoDetails: action.payload.details,
                currentIEO: action.payload.ieo ? action.payload.ieo : state.currentIEO,
                error: false,
            };
        case IEO_GET_ERROR:
            return {
                ...state,
                error: true,
                loading: false,
                ieoItem: undefined,
            };
        case IEO_SET_CURRENT_IEO:
            return {
                ...state,
                currentIEO: action.payload,
            };
        case IEO_SET_CURRENT_IEO_IFUNSET:
            if (state.currentIEO) {
                return state;
            }

            return {
                ...state,
                currentIEO: action.payload,
            };
        case IEO_HISTORY_FETCH:
            return {
                ...state,
                success: false,
                loading: true,
            };
        case IEO_HISTORY_DATA:
            return {
                ...state,
                success: true,
                loadingHistory: false,
                history: action.payload.list,
                totalHistory: action.payload.total,
            };
        case IEO_HISTORY_ERROR:
            return {
                ...state,
                success: false,
                loadingHistory: false,
                history: [],
                totalHistory: 0,
            };
        case IEO_HISTORY_RESET:
            return {
                ...state,
                success: false,
                loadingHistory: false,
                history: [],
                totalHistory: 0,
            };
        case UPDATE_IEO_DETAILS_FETCH:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_IEO_DETAILS_DATA:
            return {
                ...state,
                loading: false,
                error: false,
                ieoDetails: action.payload,
            };
        case UPDATE_IEO_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return {
                ...state,
            };
    }
};
