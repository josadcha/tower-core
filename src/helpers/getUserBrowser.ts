import * as UAParser from 'ua-parser-js';

export const getUserBrowser = (userAgent: string) => {
    const browserParser = new UAParser();
    browserParser.setUA(userAgent);
    if (userAgent.length > 0) {
        const parsedUserBrowser = browserParser.getResult().browser;

        return parsedUserBrowser && parsedUserBrowser.name;
    } else {
        return '-';
    }
};
