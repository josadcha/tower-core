import {
    CURRENT_USER_RESET,
    GET_CURRENT_USER_DATA,
    GET_CURRENT_USER_ERROR,
    GET_CURRENT_USER_FETCH,
} from '../../constants';
import {
    CurrentUserAction,
    CurrentUserInterface,
} from './actions';

export interface CurrentUserState {
    loading: boolean;
    user: CurrentUserInterface;
}

export const initialCurrentUserState: CurrentUserState = {
    loading: true,
    user: {
        email: '',
        level: 0,
        otp: false,
        role: '',
        state: '',
        uid: '',
        profiles: [],
    },
};

export const currentUserReducer = (state = initialCurrentUserState, action: CurrentUserAction) => {
    switch (action.type) {
        case GET_CURRENT_USER_FETCH:
            return { ...state, loading: true };
        case GET_CURRENT_USER_DATA:
            return { ...state, loading: false, user: action.payload };
        case GET_CURRENT_USER_ERROR:
            return { ...state, loading: false };
            case CURRENT_USER_RESET:
                return { ...state, user: initialCurrentUserState.user };
        default:
            return { ...state };
    }
};
