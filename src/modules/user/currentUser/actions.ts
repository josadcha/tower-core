import { UserProfile } from '../';
import {
    CURRENT_USER_RESET,
    GET_CURRENT_USER_DATA,
    GET_CURRENT_USER_ERROR,
    GET_CURRENT_USER_FETCH,
} from '../../constants';

export interface CurrentUserInterface {
    email: string;
    level: number;
    otp: boolean;
    role: string;
    state: string;
    uid: string;
    profiles: UserProfile[];
    csrf_token?: string;
}

export interface GetCurrentUserFetch {
    type: typeof GET_CURRENT_USER_FETCH;
}

export interface GetCurrentUserError {
    type: typeof GET_CURRENT_USER_ERROR;
}

export interface CurrentUserReset {
    type: typeof CURRENT_USER_RESET;
}

export interface GetCurrentUserData {
    type: typeof GET_CURRENT_USER_DATA;
    payload: CurrentUserInterface;
}

export type CurrentUserAction =
    | GetCurrentUserFetch
    | GetCurrentUserData
    | GetCurrentUserError
    | CurrentUserReset;

export const getCurrentUser = (): GetCurrentUserFetch => ({
    type: GET_CURRENT_USER_FETCH,
});

export const getCurrentUserError = (): GetCurrentUserError => ({
    type: GET_CURRENT_USER_ERROR,
});

export const getCurrentUserData = (payload: GetCurrentUserData['payload']): GetCurrentUserData => ({
    type: GET_CURRENT_USER_DATA,
    payload,
});

export const currentUserReset = (): CurrentUserReset => ({
    type: CURRENT_USER_RESET,
});
