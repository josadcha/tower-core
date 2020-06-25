import { MenuItem } from '@material-ui/core';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Modal } from '../../../../components';
import {
    convertFullDate,
    formatDecimal,
    isDateInFuture,
    localeDate,
} from '../../../../helpers';
import {
    alertPush,
    AppState,
} from '../../../../modules';
import { IEOComponent, IEODetails } from '../../components';
import {
    CurrencyItem,
    editIEO,
    getCurrenciesList,
    getIEO,
    getIEOData,
    ItemIEO,
    selectCurrenciesList,
    selectIEO,
    selectIEODetails,
    selectIEOError,
    selectIEOListLoading,
    updateDetailsIEOFetch,
} from '../../modules';

interface Event {
    target: {
        value: string;
    };
}

interface State {
    ieo: ItemIEO;
    introduction: string;
    name: string;
    technological_foundation: string;
    total_supply: string;
    icon_url: string;
    precision: string;
    open: boolean;
    links: Array<{ title: string, url: string }>;
}

interface ReduxProps {
    ieo?: ItemIEO | null;
    currencies: CurrencyItem[];
    // tslint:disable-next-line: no-any
    ieoDetails: any;
    loading: boolean;
    error: boolean;
}

interface DispatchProps {
    getIEOItem: typeof getIEO;
    editIEO: typeof editIEO;
    getCurrenciesList: typeof getCurrenciesList;
    alertPush: typeof alertPush;
    updateDetailsIEOFetch: typeof updateDetailsIEOFetch;
    getIEOData: typeof getIEOData;
}


interface LocationProps extends RouterProps {
    match: {
        params: {
            id: string;
        };
    };
}

const defaultIEO = {
    id: -1,
    name: '',
    currency_id: '',
    state: '',
    collected_amount: '',
    ratio: '',
    supply: '',
    result: '',
    owner_uid: '',
    description: '',
    low_goal: '',
    commission: '',
    starts_at: '',
    finishes_at: '',
    pairs: [{
        id: -1,
        sale_id: -1,
        quote_currency_id: '',
        price: '',
    }],
    min_amount: '',
    max_amount: '',
    min_unit: '',
    type: '',
    lockup_percentage: '',
};

type Props = DispatchProps & ReduxProps & LocationProps;

class EditIEOScreen extends React.Component<Props, State> {
    private constructor(props: Props) {
        super(props);

        this.state = {
            ieo: defaultIEO,
            introduction: '',
            name: '',
            technological_foundation: '',
            total_supply: '',
            icon_url: '',
            precision: '',
            open: false,
            links: Array.from(Array(10), i => ({url: '', title: ''})),
        };
    }

    public componentDidMount() {
        this.props.getIEOItem({ id: this.props.match.params.id });
        if (this.props.currencies.length === 0) {
            this.props.getCurrenciesList();
        }

        if (this.props.ieoDetails) {
            this.setIEODetails(this.props.ieoDetails);
        }
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>) {
        const { ieo } = this.state;

        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.getIEOItem({ id: nextProps.match.params.id });
        }

        if (nextProps.ieo && nextProps.ieo.id && (ieo.id !== nextProps.ieo.id)) {
            this.setState({
                ieo: {
                    ...nextProps.ieo,
                    commission: this.convertToPercentage(nextProps.ieo.commission),
                    starts_at: localeDate(nextProps.ieo.starts_at, 'fullDate'),
                    finishes_at: nextProps.ieo.finishes_at ? localeDate(nextProps.ieo.finishes_at, 'fullDate') : '',
                },
            });
        }

        if (!this.props.ieo && !nextProps.ieo && this.props.error) {
            this.props.history.push('/tower/plugins/ieo');
        }

