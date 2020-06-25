import * as actions from './actions';

describe('Currencies actions', () => {
    it('should check getCurrenciesList action creator', () => {
        const expectedAction = {
            type: 'CURRENCIES_LIST_FETCH',
            payload: {
                page: 0,
                limit: 0,
            },
        };
        expect(actions.getCurrenciesList(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check getCurrenciesListData action creator', () => {
        const expectedAction = {
            type: 'CURRENCIES_LIST_DATA',
            payload: {
                list: [],
                total: 0,
            },
        };
        expect(actions.getCurrenciesListData(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check getCurrenciesListError action creator', () => {
        const expectedAction = { type: 'CURRENCIES_LIST_ERROR' };
        expect(actions.getCurrenciesListError()).toEqual(expectedAction);
    });

    it('should check addCurrency action creator', () => {
        const expectedAction = {
            type: 'CURRENCY_ADD_FETCH',
            payload: {
                code: 'btc',
                symbol: 'B',
                blockchain_key: 'btc-testnet',
            },
        };
        expect(actions.addCurrency(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check addCurrencyData action creator', () => {
        const expectedAction = {
            type: 'CURRENCY_ADD_DATA',
            payload: {
                currency: {
                    name: 'btc',
                    symbol: 'b',
                    type: 'coin',
                    deposit_fee: '0',
                    min_deposit_amount: '0',
                    withdraw_fee: '0',
                    min_withdraw_amount: '0',
                    withdraw_limit_24h: '0',
                    withdraw_limit_72h: '0',
                    base_factor: 0,
                    precision: 0,
                    min_confirmations: 0,
                    code: 'btc',
                    blockchain_key: 'btc-testnet',
                    min_collection_amount: '0',
                    position: 0,
                    visible: false,
                    options: {
                        erc20_contract_address: '',
                        gas_limit: '',
                        gas_price: '',
                    },
                    icon_url: 'http',
                    created_at: '',
                    updated_at: '',
                    subunits: 0,
                    withdrawal_enabled: true,
                    deposit_enabled: false,
                },
            },
        };
        expect(actions.addCurrencyData(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check addCurrencytError action creator', () => {
        const expectedAction = { type: 'CURRENCY_ADD_ERROR' };
        expect(actions.addCurrencyError()).toEqual(expectedAction);
    });

    it('should check editCurrency action creator', () => {
        const expectedAction = {
            type: 'CURRENCY_EDIT_FETCH',
            payload: {
                code: 'btc',
            },
        };
        expect(actions.editCurrency(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check editCurrencyData action creator', () => {
        const expectedAction = {
            type: 'CURRENCY_EDIT_DATA',
            payload: {
                currency: {
                    name: 'btc',
                    symbol: 'b',
                    type: 'coin',
                    deposit_fee: '0',
                    min_deposit_amount: '0',
                    withdraw_fee: '0',
                    min_withdraw_amount: '0',
                    withdraw_limit_24h: '0',
                    withdraw_limit_72h: '0',
                    base_factor: 0,
                    precision: 0,
                    min_confirmations: 0,
                    code: 'btc',
                    blockchain_key: 'btc-testnet',
                    min_collection_amount: '0',
                    position: 0,
                    visible: false,
                    options: {
                        erc20_contract_address: '',
                        gas_limit: '',
                        gas_price: '',
                    },
                    icon_url: 'http',
                    created_at: '',
                    updated_at: '',
                    subunits: 0,
                    withdrawal_enabled: true,
                    deposit_enabled: false,
                },
            },
        };
        expect(actions.editCurrencyData(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check editCurrencyError action creator', () => {
        const expectedAction = { type: 'CURRENCY_EDIT_ERROR' };
        expect(actions.editCurrencyError()).toEqual(expectedAction);
    });

    it('should check getCurrency action creator', () => {
        const expectedAction = {
            type: 'CURRENCY_GET_FETCH',
            payload: {
                code: 'btc',
            },
        };
        expect(actions.getCurrency(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check getCurrencyData action creator', () => {
        const expectedAction = {
            type: 'CURRENCY_GET_DATA',
            payload: {
                currency: {
                    name: 'btc',
                    symbol: 'b',
                    type: 'coin',
                    deposit_fee: '0',
                    min_deposit_amount: '0',
                    withdraw_fee: '0',
                    min_withdraw_amount: '0',
                    withdraw_limit_24h: '0',
                    withdraw_limit_72h: '0',
                    base_factor: 0,
                    precision: 0,
                    min_confirmations: 0,
                    code: 'btc',
                    blockchain_key: 'btc-testnet',
                    min_collection_amount: '0',
                    position: 0,
                    visible: false,
                    options: {
                        erc20_contract_address: '',
                        gas_limit: '',
                        gas_price: '',
                    },
                    icon_url: 'http',
                    created_at: '',
                    updated_at: '',
                    subunits: 0,
                    withdrawal_enabled: false,
                    deposit_enabled: false,
                },
            },
        };
        expect(actions.getCurrencyData(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check getCurrencyError action creator', () => {
        const expectedAction = { type: 'CURRENCY_GET_ERROR' };
        expect(actions.getCurrencyError()).toEqual(expectedAction);
    });
});
