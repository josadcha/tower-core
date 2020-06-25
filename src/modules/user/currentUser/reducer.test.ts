import * as actions from './actions';
import { currentUserReducer, initialCurrentUserState } from './reducer';

describe('CurrentUser reducer', () => {
    it('should handle GET_CURRENT_USER_FETCH', () => {
        const expectedState = {
            ...initialCurrentUserState,
            loading: true,
        };
        expect(currentUserReducer(initialCurrentUserState, actions.getCurrentUser())).toEqual(expectedState);
    });

    it('should handle GET_CURRENT_USER_DATA', () => {
        const fakeUser = {
            email: '',
            level: 0,
            otp: false,
            role: '',
            state: '',
            uid: '',
            profiles: [],
        };
        const expectedState = {
            ...initialCurrentUserState,
            loading: false,
            user: fakeUser,
        };
        expect(currentUserReducer(
            initialCurrentUserState,
            actions.getCurrentUserData(fakeUser),
        )).toEqual(expectedState);
    });

    it('should handle GET_CURRENT_USER_ERROR', () => {
        const expectedState = {
            ...initialCurrentUserState,
            loading: false,
        };
        expect(currentUserReducer(initialCurrentUserState, actions.getCurrentUserError())).toEqual(expectedState);
    });
});
