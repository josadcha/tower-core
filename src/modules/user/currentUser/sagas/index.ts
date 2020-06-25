import { takeLatest } from 'redux-saga/effects';
import { GET_CURRENT_USER_FETCH } from '../../../constants';
import { getCurrentUserSaga } from './getCurrentUserSaga';

export function* rootCurrentUsersSaga() {
    yield takeLatest(GET_CURRENT_USER_FETCH, getCurrentUserSaga);
}
