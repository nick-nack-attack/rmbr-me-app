import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PersonListItem from "./PersonListItem";

describe(`PersonListItem component`, () => {

    it('renders PersonListItem by default', () => {
        const wrapper = shallow(<PersonListItem/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})