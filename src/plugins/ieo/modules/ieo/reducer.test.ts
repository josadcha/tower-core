import * as actions from './actions';
import { ieoReducer, initialStateIEO } from './reducer';

describe('ieo reducer', () => {
    it('should handle IEO_LIST_FETCH', () => {
        const expectedState = {
            ...initialStateIEO,
            loading: true,
            list: [],
        };
        expect(ieoReducer(
            initialStateIEO,
            actions.getListIEO({
                page: 0,
                limit: 0,
            }),
        )).toEqual(expectedState);
    });

    it('should handle IEO_LIST_DATA', () => {
        const expectedState = {
            ...initialStateIEO,
            loading: false,
            list: [],
            total: 0,
        };
        expect(ieoReducer(
            initialStateIEO,
            actions.getListIEOData({
                list: [],
                total: 0,
            }),
        )).toEqual(expectedState);
    });

    it('should handle IEO_LIST_ERROR', () => {
        const expectedState = {
            ...initialStateIEO,
            loading: false,
            list: [],
            total: 0,
        };
        expect(ieoReducer(
            initialStateIEO,
            actions.getListIEOError(),
        )).toEqual(expectedState);
    });

    it('should handle IEO_ADD_FETCH', () => {
        const expectedState = {
            ...initialStateIEO,
            loading: true,
        };
        expect(ieoReducer(
            initialStateIEO,
            actions.addIEO({
                name: '',
                currency_id: '',
                supply: 1,
                starts_at: '',
                finishes_at: '',
                pairs: [],
                owner_uid: '',
                result: '',
                type: '',
            }, ''),
        )).toEqual(expectedState);
    });

    it('should handle IEO_ADD_DATA', () => {
        const expectedState = {
            ...initialStateIEO,
            loading: false,
        };
        expect(ieoReducer(
            initialStateIEO,
            actions.addIEOData({
                id: 331,
                name: 'test',
                description: '',
                owner_uid: '946111b1-02cd-472d-8e12-38a321d20bb8',
                currency_id: 'eth',
                supply: '34.2',
                low_goal: '0.0',
                commission: '0.0',
                min_amount: '0.0',
                max_amount: '0.0',
                result: '',
                lockup_percentage: '',
                min_unit: '0.0',
                state: 'pending',
                collected_amount: '0.0',
                ratio: '3.4',
                starts_at: '2019-09-19T10:30:02.000Z',
                finishes_at: '2019-09-22T10:30:02.000Z',
                created_at: '2019-09-19T10:30:02.000Z',
                updated_at: '2019-09-19T10:30:02.000Z',
                type: '',
                pairs:
                [
                    {
                        id: 104,
                        sale_id: 331,
                        quote_currency_id: 'btc',
                        price: '2.4',
                        created_at: '2019-09-19T10:30:02.000Z',
                        updated_at: '2019-09-19T10:30:02.000Z',
                    },
                ],
            }),
        )).toEqual(expectedState);
    });

    it('should handle IEO_ADD_ERROR', () => {
        const expectedState = {
            ...initialStateIEO,
            loading: false,
        };
        expect(ieoReducer(
            initialStateIEO,
            actions.addIEOError(),
        )).toEqual(expectedState);
    });
});
