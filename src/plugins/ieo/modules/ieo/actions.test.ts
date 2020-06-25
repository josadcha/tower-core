import * as actions from './actions';

describe('IEO actions', () => {
    it('should check getListIEO action creator', () => {
        const expectedAction = {
            type: 'IEO_LIST_FETCH',
            payload: {
                page: 0,
                limit: 0,
            },
        };
        expect(actions.getListIEO(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check getListIEOData action creator', () => {
        const expectedAction = {
            type: 'IEO_LIST_DATA',
            payload: {
                list: [],
                total: 0,
            },
        };
        expect(actions.getListIEOData(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check getListIEOError action creator', () => {
        const expectedAction = { type: 'IEO_LIST_ERROR' };
        expect(actions.getListIEOError()).toEqual(expectedAction);
    });

    it('should check addIEO action creator', () => {
        const expectedAction = {
            type: 'IEO_ADD_FETCH',
            payload: {
                name: 'test',
                currency_id: 'eth',
                supply: 2,
                starts_at: '2019-09-19T10:30:02.000Z',
                finishes_at: '2019-09-19T10:30:02.000Z',
                pairs: [],
                owner_uid: '',
                result: '',
                type: '',
            },
            metadataPayload: '',
        };
        expect(actions.addIEO(expectedAction.payload, '')).toEqual(expectedAction);
    });

    it('should check addCurrencyData action creator', () => {
        const expectedAction = {
            type: 'IEO_ADD_DATA',
            payload: {
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
                min_unit: '0.0',
                state: 'pending',
                result: '',
                lockup_percentage: '',
                collected_amount: '0.0',
                ratio: '3.4',
                starts_at: '2019-09-19T10:30:02.000Z',
                finishes_at: '2019-09-22T10:30:02.000Z',
                created_at: '2019-09-19T10:30:02.000Z',
                updated_at: '2019-09-19T10:30:02.000Z',
                type: '',
                pairs: [
                    {
                        id: 104,
                        sale_id: 331,
                        quote_currency_id: 'btc',
                        price: '2.4',
                        created_at: '2019-09-19T10:30:02.000Z',
                        updated_at: '2019-09-19T10:30:02.000Z',
                    },
                ],
            },
        };
        expect(actions.addIEOData(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check addCurrencytError action creator', () => {
        const expectedAction = { type: 'IEO_ADD_ERROR' };
        expect(actions.addIEOError()).toEqual(expectedAction);
    });
});
