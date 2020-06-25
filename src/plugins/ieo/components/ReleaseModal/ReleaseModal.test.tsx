import { shallow } from 'enzyme';
import * as React from 'react';
import { ReleaseModal } from './';

const defaultProps = {
    modalClose: jest.fn(),
    open: false,
    handleClick: jest.fn(),
    handleChangeSelect: jest.fn(),
    amount: '',
};

describe('Release Modal page test', () => {
    it('should render', () => {
        const wrapper = shallow(<ReleaseModal {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
