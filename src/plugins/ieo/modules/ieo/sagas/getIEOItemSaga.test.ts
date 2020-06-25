import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import {
    mockNetworkError,
    setupMockAxios,
    setupMockStore,
} from '../../../../../helpers';
import {
    alertData,
    alertDelete,
    alertPush,
    rootSaga,
} from '../../../../../modules';
import {
    getIEO,
    getIEOData,
    getIEOError,
} from '../actions';

describe('getIEOSaga test', () => {
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
        id: 1,
    };

    const fakeGetIEOResponse = {
        id: 0,
        name: '',
        description: '',
        owner_uid: '',
        currency_id: '',
        supply: '',
        low_goal: '',
        commission: '',
        min_amount: '',
        max_amount: '0.0',
        min_unit: '',
        state: '',
        collected_amount: '0.0',
        ratio: '3.4',
        starts_at: '',
        finishes_at: '',
        created_at: '',
        updated_at: '',
        pairs: [],
        result: '',
        lockup_percentage: '',
        type: '',
    };

    const mockGetCurrenciesRequest = () => {
        mockAxios.onGet(`/admin/ieo/sales/${fakeCredentials.id}`).reply(200, fakeGetIEOResponse);
    };

    const expectedActionsFetch = [
        getIEO(fakeCredentials),
        getIEOData({ieo: fakeGetIEOResponse}),
    ];

    const expectedActionsNetworkError = [
        getIEO(fakeCredentials),
        getIEOError(),
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

    it('should get IEO in success flow', async () => {
        mockGetCurrenciesRequest();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });
        store.dispatch(getIEO(fakeCredentials));

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
        store.dispatch(getIEO(fakeCredentials));

        return promise;
    });
});
