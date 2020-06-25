import { ItemIEO, OrderIEOData, SalePair } from './';
import {
    IEO_ADD_DATA,
    IEO_ADD_ERROR,
    IEO_ADD_FETCH,
    IEO_EDIT_DATA,
    IEO_EDIT_ERROR,
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

export interface ListIEOFetch {
    type: typeof IEO_LIST_FETCH;
    payload: {
        page: number;
        limit: number;
        name?: string;
        currency_id?: string;
        state?: string;
    };
}

export interface ListIEOData {
    type: typeof IEO_LIST_DATA;
    payload: {
        list: ItemIEO[];
        total: number;
    };
}

export interface ListIEOError {
    type: typeof IEO_LIST_ERROR;
}

export interface AddIEOFetch {
    type: typeof IEO_ADD_FETCH;
    payload: {
        name: string;
        description?: string;
        currency_id: string;
        supply: number | string;
        low_goal?: string;
        commission?: string | number;
        owner_uid: string;
        result: string;
        lockup_percentage?: string;
        min_amount?: string;
        max_amount?: string;
        starts_at?: string;
        finishes_at?: string;
        pairs: SalePair[];
        min_unit?: string;
        type: string;
    };
    metadataPayload: string;
}

export interface AddIEOData {
    type: typeof IEO_ADD_DATA;
    payload: ItemIEO;
}

export interface AddIEOError {
    type: typeof IEO_ADD_ERROR;
}

export interface EditIEOFetch {
    type: typeof IEO_EDIT_FETCH;
    payload: {
        id: number | string;
        state?: string;
        params?: {
            name?: string;
            currency_id: string;
            description?: string;
            supply?: number | string;
            low_goal?: string;
            commission?: string | number;
            owner_uid?: string;
            result?: string;
            lockup_percentage?: string | number;
            min_amount?: string;
            max_amount?: string;
            starts_at?: string;
            finishes_at?: string;
            pairs?: SalePair[];
            min_unit?: string;
            type: string;
        }
    };
}

export interface EditIEOData {
    type: typeof IEO_EDIT_DATA;
    payload: ItemIEO;
}

export interface EditIEOError {
    type: typeof IEO_EDIT_ERROR;
}

export interface GetIEOFetch {
    type: typeof IEO_GET_FETCH;
    payload: {
        id: number | string;
    };
}

export interface GetIEOData {
    type: typeof IEO_GET_DATA;
    payload: {
        ieo: ItemIEO | null;
        details?: any; // tslint:disable-line
    };
}

export interface GetIEOError {
    type: typeof IEO_GET_ERROR;
}

export interface SetCurrentIEO {
    type: typeof IEO_SET_CURRENT_IEO;
    payload: ItemIEO;
}

export interface SetCurrentIEOIfUnset {
    type: typeof IEO_SET_CURRENT_IEO_IFUNSET;
    payload: ItemIEO;
}

export interface HistoryIEOFetch {
    type: typeof IEO_HISTORY_FETCH;
    payload: {
        state?: string;
        sale_id?: string;
        page: number;
        limit: number;
    };
}

export interface HistoryIEOData {
    type: typeof IEO_HISTORY_DATA;
    payload: {
        list: OrderIEOData[];
        total: number;
    };
}

export interface HistoryIEOError {
    type: typeof IEO_HISTORY_ERROR;
}

export interface HistoryIEOReset {
    type: typeof IEO_HISTORY_RESET;
}

export interface UpdateDetailsIEOFetch {
    type: typeof UPDATE_IEO_DETAILS_FETCH;
    payload: {
        id: string;
        value: string;
    };
}

export interface UpdateDetailsIEOData {
    type: typeof UPDATE_IEO_DETAILS_DATA;
    payload: string;
}

export interface UpdateDetailsIEOError {
    type: typeof UPDATE_IEO_DETAILS_ERROR;
}

export type IEOAction = ListIEOFetch
    | ListIEOData
    | ListIEOError
    | AddIEOFetch
    | AddIEOData
    | AddIEOError
    | EditIEOFetch
    | EditIEOData
    | EditIEOError
    | GetIEOFetch
    | GetIEOData
    | GetIEOError
    | SetCurrentIEO
    | SetCurrentIEOIfUnset
    | HistoryIEOData
    | HistoryIEOFetch
    | HistoryIEOError
    | HistoryIEOReset
    | UpdateDetailsIEOFetch
    | UpdateDetailsIEOData
    | UpdateDetailsIEOError;

export const getListIEO = (payload: ListIEOFetch['payload']): ListIEOFetch => ({
    type: IEO_LIST_FETCH,
    payload,
});

export const getListIEOData = (payload: ListIEOData['payload']): ListIEOData => ({
    type: IEO_LIST_DATA,
    payload,
});

export const getListIEOError = (): ListIEOError => ({
    type: IEO_LIST_ERROR,
});

export const addIEO = (
    payload: AddIEOFetch['payload'],
    metadataPayload: AddIEOFetch['metadataPayload'],
): AddIEOFetch => ({
    type: IEO_ADD_FETCH,
    payload,
    metadataPayload,
});

export const addIEOData =  (payload: AddIEOData['payload']): AddIEOData => ({
    type: IEO_ADD_DATA,
    payload,
});

export const addIEOError = (): AddIEOError => ({
    type: IEO_ADD_ERROR,
});

export const editIEO = (
    payload: EditIEOFetch['payload'],
): EditIEOFetch => ({
    type: IEO_EDIT_FETCH,
    payload,
});

export const editIEOData =  (payload: EditIEOData['payload']): EditIEOData => ({
    type: IEO_EDIT_DATA,
    payload,
});

export const editIEOError = (): EditIEOError => ({
    type: IEO_EDIT_ERROR,
});

export const getIEO = (payload: GetIEOFetch['payload']): GetIEOFetch => ({
    type: IEO_GET_FETCH,
    payload,
});

export const getIEOData = (payload: GetIEOData['payload']): GetIEOData => ({
    type: IEO_GET_DATA,
    payload,
});

export const getIEOError = (): GetIEOError => ({
    type: IEO_GET_ERROR,
});

export const setCurrentIEO =
    (payload: SetCurrentIEO['payload']): SetCurrentIEO => ({
        type: IEO_SET_CURRENT_IEO,
        payload,
    });

export const setCurrentIEOIfUnset =
    (payload: SetCurrentIEOIfUnset['payload']): SetCurrentIEOIfUnset => ({
        type: IEO_SET_CURRENT_IEO_IFUNSET,
        payload,
    });

export const historyIEOFetch = (payload: HistoryIEOFetch['payload']): HistoryIEOFetch => ({
    type: IEO_HISTORY_FETCH,
    payload,
});

export const historyIEOData = (payload: HistoryIEOData['payload']): HistoryIEOData => ({
    type: IEO_HISTORY_DATA,
    payload,
});

export const historyIEOError = (): HistoryIEOError => ({
    type: IEO_HISTORY_ERROR,
});

export const historyIEOReset = (): HistoryIEOReset => ({
    type: IEO_HISTORY_RESET,
});

export const updateDetailsIEOFetch = (payload: UpdateDetailsIEOFetch['payload']): UpdateDetailsIEOFetch => ({
    type: UPDATE_IEO_DETAILS_FETCH,
    payload,
});

export const updateDetailsIEOData = (payload: UpdateDetailsIEOData['payload']): UpdateDetailsIEOData => ({
    type: UPDATE_IEO_DETAILS_DATA,
    payload,
});

export const updateDetailsIEOError = (): UpdateDetailsIEOError => ({
    type: UPDATE_IEO_DETAILS_ERROR,
});
