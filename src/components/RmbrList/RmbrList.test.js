import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import RmbrList from "./RmbrList";

describe(`RmbrList component`, () => {

    it('renders RmbrList by default', () => {
        const wrapper = shallow(<RmbrList/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})