import * as UAParser from 'ua-parser-js';

export const getUserOS = (userAgent: string) => {
    const osParser = new UAParser();
    if (userAgent.length > 0) {
        osParser.setUA(userAgent);
        const parsedUserOS = osParser.getResult().os;

        return parsedUserOS && parsedUserOS.name;
    } else {
        return '-';
    }
};
