import MomentUtils from '@date-io/moment';
import {
    Button,
    createStyles,
    Divider,
    Drawer,
    FormControl,
    TextField,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Moment } from 'moment';
import * as React from 'react';

const styles = () => createStyles({
    formControl: {
        margin: '20px 0',
        padding: '0 20px',
    },
    drawerWrapper: {
        width: 400,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
    drawerLabel: {
        color: '#000000',
        letterSpacing: 0.15,
        fontWeight: 500,
        fontSize: 20,
    },
    drawerButtons: {
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        borderRadius: 3,
        marginTop: 40,
        marginBottom: 20,

        '&:first-child': {
            marginRight: 15,
        },
    },
    dateWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    input: {
        opacity: 1,
    },
});

interface Event {
    target: {
        value: string | number;
    };
}

export interface DataItem {
    property: string;
    value: Moment | string | number | null;
    type?: string;
    title?: string;
}

interface OwnProps {
    isOpen: boolean;
    data: DataItem[];
    handleOnClose: () => void;
    handleSubmit: () => void;
    handleChange: (e: Event, key: string) => void;
    handleResetAll: () => void;
    handlePickerChange?: (date: Moment | null, key: string) => void;
}

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

type Props = OwnProps & StyleProps;

class FilterComponent extends React.Component<Props> {
    public getDatePicker = () => {
        const {
            classes,
            data,
            handlePickerChange,
        } = this.props;
        const fromObj = data.find(e => e.property === 'from');
        const toObj = data.find(e => e.property === 'to');

        if (fromObj && toObj) {
            return (
                <React.Fragment>
                    <FormControl fullWidth={true} className={classes.formControl}>
                        <div className={classes.drawerLabel}>Date Range</div>
                        <div className={classes.dateWrapper}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    value={fromObj && fromObj.value}
                                    onChange={d => handlePickerChange && handlePickerChange(d, 'from')}
                                    placeholder="Start date"
                                    format="DD-MM-YYYY"
                                    maxDate={(toObj && toObj.value) || undefined}
                                    onKeyPress={e => this.handleEnterPress(e)}
                                    InputProps={{ classes: {input: classes.input}}}
                                />
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    value={toObj.value}
                                    onChange={d => handlePickerChange && handlePickerChange(d, 'to')}
                                    placeholder="End date"
                                    minDate={(fromObj && fromObj.value) || undefined}
                                    format="DD-MM-YYYY"
                                    onKeyPress={e => this.handleEnterPress(e)}
                                    InputProps={{ classes: {input: classes.input}}}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </FormControl>
                    <Divider/>
                </React.Fragment>
            );
        }

        return null;
    };

    public renderFilterItems = () => {
        const { classes, data, handleChange } = this.props;

        return data.map((item, index) => {
            if (item.property !== 'from' && item.property !== 'to') {
                return (
                    <React.Fragment key={index}>
                        <FormControl fullWidth={true} className={classes.formControl}>
                            <div className={classes.drawerLabel}>{item.title}</div>
                            <TextField
                                onChange={e => handleChange(e, item.property as string)}
                                id={`filter-${item.property}`}
                                value={item.value as (number | string)}
                                type={item.type}
                                placeholder={item.title}
                                onKeyPress={e => this.handleEnterPress(e)}
                            />
                        </FormControl>
                        <Divider/>
                    </React.Fragment>
                );
            }

            return null;
        });
    };

    public render() {
        const {
            isOpen,
            handleOnClose,
            classes,
            handleResetAll,
            handleSubmit,
        } = this.props;

        return (
            <Drawer anchor="right" open={isOpen} onClose={handleOnClose}>
                <div className={classes.drawerWrapper}>
                    {this.getDatePicker()}
                    {this.renderFilterItems()}
                </div>
                <div className={classes.drawerButtons}>
                    <Button
                        onClick={handleResetAll}
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                    >
                        Reset All
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >
                        Apply Filters
                    </Button>
                </div>
            </Drawer>
        );
    }

    private handleEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.props.handleSubmit();
        }
    };
}

export const FilterElement = withStyles(styles, { withTheme: true })(FilterComponent);
