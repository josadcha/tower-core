import { push } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { getCsrfToken, peatioRequestOptions } from '../../../../../helpers';
import { alertPush } from '../../../../../modules';
import {
    addCurrencyData,
    addCurrencyError,
    CurrencyAddFetch,
} from '../actions';

export function* addCurrencySaga(action: CurrencyAddFetch) {
    try {
        const { data } = yield call(API.post(peatioRequestOptions(getCsrfToken())), '/admin/currencies/new', action.payload);
        yield put(addCurrencyData({currency: data}));
        yield put(alertPush({message: ['Currency successfully created'], type: 'success'}));
        yield put(push('/tower/exchange/currencies'));
    } catch (error) {
        yield put(addCurrencyError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
