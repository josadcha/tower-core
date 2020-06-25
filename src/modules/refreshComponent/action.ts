import {
    CURRENT_REFRESH_STATUS,
} from '../constants';

export interface ChangeCurrentRefreshStatus {
    type: typeof CURRENT_REFRESH_STATUS;
    payload: {
        currentRefreshStatus: boolean,
    };
}

export type RefreshAction = ChangeCurrentRefreshStatus;

export const changeCurrentRefreshStatus = (
    payload: ChangeCurrentRefreshStatus['payload'],
) : ChangeCurrentRefreshStatus => ({
    type: CURRENT_REFRESH_STATUS,
    payload,
});
