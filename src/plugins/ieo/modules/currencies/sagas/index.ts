import { takeLatest } from 'redux-saga/effects';
import { CURRENCIES_LIST_FETCH, CURRENCY_ADD_FETCH, CURRENCY_EDIT_FETCH, CURRENCY_GET_FETCH } from '../constants';
import { addCurrencySaga } from './addCurrencySaga';
import { editCurrencySaga } from './editCurrencySaga';
import { getCurrenciesSaga } from './getCurrenciesSaga';
import { getCurrencySaga } from './getCurrencySaga';


export function* rootCurrenciesSaga() {
    yield takeLatest(CURRENCIES_LIST_FETCH, getCurrenciesSaga);
    yield takeLatest(CURRENCY_ADD_FETCH, addCurrencySaga);
    yield takeLatest(CURRENCY_EDIT_FETCH, editCurrencySaga);
    yield takeLatest(CURRENCY_GET_FETCH, getCurrencySaga);
}
