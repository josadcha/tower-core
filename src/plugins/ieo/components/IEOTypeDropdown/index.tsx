import {
    createStyles,
    Grid,
    MenuItem,
    TextField,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    column: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    inputOpacity: {
        opacity: 1,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface TypeIEOProps {
    type: string;
    handleUpdateIEO: (event: Event, key: string) => void;
    disabled: boolean;
    typesList: string[];
}

interface Event {
    target: {
        value: string;
    };
}

type Props = TypeIEOProps & StyleProps;

const IEOTypeComponent = (props: Props) => {
    const { type, disabled, handleUpdateIEO, classes, typesList } = props;

    return (
        <Grid item={true} className={classes.column}>
            <TextField
                id="type"
                label="Type"
                placeholder="Select type"
                value={type}
                margin="normal"
                onChange={e => handleUpdateIEO(e, 'type')}
                InputProps={{ classes: {input: classes.inputOpacity}}}
                InputLabelProps={{ shrink: true }}
                select={true}
                fullWidth={true}
                disabled={disabled}
            >
                {typesList.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
            </TextField>
        </Grid>
    );
};

export const IEOTypeDropdown = withStyles(styles, {withTheme: true})(IEOTypeComponent);
