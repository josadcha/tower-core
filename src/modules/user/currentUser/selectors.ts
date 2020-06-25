import { AppState, CurrentUserState } from '../../';

export const selectCurrentUser = (state: AppState): CurrentUserState['user'] =>
    state.usersData.currentUser.user;

export const selectLoadingCurrentUser = (state: AppState): CurrentUserState['loading'] =>
    state.usersData.currentUser.loading;

export const selectCurrentUserLoggedIn = (state: AppState): boolean => {
    return !selectLoadingCurrentUser(state) && selectCurrentUser(state).state === 'active';
};
