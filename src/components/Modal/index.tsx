import {
    Button,
    createStyles,
    Grid,
    Modal as MaterialUIModal,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    paper: {
        display: 'block',
        margin: '100px auto',
        width: '360px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        padding: 24,
        borderRadius: 8,
        '&:focus': {
            outline: 'none',
        },
    },
    textField: {
        fontWeight: 'bold',
    },
    menu: {
        width: 400,
    },
    button: {
        background: '#0030AE',
        color: '#FFFFFF',
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

interface ModalProps {
    modalClose: () => void;
    open: boolean;
    header: string;
    children: JSX.Element | null;
    buttonLabel: string;
    handleClick: () => void;
    disabled?: boolean;
}

type Props = StyleProps & ModalProps;

class ModalComponent extends React.Component<Props> {
    public render() {
        const {
            classes,
            open,
            header,
            children,
            buttonLabel,
            handleClick,
            disabled,
        } = this.props;

        return (
            <MaterialUIModal open={open} onClose={this.handleClose}>
                <Grid container={true} direction={'column'} className={classes.paper}>
                    <Grid item={true}>
                        <Typography variant="h6" className={classes.textField}>
                            {header}
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        {children}
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        fullWidth={true}
                        onClick={handleClick}
                        disabled={disabled}
                        style={{ marginTop: 20 }}
                    >
                        {buttonLabel}
                    </Button>
                </Grid>
            </MaterialUIModal>
        );
    }

    private handleClose = () => {
        this.props.modalClose();
    };
}

export const Modal = withStyles(styles)(ModalComponent);
