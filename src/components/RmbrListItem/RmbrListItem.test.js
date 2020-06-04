import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import RmbrListItem from "./RmbrListItem";

describe(`RmbrListItem component`, () => {

    const stubRmbr = {
        date_created: new Date()
    }

    it('renders RmbrListItem by default', () => {
        const wrapper = shallow(<RmbrListItem rmbr={stubRmbr}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})