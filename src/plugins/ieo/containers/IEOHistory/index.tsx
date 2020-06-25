import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tablePageLimit } from '../../../../api/config';
import { Table } from '../../../../components';
import { formatDecimal } from '../../../../helpers';
import {
    AppState,
} from '../../../../modules';
import { IEOHistoryInfo } from '../../components';
import {
    CurrencyItem,
    getCurrenciesList,
    getIEO,
    historyIEOFetch,
    historyIEOReset,
    ItemIEO,
    OrderIEOData,
    selectCurrenciesList,
    selectIEO,
    selectIEOHistoryData,
    selectIEOHistoryTotal,
} from '../../modules';

interface State {
    page: number;
    rowsPerPage: number;
}

interface ReduxProps {
    total: number;
    list: OrderIEOData[];
    ieo?: ItemIEO | null;
    currencies: CurrencyItem[];
}

interface DispatchProps {
    getIEOItem: typeof getIEO;
    getHistoryIEO: typeof historyIEOFetch;
    getCurrenciesList: typeof getCurrenciesList;
    historyIEOReset: typeof historyIEOReset;
}

interface HistoryProps {
    history: History;
}

interface LocationProps {
    match: {
        params: {
            id: string;
        };
    };
}

type Props = ReduxProps & DispatchProps & HistoryProps & LocationProps;

class IEOHistoryContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
        };
    }

    public ieoRows = (ieo?: ItemIEO | null) => [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'uid', alignRight: false, label: 'UID' },
        {
            key: 'contribution',
            alignRight: false,
            label: `Placed, ${ieo && ieo.pairs[0].quote_currency_id.toUpperCase()}`,
        },
        { key: 'executed', alignRight: false, label: `To pay, ${ieo && ieo.pairs[0].quote_currency_id.toUpperCase()}` },
        { key: 'fees', alignRight: false, label: `Fees, ${ieo && ieo.pairs[0].quote_currency_id.toUpperCase()}` },
        { key: 'tokens_received', alignRight: false, label: `Received, ${ieo && ieo.currency_id.toUpperCase()}` },
        { key: 'tokens_locked', alignRight: false, label: `Locked, ${ieo && ieo.currency_id.toUpperCase()}`},
        { key: 'created_at', alignRight: false, label: 'Date' },
        { key: 'state', alignRight: false, label: 'State' },
    ];

    public componentDidMount() {
        this.props.getHistoryIEO({
            page: this.state.page + 1,
            limit: tablePageLimit(),
            sale_id: this.props.match.params.id,
        });
        this.props.getIEOItem({ id: this.props.match.params.id });
        if (!this.props.currencies.length) {
            this.props.getCurrenciesList();
        }
    }

    public componentWillUnmount() {
        this.props.historyIEOReset();
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.getIEOItem({ id: nextProps.match.params.id });
        }
    }

    public render() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        const { total, ieo } = this.props;

        return (
            <React.Fragment>
                <IEOHistoryInfo
                    token={ieo ? ieo.currency_id : ''}
                    price={ieo ? ieo.pairs[0].price : ''}
                    ratio={ieo ? ieo.ratio : ''}
                    soldAmount={ieo ? ieo.collected_amount : ''}
                />
                <Table
                    dataLength={total}
                    rows={this.ieoRows(ieo)}
                    data={this.formatIEOList()}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </React.Fragment>
        );
    }

    private handleChangePage = (page: number) => {
        const { rowsPerPage } = this.state;
        this.setState({ page });
        this.handleGetHistoryIEO(rowsPerPage, page);
    };

    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({rowsPerPage: rows, page: 0});
        this.handleGetHistoryIEO(rows, 0);
    };

    private handleGetHistoryIEO = (limit: number, page: number) => {
        const payload = {
            page: page + 1,
            limit,
            sale_id: this.props.match.params.id,
        };

        this.props.getHistoryIEO(payload);
    };

    private formatIEOList = () => {
        const { list } = this.props;

        return list.map((item: OrderIEOData) => {
            const { contribution, commission_rate, quote_currency } = item;

            const fees = formatDecimal(
                Number(contribution) * Number(commission_rate),
                this.getPrecision(quote_currency),
            );

            return {
                ...item,
                fees,
            };
        });
    };

    private getPrecision = name => {
        const { currencies } = this.props;

        return currencies.length &&
            currencies.filter(item => item.code.toLowerCase() === name.toLowerCase())[0].precision;
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        list: selectIEOHistoryData(state),
        total: selectIEOHistoryTotal(state),
        ieo: selectIEO(state),
        currencies: selectCurrenciesList(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getHistoryIEO: payload => dispatch(historyIEOFetch(payload)),
    getIEOItem: payload => dispatch(getIEO(payload)),
    getCurrenciesList: payload => dispatch(getCurrenciesList(payload)),
    historyIEOReset: () => dispatch(historyIEOReset()),
});

// tslint:disable-next-line:no-any
export const IEOHistory = withRouter(connect(mapStateToProps, mapDispatchToProps)(IEOHistoryContainer) as any);
