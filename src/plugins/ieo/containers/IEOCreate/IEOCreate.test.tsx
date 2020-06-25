import { shallow } from 'enzyme';
import * as React from 'react';
import { IEOCreate } from './index';

describe('Create IEO test', () => {
    it('should render', () => {
        const wrapper = shallow(<IEOCreate />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
