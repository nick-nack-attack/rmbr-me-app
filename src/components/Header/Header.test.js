import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Header from "./Header";

describe(`Header component`, () => {

    it('renders Header by default', () => {
        const wrapper = shallow(<Header/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders the login / logout buttons', () => {
        const wrapper = shallow(<Header/>)
            .find('#log-in-link', '#sign-up-link')
                expect(toJson(wrapper)).toMatchSnapshot()
    })
})