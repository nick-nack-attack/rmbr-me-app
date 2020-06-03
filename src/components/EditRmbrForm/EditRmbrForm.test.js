import React from "react";
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import EditRmbrForm from "./EditRmbrForm";

describe(`EditRmbrForm component`, () => {
    const rmbr = {
        id: 100,
        rmbr_title: 'Jack',
        rmbr_text: 'Friend',
        user_id: 1,
        person_id: 1,
        category: 'Current'
    }

    it(`renders the complete form`, () => {
        const wrapper = shallow(<EditRmbrForm/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    });
    it(`renders the title and content fields`, () => {
        const select = shallow(
            <EditRmbrForm
                rmbr={rmbr}
                autofocus={true}
            />
        )
            .find('#rmbrText', '#rmbrTitle')
        expect(toJson(select)).toMatchSnapshot()
    })
})