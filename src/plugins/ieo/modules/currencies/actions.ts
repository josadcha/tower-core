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

export interface CurrencyItem {
    name: string;
    symbol: string;
    type: string;
    deposit_fee: string;
    min_deposit_amount: string;
    withdraw_fee: string;
    min_withdraw_amount: string;
    withdraw_limit_24h: string;
    withdraw_limit_72h: string;
    base_factor: number;
    precision: number;
    min_confirmations: number;
    code: string;
    blockchain_key: string;
    min_collection_amount: string;
    position: number;
    visible: boolean;
    icon_url: string;
    created_at: string;
    updated_at: string;
    subunits: number;
    explorer_transaction?: string;
    explorer_address?: string;
    deposit_enabled: boolean;
    withdrawal_enabled: boolean;
    options;
}

export interface CurrenciesListFetch {
    type: typeof CURRENCIES_LIST_FETCH;
    payload?: {
        page?: number;
        limit?: number;
        ordering?: string;
    };
}

export interface CurrenciesListData {
    type: typeof CURRENCIES_LIST_DATA;
    payload: {
        list: CurrencyItem[];
        total: number;
    };
}

export interface CurrenciesListError {
    type: typeof CURRENCIES_LIST_ERROR;
}

export interface CurrencyAddFetch {
    type: typeof CURRENCY_ADD_FETCH;
    payload: {
        code: string;
        symbol: string;
        blockchain_key?: string;
        name?: string;
        type?: string;
        subunits?: number;
        precision?: number;
        deposit_fee?: string;
        min_deposit_amount?: string;
        min_collection_amount?: string;
        withdraw_fee?: string;
        min_withdraw_amount?: string;
        withdraw_limit_24h?: string;
        withdraw_limit_72h?: string;
        position?: number;
        icon_url?: string;
        visible?: boolean;
        deposit_enabled?: boolean;
        withdrawal_enabled?: boolean;
        options?;
    };
}

export interface CurrencyAddData {
    type: typeof CURRENCY_ADD_DATA;
    payload: {
        currency: CurrencyItem;
    };
}

export interface CurrencyAddError {
    type: typeof CURRENCY_ADD_ERROR;
}

export interface CurrencyEditFetch {
    type: typeof CURRENCY_EDIT_FETCH;
    payload: {
        code: string;
        symbol?: string;
        blockchain_key?: string;
        base_factor?: number;
        name?: string;
        type?: string;
        subunits?: number;
        precision?: number;
        deposit_fee?: string;
        min_deposit_amount?: string;
        min_collection_amount?: string;
        withdraw_fee?: string;
        min_withdraw_amount?: string;
        withdraw_limit_24h?: string;
        withdraw_limit_72h?: string;
        position?: number;
        icon_url?: string,
        visible?: boolean,
        deposit_enabled?: boolean;
        withdrawal_enabled?: boolean;
        options?;
    };
}

export interface CurrencyEditData {
    type: typeof CURRENCY_EDIT_DATA;
    payload: {
        currency: CurrencyItem;
    };
}

export interface CurrencyEditError {
    type: typeof CURRENCY_EDIT_ERROR;
}

export interface CurrencyGetFetch {
    type: typeof CURRENCY_GET_FETCH;
    payload: {
        code: string;
    };
}

export interface CurrencyGetData {
    type: typeof CURRENCY_GET_DATA;
    payload: {
        currency: CurrencyItem;
    };
}

export interface CurrencyGetError {
    type: typeof CURRENCY_GET_ERROR;
}

export type CurrenciesAction = CurrenciesListFetch
    | CurrenciesListData
    | CurrenciesListError
    | CurrencyAddFetch
    | CurrencyAddData
    | CurrencyAddError
    | CurrencyEditFetch
    | CurrencyEditData
    | CurrencyEditError
    | CurrencyGetFetch
    | CurrencyGetData
    | CurrencyGetError;

export const getCurrenciesList = (payload?: CurrenciesListFetch['payload']): CurrenciesListFetch => ({
    type: CURRENCIES_LIST_FETCH,
    payload,
});

export const getCurrenciesListData = (payload: CurrenciesListData['payload']): CurrenciesListData => ({
    type: CURRENCIES_LIST_DATA,
    payload,
});

export const getCurrenciesListError = (): CurrenciesListError => ({
    type: CURRENCIES_LIST_ERROR,
});

export const addCurrency = (payload: CurrencyAddFetch['payload']): CurrencyAddFetch => ({
    type: CURRENCY_ADD_FETCH,
    payload,
});

export const addCurrencyData =  (payload: CurrencyAddData['payload']): CurrencyAddData => ({
    type: CURRENCY_ADD_DATA,
    payload,
});

export const addCurrencyError = (): CurrencyAddError => ({
    type: CURRENCY_ADD_ERROR,
});

export const editCurrency = (payload: CurrencyEditFetch['payload']): CurrencyEditFetch => ({
    type: CURRENCY_EDIT_FETCH,
    payload,
});

export const editCurrencyData =  (payload: CurrencyEditData['payload']): CurrencyEditData => ({
    type: CURRENCY_EDIT_DATA,
    payload,
});

export const editCurrencyError = (): CurrencyEditError => ({
    type: CURRENCY_EDIT_ERROR,
});

export const getCurrency = (payload: CurrencyGetFetch['payload']): CurrencyGetFetch => ({
    type: CURRENCY_GET_FETCH,
    payload,
});

export const getCurrencyData = (payload: CurrencyGetData['payload']): CurrencyGetData => ({
    type: CURRENCY_GET_DATA,
    payload,
});

export const getCurrencyError = (): CurrencyGetError => ({
    type: CURRENCY_GET_ERROR,
});
