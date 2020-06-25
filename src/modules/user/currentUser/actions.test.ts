import * as actions from './actions';

describe('CurrentUser actions', () => {
    it('should check getCurrentUser action creator', () => {
        const expectedAction = { type: 'GET_CURRENT_USER_FETCH' };
        expect(actions.getCurrentUser()).toEqual(expectedAction);
    });

    it('should check getCurrentUserData action creator', () => {
        const payload = {
            email: '',
            level: 0,
            otp: false,
            role: '',
            state: '',
            uid: '',
            profiles: [],
        };
        const expectedAction = { type: 'GET_CURRENT_USER_DATA', payload };
        expect(actions.getCurrentUserData(payload)).toEqual(expectedAction);
    });

    it('should check currentUserReset action creator', () => {
        const expectedAction = { type: 'CURRENT_USER_RESET' };
        expect(actions.currentUserReset()).toEqual(expectedAction);
    });

    it('should check getCurrentUserError action creator', () => {
        const expectedAction = { type: 'GET_CURRENT_USER_ERROR' };
        expect(actions.getCurrentUserError()).toEqual(expectedAction);
    });
});
