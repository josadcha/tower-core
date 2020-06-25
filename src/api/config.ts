
export interface Config {
    authUrl: string;
    applogicUrl: string;
    peatioUrl: string;
    finexUrl: string;
    tablePageLimit: number;
    msAlertDisplayTime: string;
    withCredentials: boolean;
}

export const defaultConfig: Config = {
    applogicUrl: '',
    authUrl: '',
    peatioUrl: '',
    finexUrl: '',
    msAlertDisplayTime: '5000',
    tablePageLimit: 100,
    withCredentials: false,
};

export const Tower = {
    config: defaultConfig,
};

declare global {
    interface Window {
        env: Config;
    }
}

window.env = window.env || defaultConfig;
Tower.config = { ...window.env };

const raiseConfigErrorMessage = (key: string) => {
    window.console.log(`Config for ${key} is missing`);

    return '';
};

export const applogicUrl = () => Tower.config.applogicUrl || '';
export const authUrl = () => Tower.config.authUrl || raiseConfigErrorMessage('authUrl');
export const peatioUrl = () => Tower.config.peatioUrl || raiseConfigErrorMessage('peatioUrl');
export const finexUrl = () => Tower.config.finexUrl || '';
export const msAlertDisplayTime = () => Tower.config.msAlertDisplayTime || defaultConfig.msAlertDisplayTime;
export const tablePageLimit = () => Tower.config.tablePageLimit || defaultConfig.tablePageLimit;
export const withCredentials = () => Tower.config.withCredentials;
