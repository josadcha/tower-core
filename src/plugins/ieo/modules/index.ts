import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import {
    ieoReducer,
    rootIEOSaga,
    StateIEO,
} from './';
import {
    currenciesReducer,
    CurrenciesState,
    rootCurrenciesSaga,
} from './currencies';

export * from './ieo';
export * from './currencies';

export interface IEOPluginState {
    ieoPlugin: StateIEO;
    currencies: CurrenciesState;
}

export const ieoPluginReducer = combineReducers({
    ieoPlugin: ieoReducer,
    currencies: currenciesReducer,
});

export function* rootIEOPluginsSaga() {
    yield all([
        call(rootIEOSaga),
        call(rootCurrenciesSaga),
    ]);
}
