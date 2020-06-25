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
    addIEO,
    addIEOData,
    addIEOError,
} from '../actions';

describe('addIEOSaga test', () => {
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

    const fakeaddIEOResponse = {
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

    const fakeCredentials = {
        name: '',
        currency_id: '',
        supply: 1,
        starts_at: '',
        finishes_at: '',
        pairs: [],
        result: '',
        owner_uid: '',
        type: '',
    };

    const mockAddIEORequest = () => {
        mockAxios.onPost('/admin/ieo/sales').reply(201, fakeaddIEOResponse);
    };

    const expectedActionsFetch = [
        addIEO(fakeCredentials, ''),
        addIEOData(fakeaddIEOResponse),
    ];

    const expectedActionsNetworkError = [
        addIEO(fakeCredentials, ''),
        addIEOError(),
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

    it('should add ieo in success flow', async () => {
        mockAddIEORequest();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });
        store.dispatch(addIEO(fakeCredentials, ''));

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
        store.dispatch(addIEO(fakeCredentials, ''));

        return promise;
    });
});
