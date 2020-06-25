import { push } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { getCsrfToken, peatioRequestOptions } from '../../../../../helpers';
import { alertPush } from '../../../../../modules';
import {
    CurrencyEditFetch,
    editCurrencyData,
    editCurrencyError,
} from '../actions';

export function* editCurrencySaga(action: CurrencyEditFetch) {
    try {
        const { data } = yield call(API.post(peatioRequestOptions(getCsrfToken())), '/admin/currencies/update', action.payload);
        yield put(editCurrencyData({currency: data}));
        yield put(alertPush({message: ['Currency successfully updated'], type: 'success'}));
        yield put(push('/tower/exchange/currencies'));
    } catch (error) {
        yield put(editCurrencyError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
