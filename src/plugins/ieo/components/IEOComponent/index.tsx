import {
    Button,
    createStyles,
    FormControl,
    FormControlLabel,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import { Moment } from 'moment';
import * as React from 'react';
import { IEOTypeDropdown } from '../';
import { DateTimePicker } from '../../../../components';
import { ieoTypesList } from '../../constants';

const styles = (theme: Theme) => createStyles({
    main: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    paper: {
        flex: 1,
        padding: '22px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separateBlocks: {
        padding: '10px 30px 50px',
        width: '50%',
        '&:first-child': {
            borderRight: '1px solid #e6e6e6',
        },
        '&:last-child': {
            position: 'relative',
        },
    },
    drawerLabel: {
        color: '#000000',
        letterSpacing: 0.15,
        fontWeight: 500,
        fontSize: 20,
    },
    formControl: {
        margin: '20px 0',
        padding: '0 20px',
    },
    dateWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 32,
        marginBottom: 8,
        width: '100%',
    },
    mainBlock: {
        marginTop: '50px',
    },
    mainBlockRight: {
        marginTop: '87px',
    },
    halfWidth: {
        width: '45%',
    },
    margin: {
        margin: '16px 0 8px',
    },
    btn: {
        color: '#ffffff',
        background: '#0030ae',
        padding: '5px 20px',
        '&:hover': {
            background: '#002484',
        },
    },
    btnWide: {
        width: 110,
        height: 55,
        marginTop: 7,
        color: '#ffffff',
        background: '#0030ae',
        '&:hover': {
            background: '#002484',
        },
    },
    disabled: {
        background: 'rgba(0, 48, 174, 0.3)',
        color: '#ffffff !important',
    },
    radioLabel: {
        marginLeft: '-5px',
    },
    inputOpacity: {
        opacity: 1,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface Event {
    target: {
        value: string;
    };
}

interface OwnProps {
    // tslint:disable-next-line: no-any
    ieo: any;
    handleSelectQuote?: (item: Event) => void;
    getBaseCurrencies: () => React.ReactNode[];
    getQuoteCurrencies: () => React.ReactNode[];
    handleUpdateIEO: (event: Event, key: string) => void;
    handleSubmit?: () => void;
    pageType: string;
    handlePickerChange?: (date: Moment, key: string) => void;
    onReleaseClick?: () => void;
    handleUpdatePrice: (event: Event) => void;
    states?: string[];
    handleChangeState?: () => void;
    handleRelease?: () => void;
}

type Props = OwnProps & StyleProps;

class IEODetails extends React.Component<Props> {
    public render() {
        const { classes } = this.props;
        const {
            name,
            currency_id,
            supply,
            pairs,
            owner_uid,
            result,
            commission,
            description,
            min_amount,
            max_amount,
            state,
        } = this.props.ieo;
        const { pageType } = this.props;
        const selectedQuote = pairs[0].quote_currency_id;

        return (
            <div className={classes.main}>
                <div className={classes.wrapper}>
                    <Paper className={classes.paper}>
                        <div className={classes.separateBlocks}>
                            <Grid container={true} justify="space-between" alignItems="center">
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl className={classes.margin}>
                                        <InputLabel htmlFor="state">Name</InputLabel>
                                        <Input
                                            id="name"
                                            placeholder="Name"
                                            value={name}
                                            onChange={e => this.props.handleUpdateIEO(e, 'name')}
                                            disabled={pageType === 'edit' && state !== 'draft' && state !== 'preparing'}
                                            classes={{
                                                input: classes.inputOpacity,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                {this.renderState()}
                            </Grid>
                            <div className={classes.mainBlock}>
                                {this.renderIEOType()}
                                <Grid item={true} className={classes.column}>
                                    <TextField
                                        id="owner_uid"
                                        placeholder="Enter UID"
                                        value={owner_uid}
                                        label="Issuer UID"
                                        margin="normal"
                                        fullWidth={true}
                                        onChange={e => this.props.handleUpdateIEO(e, 'owner_uid')}
                                        InputProps={{ classes: {input: classes.inputOpacity}}}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={pageType === 'edit' && state !== 'draft'}
                                    />
                                </Grid>
                                <Grid item={true} className={classes.row}>
                                    <div className={classes.halfWidth}>
                                        <TextField
                                            id="token"
                                            label="Token"
                                            placeholder="Select token"
                                            value={currency_id}
                                            margin="normal"
                                            onChange={e => this.props.handleUpdateIEO(e, 'currency_id')}
                                            InputProps={{ classes: {input: classes.inputOpacity}}}
                                            InputLabelProps={{ shrink: true }}
                                            select={true}
                                            fullWidth={true}
                                            disabled={pageType === 'edit'}
                                        >
                                            {this.props.getBaseCurrencies()}
                                        </TextField>
                                    </div>
                                    <div className={classes.halfWidth}>
                                        <TextField
                                            id="quote"
                                            label="Quote currency"
                                            placeholder="Select quote currency"
                                            value={selectedQuote}
                                            margin="normal"
                                            onChange={this.props.handleSelectQuote}
                                            InputProps={{ classes: {input: classes.inputOpacity}}}
                                            InputLabelProps={{ shrink: true }}
                                            select={true}
                                            fullWidth={true}
                                            disabled={pageType === 'edit'}
                                        >
                                            {this.props.getQuoteCurrencies()}
                                        </TextField>
                                    </div>
                                </Grid>
                                <Grid item={true} className={classes.column}>
                                    <FormControl className={classes.margin}>
                                        <InputLabel htmlFor="priced">IEO price</InputLabel>
                                        <Input
                                            id="price"
                                            placeholder="Enter price"
                                            value={pairs[0].price}
                                            onChange={this.props.handleUpdatePrice}
                                            endAdornment={this.getAdornment(selectedQuote.toUpperCase())}
                                            fullWidth={true}
                                            disabled={pageType === 'edit'}
                                            classes={{
                                                input: classes.inputOpacity,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} className={classes.column}>
                                    <FormControl className={classes.margin}>
                                        <InputLabel htmlFor="amount">Amount for sale</InputLabel>
                                        <Input
                                            id="amount"
                                            placeholder="Enter amount"
                                            value={supply}
                                            onChange={e => this.props.handleUpdateIEO(e, 'supply')}
                                            endAdornment={this.getAdornment(currency_id.toUpperCase())}
                                            fullWidth={true}
                                            disabled={pageType === 'edit' && state !== 'draft'}
                                            classes={{
                                                input: classes.inputOpacity,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid container={true} className={classes.margin} justify="space-between">
                                    <div className={classes.halfWidth}>
                                        <TextField
                                            id="fee"
                                            value={commission}
                                            label="Fee %"
                                            margin="normal"
                                            type="number"
                                            variant="outlined"
                                            onChange={e => this.props.handleUpdateIEO(e, 'commission')}
                                            InputProps={{ classes: {input: classes.inputOpacity}}}
                                            InputLabelProps={{ shrink: true }}
                                            disabled={pageType === 'edit' && state !== 'draft'}
                                            fullWidth={true}
                                        />
                                    </div>
                                    {this.renderRatio()}
                                </Grid>
                            </div>
                        </div>
                        <div className={classes.separateBlocks}>
                            {this.renderEditButton()}
                            {this.renderCreateButton()}
                            <div className={pageType === 'edit' ? classes.mainBlockRight : ''}>
                                {this.renderLowGoalInput()}
                                <Grid item={true} className={classes.column}>
                                    <FormControl className={classes.margin}>
                                        <InputLabel htmlFor="min_amount">Min buy amount</InputLabel>
                                        <Input
                                            id="min_amount"
                                            placeholder="Enter buy amount"
                                            value={min_amount}
                                            onChange={e => this.props.handleUpdateIEO(e, 'min_amount')}
                                            endAdornment={this.getAdornment(currency_id.toUpperCase())}
                                            fullWidth={true}
                                            disabled={pageType === 'edit' && state !== 'draft'}
                                            classes={{
                                                input: classes.inputOpacity,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} className={classes.column}>
                                    <FormControl className={classes.margin}>
                                        <InputLabel htmlFor="min_amount">Max buy amount</InputLabel>
                                        <Input
                                            id="max_amount"
                                            placeholder="Enter buy amount"
                                            value={max_amount}
                                            onChange={e => this.props.handleUpdateIEO(e, 'max_amount')}
                                            endAdornment={this.getAdornment(currency_id.toUpperCase())}
                                            fullWidth={true}
                                            disabled={pageType === 'edit' && state !== 'draft'}
                                            classes={{
                                                input: classes.inputOpacity,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} className={classes.row}>
                                    {this.getDateTimePicker()}
                                </Grid>
                                <Grid item={true} className={classes.column}>
                                    <FormControl className={classes.margin}>
                                        <InputLabel htmlFor="url">Project information</InputLabel>
                                        <Input
                                            id="url"
                                            placeholder="Enter link"
                                            value={description}
                                            onChange={e => this.props.handleUpdateIEO(e, 'description')}
                                            fullWidth={true}
                                            disabled={pageType === 'edit' && state !== 'draft' && state !== 'preparing'}
                                            classes={{
                                                input: classes.inputOpacity,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <div className={classes.margin}>
                                    <Grid item={true} className={classes.row}>
                                        <Grid item={true} className={classes.column}>
                                            <div className={classes.radioLabel}>After IEO finished:</div>
                                            <Grid container={true} alignItems="center" justify="space-between">
                                                <Grid item={true} xs={12} sm={5}>
                                                    <RadioGroup
                                                        aria-label="gender"
                                                        value={result}
                                                        onChange={this.handleSelectRadio}
                                                        className={classes.row}
                                                    >
                                                        <FormControlLabel
                                                            value="listing"
                                                            control={<Radio color="primary" />}
                                                            label="Enable market"
                                                            disabled={pageType === 'edit' && state !== 'draft'}
                                                        />
                                                        <FormControlLabel
                                                            value="nothing"
                                                            control={<Radio color="primary" />}
                                                            label="Nothing"
                                                            disabled={pageType === 'edit' && state !== 'draft'}
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {this.renderLockedRadio()}
                                        {this.renderRelaseBtn()}
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }

    private renderLowGoalInput = () => {
        const { low_goal, state, type } = this.props.ieo;
        const { classes, pageType } = this.props;

        if (type === 'fcfs') {
            return null;
        }

        return (
            <Grid item={true} className={classes.column}>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="min_amount">Low goal</InputLabel>
                    <Input
                        id="low_goal"
                        placeholder="Enter low goal"
                        value={low_goal}
                        onChange={e => this.props.handleUpdateIEO(e, 'low_goal')}
                        fullWidth={true}
                        disabled={pageType === 'edit' && state !== 'draft'}
                        classes={{
                            input: classes.inputOpacity,
                        }}
                    />
                </FormControl>
            </Grid>
        );
    };

    private renderCreateButton = () => {
        const { classes, pageType } = this.props;

        return pageType === 'create' && (
            <Grid container={true} justify="flex-end" className={classes.mainBlock}>
                <Button
                    onClick={this.props.handleSubmit}
                    disableFocusRipple={true}
                    className={classes.btn}
                >
                    Create
                </Button>
            </Grid>
        );
    };

    private renderEditButton = () => {
        const { classes, pageType } = this.props;

        return pageType === 'edit' && (
            <Grid container={true} justify="flex-end">
                <Button
                    onClick={this.props.handleSubmit}
                    disableFocusRipple={true}
                    className={classes.btn}
                >
                    Edit
                </Button>
            </Grid>
        );
    };

    private getDateTimePicker = () => {
        const { ieo, pageType, classes } = this.props;

        return (
            <div className={classes.dateWrapper}>
                <div className={classes.halfWidth}>
                    <DateTimePicker
                        date={ieo.starts_at}
                        handleChangeDate={e => this.props.handleUpdateIEO(e, 'starts_at')}
                        disabled={pageType === 'edit' && ieo.state !== 'draft'}
                        label="Start date"
                    />
                </div>
                <div className={classes.halfWidth}>
                    <DateTimePicker
                        date={ieo.finishes_at}
                        handleChangeDate={e => this.props.handleUpdateIEO(e, 'finishes_at')}
                        disabled={pageType === 'edit' && ieo.state !== 'draft' && ieo.state !== 'preparing' && ieo.state !== 'ongoing'}
                        label="Finish date"
                    />
                </div>
            </div>
        );
    };

    private renderState = () => {
        const { pageType, ieo, states, classes } = this.props;

        return pageType === 'edit' && (
            <Grid item={true} xs={12} sm={6}>
                <Grid container={true} justify="space-around" alignItems="center">
                    <Grid item={true} xs={12} sm={8}>
                        <TextField
                            id="state"
                            label="Status"
                            placeholder="Select state"
                            value={ieo.state}
                            margin="normal"
                            onChange={e => this.props.handleUpdateIEO(e, 'state')}
                            InputProps={{ classes: {input: classes.inputOpacity}}}
                            InputLabelProps={{ shrink: true }}
                            select={true}
                            fullWidth={true}
                            disabled={states && !states.length}
                        >
                            {states && states.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                        </TextField>
                    </Grid>
                    <Grid item={true} xs={12} sm={2}>
                        <Button
                            onClick={this.props.handleChangeState}
                            disableFocusRipple={true}
                            className={classes.btn}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    private renderRatio = () => {
        const { ieo, pageType, classes } = this.props;

        return pageType === 'edit' && (
            <div className={classes.halfWidth}>
                <TextField
                    id="ratio"
                    value={ieo.ratio}
                    label="Ratio"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ classes: {input: classes.inputOpacity}}}
                    InputLabelProps={{ shrink: true }}
                    fullWidth={true}
                    disabled={true}
                />
            </div>
        );
    };

    private handleSelectRadio = event => {
        this.props.handleUpdateIEO(event, 'result');
    };

    private getAdornment = value => (
        <InputAdornment position="end">
            <Typography variant="body2">
                {value}
            </Typography>
        </InputAdornment>
    );

    private renderIEOType = () => {
        const { type, state } = this.props.ieo;
        const { pageType } = this.props;

        return ieoTypesList.length > 1 ? (
            <IEOTypeDropdown
                type={type}
                handleUpdateIEO={this.props.handleUpdateIEO}
                disabled={pageType === 'edit' && state !== 'draft'}
                typesList={ieoTypesList}
            />
        ) : null;
    };

    private renderLockedRadio = () => {
        const { classes, pageType } = this.props;
        const { lockup_percentage } = this.props.ieo;

        return (
            <Grid item={true} className={classes.column}>
                <div className={classes.radioLabel}>Lock balance</div>
                    <Grid container={true} alignItems="center" justify="space-between">
                        <Grid item={true} xs={12} sm={5}>
                            <RadioGroup
                                aria-label="gender"
                                value={lockup_percentage}
                                onChange={this.handleSelectLockUp}
                                className={classes.row}
                            >
                                <FormControlLabel
                                    value="1.0"
                                    control={<Radio color="primary" />}
                                    label="Yes"
                                    disabled={pageType === 'edit'}
                                />
                                <FormControlLabel
                                    value="0.0"
                                    control={<Radio color="primary" />}
                                    label="No"
                                    disabled={pageType === 'edit'}
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>
            </Grid>
        );
    };

    private handleSelectLockUp = event => {
        this.props.handleUpdateIEO(event, 'lockup_percentage');
    };

    private renderRelaseBtn = () => {
        const { classes, pageType } = this.props;
        const { lockup_percentage, state } = this.props.ieo;

        return pageType === 'edit' && +lockup_percentage > 0 &&
            (state.includes('finished') || state === 'released') ? (
            <Grid item={true} xs={12} sm={2}>
                <Button
                    onClick={this.props.handleRelease}
                    disableFocusRipple={true}
                    className={classes.btn}
                    value="release"
                >
                    Release
                </Button>
            </Grid>
        ) : null;
    };
}

export const IEOComponent = withStyles(styles, {withTheme: true})(IEODetails);
