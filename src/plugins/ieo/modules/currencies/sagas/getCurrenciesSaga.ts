import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { buildQueryString } from '../../../../../helpers';
import { alertPush } from '../../../../../modules';
import {
    CurrenciesListFetch,
    getCurrenciesListData,
    getCurrenciesListError,
} from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getCurrenciesSaga(action: CurrenciesListFetch) {
    try {
        let endPoint = '/admin/currencies';

        if (action.payload) {
            const params = buildQueryString(action.payload);
            endPoint = `/admin/currencies?${params}`;
        }

        const { data, headers } = yield call(API.get(requestOptions), endPoint);
        yield put(getCurrenciesListData({ list: data, total: headers.total }));
    } catch (error) {
        yield put(getCurrenciesListError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
