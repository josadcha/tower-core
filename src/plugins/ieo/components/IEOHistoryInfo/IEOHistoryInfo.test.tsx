import { shallow } from 'enzyme';
import * as React from 'react';
import { IEOHistoryInfo } from './';

const defaultProps = {
    token: '',
    price: '',
    ratio: '',
    soldAmount: '',
};

describe('IEO Deatils page test', () => {
    it('should render', () => {
        const wrapper = shallow(<IEOHistoryInfo {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
