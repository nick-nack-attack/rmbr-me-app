import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import RmbrListItem from "./RmbrListItem";

describe(`RmbrListItem component`, () => {

    it('renders RmbrListItem by default', () => {
        const wrapper = shallow(<RmbrListItem/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})