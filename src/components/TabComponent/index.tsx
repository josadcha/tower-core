import {
    createStyles,
    Tab,
    Tabs as MaterialTabs,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';

const styles = (theme: Theme) => (createStyles({
    label: {
        textTransform: 'none',
        fontSize: '12px',
        color: '#000000',
        minWidth: 135,
        maxWidth: 150,
        opacity: 1,
        minHeight: 28,
    },
    tabs: {
        minHeight: 30,
        marginBottom: 24,
        '& div': {
            borderBottom: '.3px solid rgba(0,0,0, 0.4)',
        },
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface TabProps {
    activeIndex: number;
    labels: string[];
    handleChange: (event: React.ChangeEvent<{}>, index: number) => void;
    // tslint:disable-next-line:no-any
    rootClassNames?: any;
}

type Props = StyleProps & TabProps;

const TabComponent: React.FunctionComponent<Props> = props => {
    const {
        activeIndex,
        labels,
        handleChange,
        classes,
        rootClassNames,
    } = props;

    const getTabs = () => labels.map((item: string, index: number) =>
        <Tab label={item} className={classes.label} key={index}/>);
    const rootCx = classnames(classes.tabs, rootClassNames);

    return (
        <MaterialTabs
            value={activeIndex}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            className={rootCx}
        >
            {getTabs()}
        </MaterialTabs>
    );
};

export const Tabs = withStyles(styles, { withTheme: true })(TabComponent);
