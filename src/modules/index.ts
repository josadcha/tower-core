import { all, call } from 'redux-saga/effects';
import { PluginsState } from '../plugins/PluginsTemplate';
import { AlertState, rootHandleAlertSaga } from './alert';
import { CurrentFilterState } from './filter';
import { CurrentRefreshState } from './refreshComponent';
import {
    CurrentUserState,
    rootCurrentUsersSaga,
} from './user';

export * from './alert';
export * from './filter';
export * from './refreshComponent';
export * from './user';

export interface AppState {
    alert: AlertState;
    filterStatus: CurrentFilterState;
    refreshStatus: CurrentRefreshState;
    usersData: {
        currentUser: CurrentUserState,
    };
    plugins: PluginsState;
}


export function* rootSaga() {
    yield all([
        call(rootHandleAlertSaga),
        call(rootCurrentUsersSaga),
    ]);
}
