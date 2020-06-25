import { MenuItem } from '@material-ui/core';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { convertFullDate, formatDecimal, isDateInFuture } from '../../../../helpers';
import {
    alertPush,
    AppState,
} from '../../../../modules';
import { IEOComponent, IEODetails } from '../../components';
import { ieoTypesList } from '../../constants';
import {
    addIEO,
    CurrencyItem,
    getCurrenciesList,
    getIEO,
    SalePair,
    selectCurrenciesList,
} from '../../modules';

interface Event {
    target: {
        value: string;
    };
}

export interface CreateIEOItem {
    name: string;
    currency_id: string;
    supply: string;
    result: string;
    owner_uid: string;
    description: string;
    low_goal: string;
    commission: string;
    min_amount: string;
    max_amount: string;
    min_unit: string;
    starts_at: string;
    finishes_at: string;
    pairs: SalePair[];
    type: string;
    lockup_percentage: string;
}

interface State {
    ieo: CreateIEOItem;
    introduction: string;
    technological_foundation: string;
    name: string;
    total_supply: string;
    icon_url: string;
    precision: string;
    links: Array<{ title: string, url: string }>;
}

interface ReduxProps {
    currencies: CurrencyItem[];
}

interface DispatchProps {
    getIEOItem: typeof getIEO;
    addIEO: typeof addIEO;
    getCurrenciesList: typeof getCurrenciesList;
    alertPush: typeof alertPush;
}

type Props = DispatchProps & ReduxProps;

class CreateIEOScreen extends React.Component<Props, State> {
    private constructor(props: Props) {
        super(props);

        this.state = {
            ieo: {
                name: '',
                currency_id: '',
                supply: '',
                result: 'listing',
                owner_uid: '',
                description: '',
                low_goal: ieoTypesList && ieoTypesList.length && ieoTypesList[0] === 'fcfs' ? '0' : '',
                commission: '0.0',
                starts_at: '',
                finishes_at: '',
                pairs: [{
                    quote_currency_id: '',
                    price: '',
                }],
                min_amount: '',
                max_amount: '',
                min_unit: '0',
                lockup_percentage: '0.0',
                type: ieoTypesList && ieoTypesList.length ? ieoTypesList[0] : '',
            },
            introduction: '',
            name: '',
            technological_foundation: '',
            total_supply: '',
            icon_url: '',
            precision: '',
            links: Array.from(Array(10), i => ({url: '', title: ''})),
        };
    }

    public componentDidMount() {
        this.props.getCurrenciesList();
    }

    public handleUpdateIEO = (event, key) => {
        if (key === 'type') {
            if (event.target.value === 'fcfs') {
                this.setState({
                    ieo: {
                        ...this.state.ieo,
                        [key]: event.target.value,
                        low_goal: '0',
                    },
                });
            } else {
                this.setState({
                    ieo: {
                        ...this.state.ieo,
                        [key]: event.target.value,
                        low_goal: '',
                    },
                });
            }
        } else {
            this.setState({
                ieo: {
                    ...this.state.ieo,
                    [key]: event.target.value,
                },
            });
        }
    };

    public handleSelectQuote = (event: Event) => {
        const { ieo } = this.state;
        const updatePair = [{ quote_currency_id: event.target.value, price: this.state.ieo.pairs[0].price }];
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
        const updatePair = [{ quote_currency_id: this.state.ieo.pairs[0].quote_currency_id, price }];
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
            .filter(item => item.code && item.code.toLowerCase() !== ieo.pairs[0].quote_currency_id.toLowerCase())
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
            links,
        } = this.state;

        return (
            <React.Fragment>
                <IEOComponent
                    handleSelectQuote={this.handleSelectQuote}
                    getBaseCurrencies={this.getBaseCurrencies}
                    handleUpdateIEO={this.handleUpdateIEO}
                    getQuoteCurrencies={this.getQuoteCurrencies}
                    handleSubmit={this.handleCreateIEO}
                    ieo={this.state.ieo}
                    pageType="create"
                    handlePickerChange={this.handleChangeDatePickerElem}
                    handleUpdatePrice={this.handleUpdatePrice}
                />
                <IEODetails
                    introduction={introduction}
                    handleChangeValue={this.handleChangeValue}
                    handleChangeLink={this.handleChangeLink}
                    handleChangeLinkTitle={this.handleChangeLinkTitle}
                    handleSubmit={() => undefined}
                    name={name}
                    technological_foundation={technological_foundation}
                    total_supply={total_supply}
                    icon_url={icon_url}
                    precision={precision}
                    links={links}
                    side="create"
                />
            </React.Fragment>
        );
    }

    private handleChangeDatePickerElem = (date, key) => {
        //@ts-ignore
        this.setState({
            ieo: {
                ...this.state.ieo,
                [key]: date,
            },
        });
    };

    private handleCreateIEO = () => {
        const { ieo } = this.state;
        const payload = {
            ...ieo,
            commission: this.convertFromPercentage(ieo.commission),
            starts_at: convertFullDate(ieo.starts_at),
            finishes_at: convertFullDate(ieo.finishes_at),
            type: ieoTypesList.length === 1 ? ieoTypesList[0] : ieo.type,
        };

        this.checkDate(payload);
    };

    private checkDate = ieo => {
        const {
            introduction,
            name,
            technological_foundation,
            total_supply,
            icon_url,
            precision,
            links,
        } = this.state;

        if ((isDateInFuture(ieo.starts_at) && !ieo.finishes_at.length) ||
            (isDateInFuture(ieo.starts_at) && isDateInFuture(ieo.finishes_at))) {

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
                full_name: name || null,
                technological_foundation: technological_foundation || null,
                total_supply: total_supply || null,
                icon_url: icon_url || null,
                precision: precision || null,
                introduction: introduction || null,
            };

            const metadataPayload = JSON.stringify(metadata);
            this.props.addIEO(ieo, metadataPayload);
        } else {
            this.props.alertPush({
                message: ['IEO sales date should be in future'],
                type: 'error',
            });
        }
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

    private convertFromPercentage = commission => Number(formatDecimal(Number(commission) / 100, 6));
}


const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> = (state: AppState): ReduxProps => ({
    currencies: selectCurrenciesList(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getIEOItem: payload => dispatch(getIEO(payload)),
    addIEO: (payload, metadata: string) => dispatch(addIEO(payload, metadata)),
    getCurrenciesList: payload => dispatch(getCurrenciesList(payload)),
    alertPush: payload => dispatch(alertPush(payload)),
});

// tslint:disable-next-line:no-any
export const IEOCreate = connect(mapStateToProps, mapDispatchToProps)(CreateIEOScreen as any);
