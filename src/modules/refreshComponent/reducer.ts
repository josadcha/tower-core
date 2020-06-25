import {
    CURRENT_REFRESH_STATUS,
} from '../constants';
import { RefreshAction } from './action';

export interface CurrentRefreshState {
    refreshStatus: boolean;
}

export const initialRefreshStatus: CurrentRefreshState = {
    refreshStatus: false,
};

export const currentRefreshReducer = (state = initialRefreshStatus, action: RefreshAction) => {
    switch (action.type) {
        case CURRENT_REFRESH_STATUS:
            return {
                ...state,
                refreshStatus: action.payload.currentRefreshStatus,
            };
        default:
            return {
                ...state,
            };
    }
};
