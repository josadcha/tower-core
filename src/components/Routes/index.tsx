import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

const renderLoading = () => {
    return (
        <div>Loading...</div>
    );
};

//tslint:disable-next-line no-any
export const PublicRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoading();
    }

    if (isLogged) {
        return <Route {...rest}><Redirect to={'/tower'} /></Route>;
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;

    return <Route {...rest} render={renderCustomerComponent} />;
};

// tslint:disable-next-line
export const PrivateRoute: React.SFC<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoading();
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;

    if (isLogged) {
        return <Route {...rest} render={renderCustomerComponent} />;
    }

    return (
        <Route {...rest}>
            <Redirect to={'/tower/login'} />
        </Route>
    );
};
