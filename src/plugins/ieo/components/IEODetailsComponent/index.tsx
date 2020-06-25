import {
    Button,
    createStyles,
    Grid,
    Paper,
    TextField,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    root: {
        marginBottom: 16,
        marginRight: 7,
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: '8px',
        marginBottom: '8px',
    },
    typography: {
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '28px',
        padding: '21px',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        paddingRight: '14px',
    },
    linksContainer: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    linkField: {
        width: '50%',
        paddingRight: '14px',
    },
    grid: {
        padding: '14px !important',

        '&:first-child': {
            '@media (min-width: 600px)': {
                borderRight: '1px solid rgba(0, 0, 0, 0.1)',
            },
        },
    },
    gridButton: {
        padding: '8px !important',
    },
    inputOpacity: {
        opacity: 1,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface DetailsIEOComponentProps {
    name: string | null;
    technological_foundation: string | null;
    total_supply: string | null;
    icon_url: string | null;
    precision: string | null;
    introduction: string | null;
    handleChangeValue: (value: string, key: string) => void;
    handleChangeLink: (value: string, key: number) => void;
    handleChangeLinkTitle: (value: string, key: number) => void;
    handleSubmit: () => void;
    side: string;
    links: Array<{ title: string, url: string }>;
}

type Props = DetailsIEOComponentProps & StyleProps;

class IEODetailsComponent extends React.PureComponent<Props> {
    public render() {
        const {
            classes,
            introduction,
            name,
            technological_foundation,
            total_supply,
            icon_url,
            precision,
        } = this.props;

        return (
            <Paper className={classes.paper}>
                <div className={classes.root}>
                    <Grid container={true} spacing={3}>
                        <Typography variant="body2" className={classes.typography}>
                            Details
                        </Typography>
                    </Grid>
                    <Grid container={true} spacing={3}>
                        <Grid item={true} xs={12} md={6} className={classes.grid}>
                            <TextField
                                label="Full Name"
                                classes={{ root: classes.textField}}
                                value={name !== null ? name : ''}
                                onChange={e => this.props.handleChangeValue(e.target.value, 'name')}
                                margin="normal"
                                placeholder="Enter full name"
                                fullWidth={true}
                                InputProps={{ classes: {input: classes.inputOpacity}}}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Technological foundation"
                                classes={{ root: classes.textField}}
                                value={technological_foundation !== null ? technological_foundation : ''}
                                onChange={e => this.props.handleChangeValue(e.target.value, 'technological_foundation')}
                                margin="normal"
                                placeholder="Enter technological foundation"
                                fullWidth={true}
                                InputProps={{ classes: {input: classes.inputOpacity}}}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Total Supply"
                                classes={{ root: classes.textField}}
                                value={total_supply !== null ? total_supply : ''}
                                onChange={e => this.props.handleChangeValue(e.target.value, 'total_supply')}
                                margin="normal"
                                placeholder="Enter total supply"
                                fullWidth={true}
                                InputProps={{ classes: {input: classes.inputOpacity}}}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Precision"
                                classes={{ root: classes.textField}}
                                value={precision !== null ? precision : ''}
                                onChange={e => this.props.handleChangeValue(e.target.value, 'precision')}
                                margin="normal"
                                placeholder="Enter precision"
                                fullWidth={true}
                                InputProps={{ classes: {input: classes.inputOpacity}}}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Icon URL"
                                classes={{ root: classes.textField}}
                                value={icon_url !== null ? icon_url : ''}
                                onChange={e => this.props.handleChangeValue(e.target.value, 'icon_url')}
                                margin="normal"
                                placeholder="Enter icon url"
                                fullWidth={true}
                                InputProps={{ classes: {input: classes.inputOpacity}}}
                                InputLabelProps={{ shrink: true }}
                            />

                            <div className={classes.linksContainer}>
                                {this.renderLinkForms()}
                            </div>
                        </Grid>
                        <Grid item={true} xs={12} md={6} className={classes.grid}>
                            <TextField
                                label="Project Introduction"
                                style={{ margin: 6 }}
                                placeholder="Enter Project Introduction"
                                fullWidth={true}
                                margin="normal"
                                variant="outlined"
                                multiline={true}
                                rows="35"
                                value={introduction !== null ? introduction : ''}
                                onChange={e => this.props.handleChangeValue(e.target.value, 'introduction')}
                                InputProps={{ classes: {input: classes.inputOpacity}}}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                    {this.getSaveButton()}
                </div>
            </Paper>
        );
    }

    public getSaveButton = () => {
        const { side, classes } = this.props;

        if (side === 'edit') {
            return (
                <Grid
                    container={true}
                    spacing={3}
                    classes={{ container: classes.gridButton }}
                    justify="flex-end"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.props.handleSubmit}
                    >
                        Save
                    </Button>
                </Grid>
            );
        }

        return null;
    };

    private renderLinkForms = () => {
        const { classes, links } = this.props;

        return links.map((link, i) => {
            const name = `Link${i + 1}`;

            return (
                // tslint:disable-next-line: jsx-key
                <React.Fragment>
                    <TextField
                        label={`${name} Name`}
                        classes={{ root: classes.linkField}}
                        value={link && link.title ? link.title : ''}
                        onChange={e => this.props.handleChangeLinkTitle(e.target.value, i)}
                        margin="normal"
                        placeholder="Enter name"
                        fullWidth={true}
                        InputProps={{ classes: {input: classes.inputOpacity}}}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label={`${name} Url`}
                        classes={{ root: classes.linkField}}
                        value={link && link.url ? link.url : ''}
                        onChange={e => this.props.handleChangeLink(e.target.value, i)}
                        margin="normal"
                        placeholder="Enter url"
                        fullWidth={true}
                        InputProps={{ classes: {input: classes.inputOpacity}}}
                        InputLabelProps={{ shrink: true }}
                    />
                </React.Fragment>
            );
        });
    };
}

export const IEODetails = withStyles(styles, { withTheme: true })(IEODetailsComponent);
