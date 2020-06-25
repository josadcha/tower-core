import { shallow } from 'enzyme';
import * as React from 'react';
import { IEOComponent } from './';

const defaultProps = {
    ieo: {},
    getBaseCurrencies: jest.fn(),
    getQuoteCurrencies: jest.fn(),
    handleUpdateIEO: jest.fn(),
    pageType: '',
    handleUpdatePrice: jest.fn(),
};

describe('IEO Deatils page test', () => {
    it('should render', () => {
        const wrapper = shallow(<IEOComponent {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
