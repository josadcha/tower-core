import { shallow } from 'enzyme';
import * as React from 'react';
import { IEOEdit } from './';

describe('Edit IEO test', () => {
    it('should render', () => {
        const wrapper = shallow(<IEOEdit />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
