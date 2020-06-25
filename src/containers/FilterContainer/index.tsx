import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DataItem, FilterElement } from '../../components';
import {
    AppState,
    saveFilterDataToState,
    selectFilterData,
    toggleFilterWidgetState,
} from '../../modules';

import moment, { Moment } from 'moment';


export interface KeyValueInterface {
    key: string;
    value: string | number | Moment;
}

interface FilterState {
    data: DataItem[];
}

interface FilterProps {
    data: DataItem[];
    handleSubmit: (elems: KeyValueInterface[]) => void;
    api: string;
}

interface LocationProps {
    location: {
        pathname: string;
    };
}

interface ReduxProps {
    isFilterOpen: boolean;
}

interface DispatchProps {
    handleToggleFilter: typeof toggleFilterWidgetState;
    saveFilterDataToState: typeof saveFilterDataToState;
}

type Props = FilterProps & LocationProps & ReduxProps & DispatchProps;

class Filter extends React.Component<Props, FilterState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: props.data as DataItem[],
        };
    }

    public UNSAFE_componentWillReceiveProps(next: Props) {
        if (this.props.location.pathname !== next.location.pathname) {
            this.handleResetAll();
            this.props.saveFilterDataToState([]);
        }
    }

    public render() {
        return (
            <FilterElement
                isOpen={this.props.isFilterOpen}
                data={this.state.data}
                handleOnClose={this.handleClose}
                handleChange={this.handleChange}
                handleResetAll={this.handleResetAll}
                handleSubmit={this.filterSubmit}
                handlePickerChange={this.handleChangeDatePickerElem}
            />
        );
    }

    private handleClose = () => {
        this.props.handleToggleFilter({ isFilterOpen: false });
    };

    private handleChange = (e, key) => {
        const { data } = this.state;
        const item = data.find(i => i.property === key);

        if (item) {
            const indexOfElem = data.indexOf(item);

            if (indexOfElem > -1) {
                data[indexOfElem].value = e.target.value;

                this.setState({
                    data,
                });
            }
        }
    };

    private handleChangeDatePickerElem = (date, key) => {
        const { data } = this.state;
        const item = data.find(i => i.property === key);

        if (item) {
            const indexOfElem = data.indexOf(item);

            if (indexOfElem > -1) {
                data[indexOfElem].value = date;

                this.setState({
                    data,
                });
            }
        }
    };

    private handleResetAll = () => {
        const { data } = this.state;

        data.map(item => {
            switch (item.property) {
                case 'from':
                    item.value = null;
                    break;
                case 'to':
                    item.value = null;
                    break;
                default:
                    item.value = '';
            }

            return item.value;
        });

        this.setState({
            data,
        });
    };

    private filterSubmit = () => {
        const { data } = this.state;
        const newData: KeyValueInterface[] = [];

        for (const i of data) {
            if (i.value) {
                if (this.props.api === 'barong') {
                    switch (i.property) {
                        case 'from':
                            const fromObj = {
                                key: i.property,
                                value: i.value && moment(i.value).startOf('day').unix() as number,
                            };
                            newData.push(fromObj);
                            break;
                        case 'to':
                            const toObj = {
                                key: i.property,
                                value: i.value && moment(i.value).endOf('day').unix() as number,
                            };
                            newData.push(toObj);
                            break;
                        default:
                            const obj = {
                                key: i.property,
                                value: i.value,
                            };
                            newData.push(obj);
                            break;
                    }
                } else {
                    switch (i.property) {
                        case 'from':
                            const fromObj = {
                                key: i.property,
                                value: i.value && moment(i.value).startOf('day').toISOString() as string,
                            };
                            newData.push(fromObj);
                            break;
                        case 'to':
                            const toObj = {
                                key: i.property,
                                value: i.value && moment(i.value).endOf('day').toISOString() as string,
                            };
                            newData.push(toObj);
                            break;
                        default:
                            const obj = {
                                key: i.property,
                                value: i.value,
                            };
                            newData.push(obj);
                            break;
                    }
                }
            }
        }

        this.props.handleSubmit(newData as KeyValueInterface[]);
        this.props.saveFilterDataToState(newData as KeyValueInterface[]);
        this.handleClose();
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> = (state: AppState): ReduxProps => ({
    isFilterOpen: selectFilterData(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    handleToggleFilter: payload => dispatch(toggleFilterWidgetState(payload)),
    saveFilterDataToState: payload => dispatch(saveFilterDataToState(payload)),
});

// tslint:disable-next-line no-any
export const FilterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter) as any) as any;
