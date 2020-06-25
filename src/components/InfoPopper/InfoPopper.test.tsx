import { shallow } from 'enzyme';
import * as React from 'react';
import { InfoPopper } from './InfoPopper';

const defaultProps = {
    anchorEl: null,
    open: false,
    handleClose: jest.fn(),
    data: <div />,
    anchorOrigin: undefined,
    transformOrigin: undefined,
    style: {
        padding: '3px',
    },
};

describe('InfoPopper test', () => {
    it('should render', () => {
        const wrapper = shallow(<InfoPopper {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
