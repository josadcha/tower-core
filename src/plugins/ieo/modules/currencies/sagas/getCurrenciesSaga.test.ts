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
    getCurrenciesList,
    getCurrenciesListData,
    getCurrenciesListError,
} from '../actions';

describe('GetCurrenciesSaga test', () => {
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

    const fakeCurrenciesResponse = [];
    const fakeHeaders = { total: 0 };

    const mockGetCurrenciesRequest = () => {
        mockAxios.onGet('/admin/currencies?page=1&limit=10').reply(200, fakeCurrenciesResponse, fakeHeaders);
    };

    const expectedActionsFetch = [
        getCurrenciesList(fakeCredentials),
        getCurrenciesListData({ list: fakeCurrenciesResponse, total: 0}),
    ];

    const expectedActionsNetworkError = [
        getCurrenciesList(fakeCredentials),
        getCurrenciesListError(),
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

    it('should get currencies in success flow', async () => {
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
        store.dispatch(getCurrenciesList(fakeCredentials));

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
        store.dispatch(getCurrenciesList(fakeCredentials));

        return promise;
    });
});
