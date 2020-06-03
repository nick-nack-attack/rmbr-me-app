import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SignUpPage from "./SignUpPage";

describe(`SignUpPage component`, () => {

    it('renders SignUpPage by default', () => {
        const wrapper = shallow(<SignUpPage/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})