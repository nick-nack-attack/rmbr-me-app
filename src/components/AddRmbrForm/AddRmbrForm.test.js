import React from "react";
import { shallow } from "enzyme";
import toJson from 'enzyme-to-json';
import AddRmbrForm from "./AddRmbrForm";

describe(`AddRmbrForm component`, () => {
    it(`renders the complete form`, () => {
        const wrapper = shallow(<AddRmbrForm/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});