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
    getListIEO,
    getListIEOData,
    getListIEOError,
} from '../actions';

describe('GetIEOSaga test', () => {
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
        page: 1,
        limit: 10,
    };

    const fakeIEOResponse = [];
    const fakeHeaders = { total: 0 };

    const mockGetIEORequest = () => {
        mockAxios.onGet('/admin/ieo/sales?page=1&limit=10').reply(200, fakeIEOResponse, fakeHeaders);
    };

    const expectedActionsFetch = [
        getListIEO(fakeCredentials),
        getListIEOData({ list: fakeIEOResponse, total: 0}),
    ];

    const expectedActionsNetworkError = [
        getListIEO(fakeCredentials),
        getListIEOError(),
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

    it('should get ieo in success flow', async () => {
        mockGetIEORequest();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });
        store.dispatch(getListIEO(fakeCredentials));

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
        store.dispatch(getListIEO(fakeCredentials));

        return promise;
    });
});
