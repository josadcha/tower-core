import { AppState, CurrentRefreshState } from '../';

export const selectCurrentRefreshState = (state: AppState): CurrentRefreshState['refreshStatus'] =>
    state.refreshStatus.refreshStatus;
