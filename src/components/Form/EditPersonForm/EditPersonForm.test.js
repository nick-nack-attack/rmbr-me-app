import React from "react";
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import EditPersonForm from "./EditPersonForm";

describe(`EditPersonForm component`, () => {
    const stubPerson = {
        id: 100,
        person_name: 'Jack',
        type_of_person: 'Friend',
        user_id: 1
    }

    it(`renders the complete form`, () => {
        const wrapper = shallow(<EditPersonForm/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    });
    it(`renders the radio buttons`, () => {
        const select = shallow(
            <EditPersonForm
                person_id={stubPerson.id}
                person_name={stubPerson.person_name}
                type_of_person={stubPerson.type_of_person}
            />
        )
            .find('#Friend', '#Family', 'Co-Worker')
        expect(toJson(select)).toMatchSnapshot()
    })
})