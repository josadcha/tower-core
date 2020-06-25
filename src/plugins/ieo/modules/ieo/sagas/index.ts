import { takeLatest } from 'redux-saga/effects';
import {
    IEO_ADD_FETCH,
    IEO_EDIT_FETCH,
    IEO_GET_FETCH,
    IEO_HISTORY_FETCH,
    IEO_LIST_FETCH,
    UPDATE_IEO_DETAILS_FETCH,
} from '../constants';
import { addIEOSaga } from './addIEOSaga';
import { editIEOSaga } from './editIEOSaga';
import { getIEOItemSaga } from './getIEOItemSaga';
import { getIEOSaga } from './getIEOSaga';
import { updateDetailsIEOSaga } from './handleUpdateDetails';
import { ieoHistorySaga } from './ieoHistorySaga';

export function* rootIEOSaga() {
    yield takeLatest(IEO_LIST_FETCH, getIEOSaga);
    yield takeLatest(IEO_ADD_FETCH, addIEOSaga);
    yield takeLatest(IEO_EDIT_FETCH, editIEOSaga);
    yield takeLatest(IEO_GET_FETCH, getIEOItemSaga);
    yield takeLatest(IEO_HISTORY_FETCH, ieoHistorySaga);
    yield takeLatest(UPDATE_IEO_DETAILS_FETCH ,updateDetailsIEOSaga);
}
