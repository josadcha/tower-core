import {
    createStyles,
    Grid,
    Paper,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        marginBottom: 16,
        marginRight: 7,
    },
    paper: {
        padding: theme.spacing(2),
    },
    counter: {
        marginTop: 10,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface OwnProps {
    token: string;
    price: string | number;
    ratio: string | number;
    soldAmount: string | number;
}

type Props = OwnProps & StyleProps;

class IEOHistoryInfoComponent extends React.Component<Props> {
    public render() {
        const { classes, token, price, ratio, soldAmount } = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Grid container={true} spacing={3}>
                        <Grid item={true} xs={3}>
                            <Paper className={classes.paper}>
                                <Typography variant="caption">Token</Typography>
                                <Typography className={classNames(classes.counter)} variant="body2">
                                    {token}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={3}>
                            <Paper className={classes.paper}>
                                <Typography variant="caption">Price</Typography>
                                <Typography className={classNames(classes.counter)} variant="body2">
                                    {price}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={3}>
                            <Paper className={classes.paper}>
                                <Typography variant="caption">Ratio</Typography>
                                <Typography className={classNames(classes.counter)} variant="body2">
                                    {ratio}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={3}>
                            <Paper className={classes.paper}>
                                <Typography variant="caption">Sold amount</Typography>
                                <Typography className={classNames(classes.counter)} variant="body2">
                                    {soldAmount}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

// tslint:disable-next-line:no-any
export const IEOHistoryInfo = withStyles(styles, { withTheme: true })(IEOHistoryInfoComponent as any);
