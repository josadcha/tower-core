import { peatioUrl } from '../api/config';

export const getRequestDependsOnRoute = (route: string) => {
    switch (route) {
        case '/tower/exchange/trades':
            return `${peatioUrl()}/admin/trades.csv`;
        case '/tower/accountings/deposits':
            return `${peatioUrl()}/admin/deposits.csv`;
        case '/tower/accountings/withdrawals':
            return `${peatioUrl()}/admin/withdraws.csv`;
        case '/tower/accountings/withdrawals-pending':
            return `${peatioUrl()}/admin/withdraws.csv`;
        case '/tower/accountings/adjustments':
            return `${peatioUrl()}/admin/adjustments.csv`;
        case '/tower/exchange/orders/open':
            return `${peatioUrl()}/admin/orders.csv`;
        case '/tower/exchange/orders/history':
            return `${peatioUrl()}/admin/orders.csv`;
        default:
            return '';
    }
};
