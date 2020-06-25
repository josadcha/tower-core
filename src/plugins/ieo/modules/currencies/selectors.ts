import { AppState } from '../../../../modules';
import { CurrenciesState } from './reducer';

export const selectCurrenciesList = (state: AppState): CurrenciesState['list'] =>
    state.plugins.ieo.currencies.list;

export const selectCurrenciesListLoading = (state: AppState): CurrenciesState['loading'] =>
    state.plugins.ieo.currencies.loading;

export const selectCurrenciesListTotal = (state: AppState): CurrenciesState['total'] =>
    state.plugins.ieo.currencies.total;

export const selectCurrency = (state: AppState): CurrenciesState['currency'] =>
    state.plugins.ieo.currencies.currency;
