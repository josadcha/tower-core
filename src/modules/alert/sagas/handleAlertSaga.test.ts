import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga } from '../../';
import { defaultConfig, Tower } from '../../../api/config';
import { setupMockAxios, setupMockStore } from '../../../helpers/jest';
import { ALERT_DATA, ALERT_DELETE, ALERT_PUSH } from '../../constants';
import { alertPush } from '../actions';

const debug = false;

describe('Alert success handler', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware<{}>;
    let mockAxios: MockAdapter;

    afterEach(() => {
        mockAxios.reset();
    });

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, debug)();
        sagaMiddleware.run(rootSaga);
        Tower.config = {
            ...defaultConfig,
            msAlertDisplayTime: '0.01',
        };
    });

    const successActionPayload = {
        message: ['Success message'],
        type: 'success',
    };

    const expectedSuccessAlertPushAction = {
        type: ALERT_PUSH,
        payload: successActionPayload,
    };

    const expectedSuccessAlertDataAction = {
        type: ALERT_DATA,
        payload: successActionPayload,
    };

    const expectedSuccessAlertDeleteAction = {
        type: ALERT_DELETE,
    };

    it('should handle success alert', async () => {
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                switch (actions.length) {
                    case 1:
                        expect(actions).toEqual([expectedSuccessAlertPushAction]);
                        setTimeout(resolve, 0.01);
                        break;
                    case 2:
                        expect(actions).toEqual([expectedSuccessAlertPushAction, expectedSuccessAlertDataAction]);
                        setTimeout(resolve, 0.01);
                        break;
                    case 3:
                        expect(actions).toEqual([
                            expectedSuccessAlertPushAction,
                            expectedSuccessAlertDataAction,
                            expectedSuccessAlertDeleteAction,
                        ]);
                        setTimeout(resolve, 0.01);
                        break;
                    default:
                        fail();
                }
            });
        });
        store.dispatch(alertPush(successActionPayload));

        return promise;
    });
});
