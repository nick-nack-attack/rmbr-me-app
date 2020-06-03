import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddNotePage from "./AddNotePage";

describe(`AddNotePage component`, () => {

    it('renders AddNotePage by default', () => {
        const wrapper = shallow(<AddNotePage/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})