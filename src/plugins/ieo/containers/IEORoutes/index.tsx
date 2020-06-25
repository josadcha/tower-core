import * as React from 'react';
import {
    connect,
    MapStateToProps,
} from 'react-redux';
import { compose } from 'redux';
import {
    IEO,
    IEOCreate,
    IEOTabs,
} from '../';
import { PrivateRoute } from '../../../../components';
import {
    AppState,
    selectCurrentUserLoggedIn,
    selectLoadingCurrentUser,
} from '../../../../modules';

interface ReduxProps {
    userLoading: boolean;
    isCurrentSession: boolean;
}

const IEORoutesComponent: React.FunctionComponent<ReduxProps> = props => {
    const { userLoading, isCurrentSession } = props;

    return (
        <>
            <PrivateRoute
                loading={userLoading}
                isLogged={isCurrentSession}
                exact={true}
                path="/tower/plugins/ieo/:id/edit"
                component={IEOTabs}
            />
            <PrivateRoute
                loading={userLoading}
                isLogged={isCurrentSession}
                exact={true}
                path="/tower/plugins/ieo/:id/history"
                component={IEOTabs}
            />
            <PrivateRoute
                loading={userLoading}
                isLogged={isCurrentSession}
                exact={true}
                path="/tower/plugins/ieo/add"
                component={IEOCreate}
            />
            <PrivateRoute
                loading={userLoading}
                isLogged={isCurrentSession}
                exact={true}
                path="/tower/plugins/ieo"
                component={IEO}
            />
        </>
    );
};

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> = (state: AppState): ReduxProps => ({
    userLoading: selectLoadingCurrentUser(state),
    isCurrentSession: selectCurrentUserLoggedIn(state),
});

export const IEORoutes = compose(
    connect(mapStateToProps, null),
)(IEORoutesComponent as any); // tslint:disable-line: no-any
