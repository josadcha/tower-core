import { AlertState, AppState } from '../';

export const selectAlertState = (state: AppState): AlertState => state.alert;
