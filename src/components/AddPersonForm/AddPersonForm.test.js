import React from "react";
import { shallow } from "enzyme";
import toJson from 'enzyme-to-json';
import AddPersonForm from "./AddPersonForm";

describe(`AddPersonForm component`, () => {
    it(`renders the complete form`, () => {
        const wrapper = shallow(<AddPersonForm/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});