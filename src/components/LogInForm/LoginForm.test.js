import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import LogInForm from "./LogInForm";

describe(`LogInForm component`, () => {

    it('renders LogInForm by default', () => {
        const wrapper = shallow(<LogInForm/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})