import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Landing from "./LandingPage";

describe(`Landing page component`, () => {

    it('renders Landing page by default', () => {
        const wrapper = shallow(<Landing/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
    
})