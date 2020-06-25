import {
    Button,
    createStyles,
    IconButton,
    Paper,
    Table as MaterialTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import {
    ArrowForwardIos,
    AttachFile,
    ChevronRight,
    Delete,
    Edit,
    HighlightOff,
    InfoOutlined,
} from '@material-ui/icons';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    capitalize,
    convertToOtp,
    getUserBrowser,
    getUserOS,
    localeDate,
    parseList,
    truncateString,
} from '../../helpers';

export interface RowItemInterface {
    key: string;
    alignRight: boolean;
    label: string | JSX.Element;
    children?: React.ReactElement<'div'>;
}

interface TableProps {
    dataLength: number;
    rows: RowItemInterface[];
    // tslint:disable-next-line no-any
    data: any;
    page?: number;
    rowsPerPage: number;
    handleChangePage?: (page: number) => void;
    handleChangeRowsPerPage?: (rows: number) => void;
    hidePagination?: boolean;
    location?: {
        pathname: string;
    };
    handleOpen?: (index: number, uid?: string) => void;
    redirectKey?: string;
    handleOpenPopper?: (i: number) => (event: React.MouseEvent<HTMLElement>) => void;
    getSelectIcon?: (uid: string) => JSX.Element;
    // tslint:disable-next-line no-any
    handleRowOnClick?: (n: any) => void;
    isSmall?: boolean;
    showAll?: boolean;
    returnFirstPage?: boolean;
    handleShowAll?: () => void;
    handleReturnFirstPage?: () => void;
    handleEdit?: (index: number) => void;
    handleDelete?: (index: number) => void;
    getRowStatus?: (uid: string) => boolean;
    stickyHeader?: boolean;
    disableTotal?: boolean;
}

