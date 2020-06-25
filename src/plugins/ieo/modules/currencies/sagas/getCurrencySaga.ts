import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { alertPush } from '../../../../../modules';
import {
    CurrencyGetFetch,
    getCurrencyData,
    getCurrencyError,
} from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getCurrencySaga(action: CurrencyGetFetch) {
    try {
        const { data } = yield call(API.get(requestOptions), `/admin/currencies/${action.payload.code}`);
        yield put(getCurrencyData({currency: data}));
    } catch (error) {
        yield put(getCurrencyError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
