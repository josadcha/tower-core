import {
    buildQueryString,
    capitalize,
    convertToOtp,
    convertToUTCTime,
    isDateInFuture,
    jsonToArray,
    parseList,
} from './';
import { formatDecimal } from './formatDecimal';

// tslint:disable-next-line:no-any
const defaults: any = {
    time: '2019-01-10T12:14:16Z',
    otp: true,
    phones: [
        {
            country: 'UA',
            number: '380000000000',
            validated_at: '2019-01-14T13:54:48.000Z',
        },
        {
            country: 'UA',
            number: '380111111111',
            validated_at: '2019-01-13T13:54:48.000Z',
        },
        {
            country: 'UA',
            number: 380222222222,
            validated_at: null,
        },
    ],
};


describe('Helpers', () => {
    it('convertToOtp', () => {
        expect(convertToOtp(defaults.otp)).toEqual('true');
        expect(convertToOtp(!defaults.otp)).toEqual('false');
    });

    it('convertToUTCTime', () => {
        expect(convertToUTCTime(defaults.time)).toEqual('Thu, 10 Jan 2019 12:14:16 GMT');
        expect(convertToUTCTime('potato')).toEqual('Invalid Date');
    });

    it('buildQueryString', () => {
        expect(buildQueryString({ page: 0, limit: 25 })).toBe('page=0&limit=25');
        expect(buildQueryString({ page: 1, limit: 10 })).toBe('page=1&limit=10');
        expect(buildQueryString({ page: 2, limit: 5 })).toBe('page=2&limit=5');
        expect(buildQueryString({ page: 2, limit: 5, uid: 'ID873B710D88' })).toBe('page=2&limit=5&uid=ID873B710D88');
        expect(buildQueryString({ page: 2, limit: 5, uid: 'ID873B710D88' })).toBe('page=2&limit=5&uid=ID873B710D88');
        expect(buildQueryString({
            page: 1,
            limit: 50,
            uid: 'ID873B710D88',
            role: 'admin',
        })).toBe('page=1&limit=50&uid=ID873B710D88&role=admin');
    });

    it('capitalize', () => {
        expect(capitalize('tower')).toEqual('Tower');
        expect(capitalize('')).toEqual('');
        expect(capitalize(' ')).toEqual(' ');
    });

    it('parseString', () => {
        expect(parseList('tower,tower')).toEqual('tower, tower');
        expect(parseList('tower, tower')).toEqual('tower, tower');
        expect(parseList('tower')).toEqual('tower');
        expect(parseList(' ')).toEqual(' ');
    });

    it('jsonToArray', () => {
        expect(jsonToArray({ path: 'api/v2/barong/resource/users/me' })).toEqual([
            { type: 'key', value: 'path' },
            { type: 'value', value: 'api/v2/barong/resource/users/me' },
        ]);
        expect(jsonToArray({ page: '1', limit: { perPage: '10' }})).toEqual([
            { type: 'key', value: 'page' },
            { type: 'value', value: '1' },
            { type: 'key', value: 'limit' },
            { type: 'key', value: 'perPage'},
            { type: 'value', value: '10'},
        ]);
        expect(jsonToArray(JSON.parse('{}'))).toEqual([]);
    });

    it('isDateInFuture', () => {
        expect(isDateInFuture('Fri, 20 Nov 2029 20:29:11 GMT')).toEqual(true);
        expect(isDateInFuture('Fri, 20 Nov 2010 20:29:11 GMT')).toEqual(false);
        expect(isDateInFuture('')).toEqual(false);
    });

    it('formatDecimal', () => {
        expect(formatDecimal(1, 0)).toEqual('1');
        expect(formatDecimal(undefined, 0)).toEqual('0');
        // tslint:disable-next-line: number-literal-format
        expect(formatDecimal(0.000000008, 2)).toEqual('0.00');
        expect(formatDecimal(1.123, 4)).toEqual('1.1230');
        expect(formatDecimal(0, 4)).toEqual('0.0000');
    });
});
