import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from './Navbar';
import Navs from './Navs/Navs';

configure({adapter: new Adapter()});

describe('<Navbar/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Navbar/>)
    })
    it('should render three <Navs/> if not authenticated', () => {
        expect(wrapper.find(Navs)).toHaveLength(3)
    })
    it('should render four <Navs/> if authenticated', () => {
        wrapper.setProps({auth: true});
        expect(wrapper.find(Navs)).toHaveLength(4)
    })
})