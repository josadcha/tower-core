import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Middleware } from 'redux';
import configureMockStore from 'redux-mock-store';
import { Config, Tower } from '../api/config';

const mockConfig: Config = {
    applogicUrl: '/api/v2/applogic',
    authUrl: '/api/v2/barong',
    peatioUrl: '/api/v2/peatio',
    finexUrl: '/api/v2/finex',
    msAlertDisplayTime: '3000',
    tablePageLimit: 50,
    withCredentials: false,
};

export const setupMockStore = (appMiddleware: Middleware, log = false) => configureMockStore([appMiddleware]);

export const setupMockAxios = () => {
    Tower.config = mockConfig;

    return new MockAdapter(Axios);
};

export const mockNetworkError = mockAxios => {
    mockAxios.onAny().networkError();
};
