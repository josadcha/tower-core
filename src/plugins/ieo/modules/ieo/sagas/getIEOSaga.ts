import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { buildQueryString } from '../../../../../helpers';
import { alertPush } from '../../../../../modules';
import {
    getListIEOData,
    getListIEOError,
    ListIEOFetch,
    setCurrentIEOIfUnset,
} from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* getIEOSaga(action: ListIEOFetch) {
    try {
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/ieo/sales?${params}`);
        yield put(getListIEOData({ list: data, total: headers.total }));
        yield put(setCurrentIEOIfUnset(data[0]));
    } catch (error) {
        yield put(getListIEOError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