const styles = (theme: Theme) => (createStyles({
    root: {
        width: '100%',
    },
    table: {
        width: '100%',
    },
    paperStyle: {
        marginBottom: 25,
        position: 'relative',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableWrapperMaxHeight: {
        maxHeight: '70vh',
    },
    link: {
        cursor: 'pointer',
        color: '#000',
        textDecoration: 'none',
        letterSpacing: '0.4px',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    label: {
        letterSpacing: '0.15px',
        padding: '16px',
        paddingBottom: '0px',
        fontWeight: 600,
    },
    headers: {
        fontWeight: 600,
        fontSize: '12px',
        letterpacing: '0.1px',
    },
    content: {
        fontWeight: 400,
        letterSpacing: '0.4px',
        color: '#666666',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    emptyTable: {
        padding: theme.spacing(1),
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'center',
    },
    selectIcon: {
        paddingLeft: '10px',
    },
    active: {
        color: '#00A41A',
        textTransform: 'capitalize',
    },
    attachment: {
        color: 'rgba(0, 0, 0, 0.87)',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    banned: {
        color: '#E23328',
        textTransform: 'capitalize',
    },
    wait: {
        color: '#E3B930',
    },
    grey: {
        cursor: 'pointer',
        color: '#979797',
    },
    cell: {
        padding: '4px 0px',
    },
    arrowForwardIos: {
        fill: '#979797',
        fontSize: 16,
        marginTop: 5,
    },
    icon: {
        cursor: 'pointer',
        color: '#979797',
        opacity: 0.5,
    },
    tableHeader: {
        zIndex: 0,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #cccccc',
    },
    colorLightGrey: {
        color: '#666666',
    },
    row: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
        },
    },
    small: {
        padding: '4px 24px 4px 12px',
        textAlign: 'center',
    },
    showAll: {
        background: '#0030AE',
        textTransform: 'none',
        color: '#FFFFFF',
        padding: '3px 16px',
        width: 'max-content',
        maxWidth: '165px',
        '&:hover': {
            background: '#0030AE',
        },
        position: 'absolute',
        bottom: 12,
        left: 16,
    },
    footer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settings: {
        color: '#979797',
        cursor: 'pointer',
        marginRight: 30,
        opacity: 0.5,
    },
    black: {
        color: 'rgba(0, 0, 0, 0.87)',
    },
    selected: {
        backgroundColor: '#0030AE',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 48, 174, 0.8)',
            cursor: 'pointer',
        },
    },
    selectedCell: {
        color: '#FFFFFF',
        fontWeight: 500,
        letterSpacing: '0.4px',
    },
    selectedLink: {
        cursor: 'pointer',
        textDecoration: 'none',
        letterSpacing: '0.4px',
        color: '#FFFFFF',
    },
    selectedAttachments: {
        color: '#FFFFFF',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    white: {
        color: '#FFFFFF',
        cursor: 'pointer',
    },
    chevronGrey: {
        opacity: 0.5,
    },
    cancel: {
        display: 'flex',
        position: 'relative',
        opacity: 0.5,
        alignItems: 'center',
        cursor: 'pointer',
        color: '#979797',
        '&:hover': {
            color: '#E23328',
            opacity: 1,
        },
    },
    cancelIcon: {
        marginLeft: theme.spacing(1),
        cursor: 'pointer',
    },
    disablePagination: {
        display: 'none',
    },
    returnMargin: {
        position: 'relative',
        marginTop: 25,
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

type Props = StyleProps & TableProps;

class TableComponent extends React.Component<Props> {
    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paperStyle}>
                    {this.renderContent()}
                </Paper>
            </div>
        );
    }

    private renderContent = () => {
        const {
            classes,
            data,
            showAll,
            returnFirstPage,
            page,
            stickyHeader = true,
        } = this.props;
        const cx = classNames(
            classes.tableWrapper,
            {[classes.tableWrapperMaxHeight]: stickyHeader},
        );

        if (!data.length) {
            return (
                <div>
                    <Typography
                        variant="caption"
                        align="center"
                        className={classes.emptyTable}
                    >
                        There is no data to show
                    </Typography>
                    { (showAll || returnFirstPage) && page !== 0 && this.getFirstPage() }
                </div>
            );
        }

        return (
            <div className={classes.root}>
                <TableContainer className={cx}>
                    <MaterialTable stickyHeader={stickyHeader} className={classes.table} aria-labelledby="tableTitle">
                        {this.getHeaderForTable()}
                        <TableBody>
                            {data.map((n, i) => this.renderTableRow(n, i))}
                        </TableBody>
                    </MaterialTable>
                </TableContainer>
                {this.getPagination()}
            </div>
        );
    };

    private renderTableRow = (n, i) => {
        const {
            rows,
            classes,
            getRowStatus,
        } = this.props;
        const isSelected = getRowStatus && getRowStatus(n.uid);

        return (
            <TableRow
                className={isSelected ? classes.selected : classes.row}
                key={i}
                onClick={() => this.props.handleRowOnClick && this.props.handleRowOnClick(n)}
            >
                {rows.map((row, index) => this.getTableCell(n, row, index, i, isSelected))}
            </TableRow>
        );
    };

    private getTableCell = (n, row, cellIndex, rowIndex, isSelected) => {
        const { classes, isSmall } = this.props;
        const cx = classNames({
            [classes.small]: isSmall,
            [classes.selectedCell]: isSelected && !isSmall,
        });

        return (
            <TableCell
                key={cellIndex}
                component="td"
                align={row.alignRight ? 'right' : 'left'}
                className={cx}
            >
                <Typography
                    variant="caption"
                    gutterBottom={true}
                    className={isSelected ? classes.selectedCell : classes.content}
                >
                    {this.getTableCellLabel(n, row, rowIndex, isSelected)}
                </Typography>
            </TableCell>
        );
    };

    private getTableCellLabel = (n, row, i, isSelected) => {
        const {
            classes,
            getSelectIcon,
        } = this.props;

        switch (row.key) {
            case 'maker_order_email':
                return (
                    <Link
                        to={`/tower/users/user-directory/${n.maker_uid}${row.linkSuffix || '/main'}`}
                        className={classes.link}
                        onClick={e => e.stopPropagation()}
                    >
                        {n.maker_order_email}
                    </Link>
                );
            case 'taker_order_email':
                return (
                    <Link
                        to={`/tower/users/user-directory/${n.taker_uid}${row.linkSuffix || '/main'}`}
                        className={classes.link}
                        onClick={e => e.stopPropagation()}
                    >
                        {n.taker_order_email}
                    </Link>
                );
            case 'uid':
            case 'referral_uid':
            case 'creator_uid':
            case 'maker_uid':
            case 'taker_uid':
                return (
                    <Link
                        to={`/tower/users/user-directory/${n[row.key]}${row.linkSuffix || '/main'}`}
                        className={isSelected ? classes.selectedLink : classes.link}
                        onClick={e => e.stopPropagation()}
                    >
                        {n[row.key]}
                    </Link>
                );
            case 'email':
                return (
                    <Link
                        to={`/tower/users/user-directory/${n.uid}${row.linkSuffix || '/main'}`}
                        className={isSelected ? classes.selectedLink : classes.link}
                        onClick={e => e.stopPropagation()}
                    >
                        {n[row.key]}
                    </Link>
                );
            case 'user_email':
                return (
                    <Link
                        to={`/tower/users/user-directory/${n.user && n.user.uid}/main`}
                        className={classes.link}
                        onClick={e => e.stopPropagation()}
                    >
                        {n.user && n.user.email}
                    </Link>
                );
            case 'otp':
                return <span>{convertToOtp(n.otp) === 'true' ? '2FA' : '-'}</span>;
            case 'upload':
                const docs = (n.documents && n.documents.length) || 1;

                return (
                    <span className={isSelected ? classes.selectedAttachments : classes.attachment}>
                        {docs}&nbsp;&nbsp;
                        <AttachFile
                            onClick={this.handleOpenCarousel(i, n.uid)}
                            className={isSelected ? classes.white : classes.grey}
                        />
                    </span>
                );
            case 'created_at':
            case 'validated_at':
            case 'updated_at':
                return <span>{localeDate(n[row.key], 'fullDate')}</span>;
            case 'browser':
                return <span>{getUserBrowser(n.user_agent)}</span>;
            case 'os':
                return <span>{getUserOS(n.user_agent)}</span>;
            case 'user_role':
                return <span>{n.user && n.user.role}</span>;
            case 'doc_expire':
                return <span>{localeDate(n[row.key], 'date')}</span>;
            case 'state':
            case 'status':
            case 'taker_type':
            case 'result':
            case 'side':
                return this.getColored(capitalize(n[row.key]));
            case 'visible':
                return this.getColored(this.getVisibleState(n[row.key]));
            case 'deposit_enabled':
            case 'withdrawal_enabled':
                return this.getColored(this.getWithdrawDepositState(n[row.key]));
            case 'name':
                return n.lastProfile ? (`${n.lastProfile.first_name} ${n.lastProfile.last_name}`) : (n.name ? n.name : '-');
            case 'max_balance':
                return n[row.key];
            case 'country':
                return n.lastProfile ? n.lastProfile.country : '-';
            case 'link':
                return <ArrowForwardIos className={classes.arrowForwardIos} />;
            case 'role':
            case 'type':
            case 'ord_type':
            case 'reference_type':
            case 'kind':
            case 'currency':
            case 'code':
            case 'market':
            case 'client':
            case 'market_id':
                return n[row.key].toString().toUpperCase();
            case 'admin_email':
                return (
                    <Link
                        to={`/tower/users/user-directory/${n.admin && n.admin.uid}/main`}
                        className={classes.link}
                        onClick={e => e.stopPropagation()}
                    >
                        {n.admin && n.admin.email}
                    </Link>
                );
            case 'admin_role':
                return <span>{n.admin && capitalize(n.admin.role)}</span>;
            case 'target':
                return (
                    <Link
                        to={`/tower/users/user-directory/${n.target && n.target.uid}/main`}
                        className={classes.link}
                        onClick={e => e.stopPropagation()}
                    >
                        {(n.target && n.target.email) || '-'}
                    </Link>
                );
            case 'user_ip':
                return <span>{parseList(n.user_ip)}</span>;
            case 'info':
                return (
                    <IconButton onClick={e => this.handleInfoClick(e, i)}>
                        <InfoOutlined className={classes.icon} />
                    </IconButton>
                );
            case 'total':
                return n.total
                    || (parseFloat(n.balance) + parseFloat(n.locked))
                    || (parseFloat(n.amount) * parseFloat(n.price)) || '0.0';
            case 'selectIcon':
                return getSelectIcon && getSelectIcon(n.uid);
            case 'arrow_icon':
                return <ChevronRight className={classes.chevronGrey}/>;
            case 'settings':
                return (
                    <React.Fragment>
                        <Edit onClick={this.handleEditRow(n.id)} className={classes.settings} />
                        <Delete onClick={this.handleDeleteRow(n.id)} className={classes.settings}/>
                    </React.Fragment>
                );
            case 'id':
            case 'maker_order_id':
            case 'taker_order_id':
                return <span className={classes.black}>{n[row.key]}</span>;
            case 'address':
            case 'rid':
            case 'deposit_address':
                return n.explorer_address ?
                    (
                      <a
                          href={n.explorer_address}
                          className={classes.link}
                          onClick={e => e.stopPropagation()}
                          target="blank"
                      >
                          {n[row.key]}
                      </a>
                    ) : <span className={classes.black}>{n[row.key]}</span>;
            case 'maker':
            case 'taker':
                return `${(n[row.key] * 100).toFixed(4)}%`;
            case 'verb':
            case 'action':
                return n[row.key].toLowerCase();
            case 'cancel':
                return (
                    <div onClick={this.handleDeleteRow(n.id)} className={classes.cancel}>
                        Cancel
                        <HighlightOff className={classes.cancelIcon}/>
                    </div>
                );
            case 'blockchain_txid':
            case 'txid':
                if (n[row.key]) {
                    return n.explorer_txid ?
                        (
                            <a
                                href={n.explorer_txid}
                                className={classes.link}
                                onClick={e => e.stopPropagation()}
                                target="blank"
                            >
                                {n[row.key]}
                            </a>
                        ) : <span>{n[row.key]}</span>;
                } else {
                    return '';
                }
            case 'maker_fee':
                return `${n.maker_fee_amount} ${n.maker_fee_currency.toUpperCase()}`;
            case 'taker_fee':
                return `${n.taker_fee_amount} ${n.taker_fee_currency.toUpperCase()}`;
            case 'data_address':
                return `${truncateString(n.data.address, 8)}`;
            case 'data_account_number':
                return `${truncateString(n.data.account_number, 8)}`;
            default:
                return <span>{n[row.key]}</span>;
        }
    };

    private handleInfoClick = (event, i) => {
        const { handleOpenPopper } = this.props;

        event.stopPropagation();
        handleOpenPopper && handleOpenPopper(i)(event);
    };

    private getPagination = () => {
        const {
            classes,
            dataLength,
            hidePagination,
            page,
            rowsPerPage,
            showAll,
            returnFirstPage,
        } = this.props;

        if (hidePagination) {
            return null;
        }

        return (
            <div className={classes.footer}>
                <TablePagination
                    component="div"
                    count={Number(dataLength)}
                    rowsPerPage={rowsPerPage}
                    page={page || 0}
                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    classes={{ selectIcon: classes.selectIcon, root: returnFirstPage ? classes.disablePagination : '' }}
                    labelDisplayedRows={this.getLabelDisplayedRows}
                />
                {(showAll && this.getShowAllButton()) || (returnFirstPage && this.getFirstPage())}
            </div>
        );
    };

    private getLabelDisplayedRows = ({ from, to, count}) => {
        const { disableTotal } = this.props;

        if (disableTotal) {
            return `${from} - ${to}`;
        }

        return `${from}-${to === -1 ? count : to} of ${count}`;
    };

    private getFirstPage = () => {
        const { classes, handleReturnFirstPage } = this.props;

        return <Button className={`${classes.showAll} ${classes.returnMargin}`} onClick={handleReturnFirstPage}>Return to page 1</Button>;
    };

    private getShowAllButton = () => {
        const { classes, handleShowAll } = this.props;

        return <Button className={classes.showAll} onClick={handleShowAll}>Show all</Button>;
    };

    private handleChangePage = (event, page) => {
        this.props.handleChangePage && this.props.handleChangePage(page);
    };

    private handleChangeRowsPerPage = event => {
        this.props.handleChangeRowsPerPage && this.props.handleChangeRowsPerPage(event.target.value);
    };

    private handleOpenCarousel = (i: number, uid?: string) => event => {
        const { handleOpen } = this.props;

        event.stopPropagation();
        handleOpen && handleOpen(i, uid);
    };

    private getHeaderForTable = () => {
        return (
            <TableHead>
                <TableRow>
                    {this.props.rows.map((row: RowItemInterface) => this.getTableHeaderCell(row))}
                </TableRow>
            </TableHead>
        );
    };

    private getTableHeaderCell = row => {
        const { classes, isSmall } = this.props;
        const className = `${isSmall && classes.small} ${classes.tableHeader}`;

        return (
            <TableCell
                key={row.key}
                align={row.alignRight ? 'right' : 'left'}
                className={className}
            >
                <Typography
                    variant="subtitle2"
                    gutterBottom={true}
                    className={classes.headers}
                >
                    {row.label}
                </Typography>
            </TableCell>
        );
    };

    private getVisibleState = (value: boolean) => value ? 'Active' : 'Disabled';
    private getWithdrawDepositState = (value: boolean) => value ? 'Enabled' : 'Disabled';

    private getColored = (state: string) => {
        const { classes } = this.props;

        // tslint:disable-next-line:prefer-switch
        if (state === 'Pending' ||
            state === 'Processing' ||
            state === 'Wait' ||
            state === 'Submitted' ||
            state === 'Confirming' ||
            state === 'Accepted' ||
            state === 'Hidden'
        ) {
            return <span className={classes.wait}>{state}</span>;
        }

        /* IEO */
        // tslint:disable-next-line:prefer-switch
        if (state === 'Preparing'
            || state === 'Draft'
            || state === 'Refunding'
            || state === 'Ongoing'
        ) {
            return <span className={classes.wait}>{state}</span>;
        } else if (state === 'Active'
            || state === 'Executing'
            || state === 'Completed'
            || state === 'Distributing'
            || state === 'Finished'
            || state === 'Purchased'
        ) {
            return <span className={classes.active}>{state}</span>;
        }
        /* IEO */

        return state === 'Active'
            || state === 'Succeed'
            || state === 'Done'
            || state === 'Buy'
            || state === 'Collected'
            || state === 'Enabled'
            || state === 'Verified' ?
            <span className={classes.active}>{state}</span>
            : <span className={classes.banned}>{state}</span>;
    };

    private handleDeleteRow = (i: number) => event => {
        const { handleDelete } = this.props;

        event.stopPropagation();
        handleDelete && handleDelete(i);
    };

    private handleEditRow = (i: number) => event => {
        const { handleEdit } = this.props;

        event.stopPropagation();
        handleEdit && handleEdit(i);
    };

}

export const Table = withStyles(styles, { withTheme: true })(TableComponent);
