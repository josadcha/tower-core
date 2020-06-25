import { shallow } from 'enzyme';
import * as React from 'react';
import { IEOTypeDropdown } from './';

const defaultProps = {
    type: '',
    handleUpdateIEO: jest.fn(),
    disabled: false,
    typesList: [],
};

describe('IEOTypeDropdown test', () => {
    it('should render', () => {
        const wrapper = shallow(<IEOTypeDropdown {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
