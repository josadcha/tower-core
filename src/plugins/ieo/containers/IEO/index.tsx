import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tablePageLimit } from '../../../../api/config';
import { DataItem, Table } from '../../../../components';
import { FilterContainer } from '../../../../containers';
import { formatDecimal, getItemFromRequest } from '../../../../helpers';
import {
    AppState,
} from '../../../../modules';
import {
    CurrencyItem,
    getCurrenciesList,
    getListIEO,
    ItemIEO,
    selectCurrenciesList,
    selectIEOList,
    selectIEOListTotal,
} from '../../modules';

interface State {
    page: number;
    rowsPerPage: number;
    filterName: string;
    filterState: string;
    filterCurrencyId: string;
}

interface ReduxProps {
    total: number;
    list: ItemIEO[];
    currencies: CurrencyItem[];
}

interface DispatchProps {
    getListIEO: typeof getListIEO;
    getCurrenciesList: typeof getCurrenciesList;
}

interface HistoryProps {
    history: History;
}

type Props = ReduxProps & DispatchProps & HistoryProps;

class IEOScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            filterName: '',
            filterState: '',
            filterCurrencyId: '',
        };
    }

    private IEORows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'name', alignRight: false, label: 'Name' },
        { key: 'currency_id', alignRight: false, label: 'Token' },
        { key: 'supply', alignRight: false, label: 'Amount for sale' },
        { key: 'collected_amount', alignRight: false, label: 'Sold amount' },
        { key: 'equivalent', alignRight: false, label: 'Equivalent' },
        { key: 'price', alignRight: false, label: 'Price' },
        { key: 'state', alignRight: false, label: 'State'},
    ];

    private filterData = [
        { property: 'name', value: '', title: 'Name' },
        { property: 'state', value: '', title: 'State' },
        { property: 'currency_id', value: '', title: 'Token' },
    ];

    public componentDidMount() {
        this.props.getListIEO({
            page: this.state.page + 1,
            limit: tablePageLimit(),
        });
        this.props.getCurrenciesList();
    }

    public render() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        const {
            total,
        } = this.props;

        return (
            <React.Fragment>
                <Table
                    dataLength={total}
                    rows={this.IEORows}
                    data={this.formatIEOList()}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    handleRowOnClick={this.onRowClick}
                />
                <FilterContainer
                    data={this.filterData as DataItem[]}
                    handleSubmit={this.handleSubmitFilter}
                />
            </React.Fragment>
        );
    }

    private onRowClick = ieo =>  {
        this.props.history.push(`/tower/plugins/ieo/${ieo.id}/edit`);
    };

    private handleSubmitFilter = elems => {
        this.setState({
            filterName: getItemFromRequest(elems, 'name'),
            filterState: getItemFromRequest(elems, 'state'),
            filterCurrencyId: getItemFromRequest(elems, 'currency_id'),
            page: 0,
        });

        const payload = {
            name: getItemFromRequest(elems, 'name'),
            state: getItemFromRequest(elems, 'state'),
            currency_id: getItemFromRequest(elems, 'currency_id'),
            page: 1,
            limit: this.state.rowsPerPage,
        };

        this.props.getListIEO(payload);
    };

    private handleChangePage = (page: number) => {
        const { rowsPerPage } = this.state;
        this.setState({ page });
        this.handleGetIEO(rowsPerPage, page);
    };

    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({rowsPerPage: rows, page: 0});
        this.handleGetIEO(rows, 0);
    };

    private handleGetIEO = (limit: number, page: number) => {
        const payload = {
            name: this.state.filterName,
            state: this.state.filterState,
            currency_id: this.state.filterCurrencyId,
            page: page + 1,
            limit,
        };

        this.props.getListIEO(payload);
    };

    private formatIEOList = () => {
        const { list } = this.props;

        return list.map((item: ItemIEO) => {
            const { pairs, supply } = item;

            const equivalent = formatDecimal(
                Number(pairs[0].price) * Number(supply),
                this.getPrecision(pairs[0].quote_currency_id),
            );

            return {
                ...item,
                equivalent,
                price: pairs[0].price,
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
        list: selectIEOList(state),
        total: selectIEOListTotal(state),
        currencies: selectCurrenciesList(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getListIEO: payload => dispatch(getListIEO(payload)),
    getCurrenciesList: payload => dispatch(getCurrenciesList(payload)),
});

// tslint:disable-next-line:no-any
export const IEO = withRouter(connect(mapStateToProps, mapDispatchToProps)(IEOScreen) as any);
