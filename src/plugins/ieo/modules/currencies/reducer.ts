import { CurrenciesAction, CurrencyItem } from './actions';
import {
    CURRENCIES_LIST_DATA,
    CURRENCIES_LIST_ERROR,
    CURRENCIES_LIST_FETCH,
    CURRENCY_ADD_DATA,
    CURRENCY_ADD_ERROR,
    CURRENCY_ADD_FETCH,
    CURRENCY_EDIT_DATA,
    CURRENCY_EDIT_ERROR,
    CURRENCY_EDIT_FETCH,
    CURRENCY_GET_DATA,
    CURRENCY_GET_ERROR,
    CURRENCY_GET_FETCH,
} from './constants';

export interface CurrenciesState {
    loading: boolean;
    total: number;
    list: CurrencyItem[];
    currency?: CurrencyItem;
}

export const initialCurrenciesState: CurrenciesState = {
    loading: false,
    list: [],
    total: 0,
};

export const currenciesReducer = (state = initialCurrenciesState, action: CurrenciesAction) => {
    switch (action.type) {
        case CURRENCIES_LIST_FETCH:
            return {
                ...state,
                loading: true,
            };
        case CURRENCIES_LIST_DATA:
            return {
                ...state,
                loading: false,
                list: action.payload.list,
                total: action.payload.total,
            };
        case CURRENCIES_LIST_ERROR:
            return {
                ...state,
                loading: false,
                list: [],
                total: 0,
            };
        case CURRENCY_ADD_FETCH:
            return {
                ...state,
                loading: true,
            };
        case CURRENCY_ADD_DATA:
            return {
                ...state,
                loading: false,
            };
        case CURRENCY_ADD_ERROR:
            return {
                ...state,
                loading: false,
            };
        case CURRENCY_EDIT_FETCH:
            return {
                ...state,
                loading: true,
            };
        case CURRENCY_EDIT_DATA:
            return {
                ...state,
                loading: false,
            };
        case CURRENCY_EDIT_ERROR:
            return {
                ...state,
                loading: false,
            };
        case CURRENCY_GET_FETCH:
            return {
                ...state,
                loading: true,
            };
        case CURRENCY_GET_DATA:
            return {
                ...state,
                loading: false,
                currency: action.payload.currency,
            };
        case CURRENCY_GET_ERROR:
            return {
                ...state,
                loading: false,
                currency: undefined,
            };
        default:
            return {
                ...state,
            };
    }
};
