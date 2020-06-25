import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { buildQueryString } from '../../../../../helpers';
import { alertPush } from '../../../../../modules';
import {
    historyIEOData,
    historyIEOError,
    HistoryIEOFetch,
} from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* ieoHistorySaga(action: HistoryIEOFetch) {
    try {
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/ieo/orders?${params}`);
        yield put(historyIEOData({ list: data, total: headers.total }));
    } catch (error) {
        yield put(historyIEOError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
