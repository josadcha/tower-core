import {
    createStyles,
    FormControl,
    Input,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { InputMask } from 'react-input-mask';

const styles = (theme: Theme) => createStyles({
    margin: {
        margin: '16px 0 8px',
        width: '100%',
    },
    inputOpacity: {
        opacity: 1,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface DateAndTimePickerProps {
    date: string | number;
    handleChangeDate: (date: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    disabled?: boolean;
    label: string;
}

type Props = StyleProps & DateAndTimePickerProps;

const DateTimePickerComponent: React.FunctionComponent<Props> = props => {
    const { classes, date, disabled, label } = props;

    return (
        <FormControl className={classes.margin}>
            <Typography variant="caption">{label}</Typography>
            <Input
                value={date}
                onChange={props.handleChangeDate}
                disabled={disabled}
                placeholder="DD-MM-YYYY HH:mm:ss"
                fullWidth={true}
                classes={{input: classes.inputOpacity}}
            >
                <InputMask mask="DD-MM-YYYY HH:mm:ss" />
            </Input>
        </FormControl>
    );
};

// tslint:disable-next-line: no-any
export const DateTimePicker = withStyles(styles, { withTheme: true })(DateTimePickerComponent as any);
