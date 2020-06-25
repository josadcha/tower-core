import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import {
    mockNetworkError,
    setupMockAxios,
    setupMockStore,
} from '../../../../../helpers';
import { rootSaga } from '../../../../../modules';
import {
    alertData,
    alertDelete,
    alertPush,
} from '../../../../../modules/alert';
import {
    editCurrency,
    editCurrencyData,
    editCurrencyError,
} from '../actions';

describe('editCurrencySaga test', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware<{}>;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, false)();
        sagaMiddleware.run(rootSaga);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    const fakeCredentials = {
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
    };

    const fakeEditCurrencyResponse = {
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
    };

    const mockEditCurrenciesRequest = () => {
        mockAxios.onPost('/admin/currencies/update').reply(200, fakeEditCurrencyResponse);
    };

    const expectedActionsFetch = [
        editCurrency(fakeCredentials),
        editCurrencyData({currency: fakeEditCurrencyResponse}),
    ];

    const expectedActionsNetworkError = [
        editCurrency(fakeCredentials),
        editCurrencyError(),
        alertPush({
            code: 500,
            message: ['Server error'],
            type: 'error',
        }),
        alertData({
            code: 500,
            message: ['Server error'],
            type: 'error',
        }),
        alertDelete(),
    ];

    it('should add currency in success flow', async () => {
        mockEditCurrenciesRequest();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });
        store.dispatch(editCurrency(fakeCredentials));

        return promise;
    });

    it('should trigger network error', async () => {
        mockNetworkError(mockAxios);
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsNetworkError.length) {
                    expect(actions).toEqual(expectedActionsNetworkError);
                    resolve();
                }
            });
        });
        store.dispatch(editCurrency(fakeCredentials));

        return promise;
    });
});
