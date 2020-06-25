import { History } from 'history';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import {
    IEOEdit,
    IEOHistory,
} from '../';
import { Tabs } from '../../../../components';

interface UsersState {
    activeIndex: number;
}

interface RouteProps {
    history: History;
}

type Props = RouteProps;

class IEOTabsComponent extends React.Component<Props, UsersState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            activeIndex: 0,
        };
    }

    private labels = [ 'Details', 'History' ];
    private routes = [ '/edit', '/history' ];

    public componentDidMount() {
        const { history } = this.props;

        this.routes.map((item, index) =>
            history.location.pathname.includes(item) && this.setState({ activeIndex: index }));
    }

    public UNSAFE_componentWillReceiveProps(next: Props) {
        const { history } = this.props;

        if (next.history && next.history.location.pathname !== history.location.pathname) {
            this.routes.map((item, index) =>
                history.location.pathname.includes(item) && this.setState({ activeIndex: index }));
        }
    }

    public render() {
        const { activeIndex } = this.state;

        return (
            <React.Fragment>
                <Tabs
                    labels={this.labels}
                    handleChange={this.handleChangeTab}
                    activeIndex={activeIndex}
                />
                {this.renderContent()}
            </React.Fragment>
        );
    }

    private handleChangeTab =  (event: React.ChangeEvent<{}>, index: number) => {
        const { history } = this.props;
        this.setState({ activeIndex: index });
        const consist = history.location.pathname.split('/').splice(1,4).join('/');
        this.props.history.push(`/${consist}${this.routes[index]}`);
    };

    private renderContent = () => {
        const { activeIndex } = this.state;
        switch (activeIndex) {
            case 0:
                return <IEOEdit />;
            case 1:
                return <IEOHistory />;
            default:
                return;
        }
    };
}

//tslint:disable-next-line:no-any
export const IEOTabs = withRouter(IEOTabsComponent as any);
