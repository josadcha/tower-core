import * as actions from './actions';
import { currenciesReducer, initialCurrenciesState } from './reducer';

describe('Currencies reducer', () => {
    it('should handle CURRENCIES_LIST_FETCH', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: true,
            list: [],
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.getCurrenciesList({
                page: 0,
                limit: 0,
            }),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCIES_LIST_DATA', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: false,
            list: [],
            total: 0,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.getCurrenciesListData({
                list: [],
                total: 0,
            }),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCIES_LIST_ERROR', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: false,
            list: [],
            total: 0,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.getCurrenciesListError(),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCY_ADD_FETCH', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: true,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.addCurrency({
                code: 'btc',
                symbol: 'b',
                blockchain_key: 'btc-testnet',
            }),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCY_ADD_DATA', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: false,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.addCurrencyData({
                currency:{
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
            }),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCY_ADD_ERROR', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: false,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.addCurrencyError(),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCY_EDIT_FETCH', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: true,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.editCurrency({
                code: 'btc',
            }),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCY_EDIT_DATA', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: false,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.editCurrencyData({
                currency:{
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
            }),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCY_EDIT_ERROR', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: false,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.editCurrencyError(),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCY_GET_FETCH', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: true,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.getCurrency({
                code: 'btc',
            }),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCY_GET_DATA', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: false,
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
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.getCurrencyData({
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
            }),
        )).toEqual(expectedState);
    });

    it('should handle CURRENCY_GET_ERROR', () => {
        const expectedState = {
            ...initialCurrenciesState,
            loading: false,
            currency: undefined,
        };
        expect(currenciesReducer(
            initialCurrenciesState,
            actions.getCurrenciesListError(),
        )).toEqual(expectedState);
    });

});
