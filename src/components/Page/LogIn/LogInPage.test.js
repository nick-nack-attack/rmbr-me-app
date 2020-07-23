import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import LogInPage from "./LogInPage";

describe(`LogInPage component`, () => {

    it('renders LogInPage by default', () => {
        const wrapper = shallow(<LogInPage/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})