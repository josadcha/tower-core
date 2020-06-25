import {
    createStyles,
    Grid,
    TextField,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { Modal } from '../../../../components';

const styles = (theme: Theme) => createStyles({
    paper: {
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 312,
    },
    menu: {
        width: 400,
    },
    button: {
        background: '#0030AE',
        color: '#FFFFFF',
    },
    row: {
        width: '100%',
    },
    inputOpacity: {
        opacity: 1,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

interface ReleaseModalProps {
    modalClose: () => void;
    open: boolean;
    handleClick: () => void;
    handleChangeSelect: (value: string, name: string) => void;
    amount: string;
}

type Props = StyleProps & ReleaseModalProps;

class DepositComponent extends React.Component<Props> {
    public render() {
        const {
            open,
            modalClose,
            handleClick,
        } = this.props;

        return (
            <Modal
                open={open}
                modalClose={modalClose}
                handleClick={handleClick}
                header="Release"
                buttonLabel="Confirm"
                children={this.renderModalBody()}
            />
        );
    }

    private renderModalBody = () => {
        const {
            classes,
            amount,
        } = this.props;

        return (
            <Grid container={true} direction={'column'} className={classes.paper}>
                <Grid item={true} className={classes.row}>
                    <TextField
                        id="amount"
                        label="Amount %"
                        placeholder="Enter amount"
                        value={amount}
                        margin="normal"
                        type="number"
                        fullWidth={true}
                        onChange={e => this.handleChangeValue(e.target.value, 'amount')}
                        InputProps={{ classes: {input: classes.inputOpacity}}}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
        );
    };

    private handleChangeValue = (value, name) => this.props.handleChangeSelect(value, name);
}

export const ReleaseModal = withStyles(styles)(DepositComponent);
