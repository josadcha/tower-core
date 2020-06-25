import {
    createStyles,
    Paper,
    Popover,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { PopoverOrigin } from '@material-ui/core/Popover';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    popper: {
        minWidth: 150,
        padding: '10px 0px',
    },
    info: {
        minWidth: 225,
        minHeight: 'auto',
    },
    title: {
        opacity: 0.54,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface PopperProps {
    anchorEl: HTMLElement | null;
    anchorOrigin: PopoverOrigin | undefined;
    transformOrigin: PopoverOrigin | undefined;
    open: boolean;
    handleClose: () => void;
    data: JSX.Element;
    style?: React.CSSProperties;
    // tslint:disable-next-line:no-any
    action?: (e: any) => void;
    transitionDuration?: number;
}

type Props = StyleProps & PopperProps;

const PopperComponent: React.FunctionComponent<Props> = props => {
    const {
        anchorEl,
        open,
        handleClose,
        data,
        classes,
        anchorOrigin,
        transitionDuration,
        transformOrigin,
        action,
        style,
    } = props;

    const id = open ? 'simple-popper' : undefined;

    return (
        <Popover
            action={action}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            transitionDuration={transitionDuration}
            className={classes.popper}
        >
            <Paper style={style} className={classes.info}>{data}</Paper>
        </Popover>
    );
};

export const InfoPopper = withStyles(styles, { withTheme: true })(PopperComponent);
