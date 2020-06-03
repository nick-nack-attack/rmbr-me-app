import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddPersonPage from "./AddPersonPage";

describe(`AddPersonPage component`, () => {

    it('renders AddPersonPage by default', () => {
        const wrapper = shallow(<AddPersonPage/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})