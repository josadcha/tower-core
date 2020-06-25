import { AppState } from '../../../../modules';
import { StateIEO } from './reducer';
import { OrderIEOData } from './types';

export const selectIEOList = (state: AppState): StateIEO['list'] =>
    state.plugins.ieo.ieoPlugin.list;

export const selectIEOListLoading = (state: AppState): StateIEO['loading'] =>
    state.plugins.ieo.ieoPlugin.loading;

export const selectIEOListTotal = (state: AppState): StateIEO['total'] =>
    state.plugins.ieo.ieoPlugin.total;

export const selectIEO = (state: AppState): StateIEO['ieoItem'] =>
    state.plugins.ieo.ieoPlugin.ieoItem;

export const selectIEODetails = (state: AppState): StateIEO['ieoDetails'] =>
    state.plugins.ieo.ieoPlugin.ieoDetails;

export const selectCurrentIEO = (state: AppState): StateIEO['currentIEO'] =>
    state.plugins.ieo.ieoPlugin.currentIEO;

export const selectIEOHistoryData = (state: AppState): OrderIEOData[] =>
    state.plugins.ieo.ieoPlugin.history;

export const selectIEOHistoryLoading = (state: AppState): boolean =>
    state.plugins.ieo.ieoPlugin.loadingHistory;

export const selectIEOHistoryTotal = (state: AppState): number =>
    state.plugins.ieo.ieoPlugin.totalHistory;

export const selectIEOError = (state: AppState): boolean =>
    state.plugins.ieo.ieoPlugin.error;