        if (!this.props.ieoDetails && nextProps.ieoDetails) {
            this.setIEODetails(nextProps.ieoDetails);
        }
    }

    public componentWillUnmount() {
        this.props.getIEOData({ieo: null, details: null});
    }

    public handleSelectQuote = (event: Event) => {
        const { ieo } = this.state;
        const updatePair = [{ quote_currency_id: event.target.value, ...ieo.pairs[0] }];
        this.setState({
            ieo: {
                ...ieo,
                pairs: updatePair,
            },
        });
    };

    public handleUpdatePrice = (event: Event) => {
        const { ieo } = this.state;
        const price = event.target.value;
        const updatePair = [{ price, ...ieo.pairs[0] }];
        this.setState({
            ieo: {
                ...ieo,
                pairs: updatePair,
            },
        });
    };

    public getBaseCurrencies = () => {
        const { currencies } = this.props;
        const { ieo } = this.state;

        return currencies
            .filter(item => item.code.toLowerCase() !== ieo.pairs[0].quote_currency_id.toLowerCase())
            .map((value, index) => <MenuItem key={index} value={value.code}>{value.code.toUpperCase()}</MenuItem>);
    };

    public getQuoteCurrencies = () => {
        const { currencies } = this.props;
        const { ieo } = this.state;

        return currencies
            .filter(item => (item.code.toLowerCase() !== ieo.currency_id.toLowerCase()))
            .map((value, index) => <MenuItem key={index} value={value.code}>{value.code.toUpperCase()}</MenuItem>);
    };

    public render() {
        const {
            introduction,
            name,
            technological_foundation,
            total_supply,
            icon_url,
            precision,
            open,
            links,
        } = this.state;

        return (
            <React.Fragment>
                <IEOComponent
                    handleSelectQuote={this.handleSelectQuote}
                    getBaseCurrencies={this.getBaseCurrencies}
                    handleUpdateIEO={this.handleUpdateIEO}
                    getQuoteCurrencies={this.getQuoteCurrencies}
                    handleSubmit={this.editIEO}
                    ieo={this.state.ieo}
                    pageType="edit"
                    handlePickerChange={this.handleChangeDatePickerElem}
                    handleUpdatePrice={this.handleUpdatePrice}
                    states={this.getStatesList()}
                    handleChangeState={this.editState}
                    handleRelease={this.toggleModal}
                />
                <IEODetails
                    introduction={introduction}
                    handleChangeValue={this.handleChangeValue}
                    handleChangeLink={this.handleChangeLink}
                    handleChangeLinkTitle={this.handleChangeLinkTitle}
                    handleSubmit={this.handleApplyDetails}
                    name={name}
                    technological_foundation={technological_foundation}
                    total_supply={total_supply}
                    icon_url={icon_url}
                    precision={precision}
                    links={links}
                    side="edit"
                />
                <Modal
                    modalClose={this.toggleModal}
                    open={open}
                    header="Attention"
                    children={<div>Are you sure you would like to release Tokens?! This will irreversible!</div>}
                    buttonLabel="Confirm"
                    handleClick={this.handleReleaseClick}
                />
            </React.Fragment>
        );
    }

    private setIEODetails = (details: { [key: string]: string; }) => {
        const links = Array.from(Array(10), _ => ({url: '', title: ''}));
        const drop = [
            'introduction',
            'technological_foundation',
            'total_supply',
            'icon_url',
            'precision',
            'full_name',
        ];

        const filteredLinks: { [key: string]: string; } = Object.keys(details).reduce((obj, key) => {
            if (drop.includes(key)) {
                return obj;
            }

            return {...obj, [key]: details[key]};
        }, {});

        // tslint:disable-next-line: ban
        Object.entries(filteredLinks).map(pair => ({title: pair[0], url: pair[1]}))
            .forEach((link, i) => links[i] = link);

        this.setState({
            links: links,
            introduction: details.introduction,
            name: details.full_name,
            technological_foundation: details.technological_foundation,
            total_supply: details.total_supply,
            icon_url: details.icon_url,
            precision: details.precision,
        });
    };

    private handleUpdateIEO = (event, key) => {
        this.setState({
            ieo: {
                ...this.state.ieo,
                [key]: event.target.value,
            },
        });
    };

    private handleApplyDetails = () => {
        const {
            introduction,
            technological_foundation,
            name,
            total_supply,
            icon_url,
            precision,
            links,
        } = this.state;
        const { currency_id, id } = this.state.ieo;

        const mergedLinks = links.reduce((obj, link) => {
            if (link.title && link.url) {
                return ({
                    ...obj,
                    [link.title]: link.url,
                });
            }

            return obj;
        }, {});

        const metadata = {
            ...mergedLinks,
            introduction: introduction || null,
            full_name: name || null,
            technological_foundation: technological_foundation || null,
            total_supply: total_supply || null,
            icon_url: icon_url || null,
            precision: precision || null,
        };
        const metadataPayload = JSON.stringify(metadata);

        this.props.updateDetailsIEOFetch({
            id: `IEO-${currency_id.toUpperCase()}-${id}`,
            value: metadataPayload,
        });
    };

    private handleChangeValue = (value: string, key: string) => {
        // @ts-ignore
        this.setState({
            [key]: value,
        });
    };

    private handleChangeLinkTitle = (value: string, key: number) => {
        // @ts-ignore
        const links = [...this.state.links];
        links[key].title = value;
        this.setState({ links: links });
    };

    private handleChangeLink = (value: string, key: number) => {
        // @ts-ignore
        const links = [...this.state.links];
        links[key].url = value;
        this.setState({ links: links });
    };

    private editIEO = () => {
        const {
            name,
            currency_id,
            supply,
            starts_at,
            finishes_at,
            pairs,
            owner_uid,
            result,
            commission,
            low_goal,
            description,
            min_amount,
            max_amount,
            type,
            lockup_percentage,
        } = this.state.ieo;
        const payload = {
            id: this.props.match.params.id,
            params: {
                name,
                currency_id,
                supply: Number(supply),
                owner_uid,
                result,
                commission : this.convertFromPercentage(commission),
                description,
                low_goal,
                starts_at: convertFullDate(starts_at),
                finishes_at: finishes_at.length ? convertFullDate(finishes_at) : '',
                pairs,
                min_amount,
                max_amount,
                type,
                lockup_percentage,
            },
        };

        this.props.editIEO(payload);
    };

    private editState = () => {
        const payload = {
            id: this.props.match.params.id,
            state: this.getStateAction(),
        };

        this.props.editIEO(payload);
    };

    private handleReleaseClick = () => {
        this.setState({ ieo: { ...this.state.ieo, state: 'released' }});
        const payload = {
            id: this.props.match.params.id,
            state: 'release',
        };

        this.props.editIEO(payload);
        this.toggleModal();
    };

    private handleChangeDatePickerElem = (date, key) => {
        //@ts-ignore
        this.setState({
            [key]: date,
        });
    };

    private convertFromPercentage = commission => Number(formatDecimal(Number(commission) / 100, 6));

    private convertToPercentage = commission => Number(formatDecimal(Number(commission) * 100, 6));

    private getStatesList = () => {
        const { starts_at, finishes_at, state } = this.state.ieo;
        const { ieo } = this.props;
        let list: string[] = [];

        switch (state) {
            case 'draft':
                list = [ 'draft', 'preparing', 'deleted' ];
                break;
            case 'preparing':
                list = !isDateInFuture(convertFullDate(starts_at)) ? [ 'preparing', 'ongoing' ] : [ 'preparing' ];
                break;
            case 'ongoing':
                list = !isDateInFuture(convertFullDate(finishes_at)) ? ieo && ieo.type === 'fcfs' ?
                [ 'ongoing', 'finished' ] :
                [ 'ongoing', 'distributed' ] :
                [ 'ongoing' ];
                break;
            case 'distributed':
                list = [ 'distributed', 'finished' ];
                break;
            default:
                list = state ? [ state ] : [];
                break;
        }

        if (ieo && ieo.state) {
            !list.filter(item => item === ieo.state).length && list.push(ieo.state);
        }

        return list;
    };

    private getStateAction = () => {
        const prevStatus = this.props.ieo && this.props.ieo.state;
        const nextStatus = this.state.ieo.state;

        if (prevStatus !== nextStatus) {
            switch (prevStatus) {
                case 'draft':
                    return nextStatus === 'preparing' ? 'approve' : 'stop';
                case 'preparing':
                    return 'start';
                case 'ongoing':
                    return nextStatus === 'distributed' ? 'distribute' : 'finish';
                case 'distributed':
                    return 'finish';
                default:
                    return '';
            }
        } else {
            return '';
        }
    };

    private toggleModal = () => this.setState({ open: !this.state.open });
}


const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> = (state: AppState): ReduxProps => ({
    ieo: selectIEO(state),
    currencies: selectCurrenciesList(state),
    ieoDetails: selectIEODetails(state),
    loading: selectIEOListLoading(state),
    error: selectIEOError(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    editIEO: payload => dispatch(editIEO(payload)),
    getIEOItem: payload => dispatch(getIEO(payload)),
    getCurrenciesList: payload => dispatch(getCurrenciesList(payload)),
    alertPush: payload => dispatch(alertPush(payload)),
    updateDetailsIEOFetch: payload => dispatch(updateDetailsIEOFetch(payload)),
    getIEOData: payload => dispatch(getIEOData(payload)),
});

// tslint:disable-next-line:no-any
export const IEOEdit = withRouter(connect(mapStateToProps, mapDispatchToProps)(EditIEOScreen as any) as any);
