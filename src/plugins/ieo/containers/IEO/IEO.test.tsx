import { shallow } from 'enzyme';
import * as React from 'react';
import { IEO } from './index';

describe('IEO test', () => {
    it('should render', () => {
        const wrapper = shallow(<IEO />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
