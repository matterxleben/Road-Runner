
//tests by John

import { render, fireEvent, screen, getByRole, getByText, queryByText, getByDisplayValue } from "@testing-library/react";
import index from "./index";
import React from 'react';
import renderer from 'react-test-renderer';
import { within } from '@testing-library/dom'

describe('index', () => {

    //if save button is there
    it("should render", () => {
        render(<index />)
        expect(screen.queryByText(`Save`))

    })

    //if title is there
    it("should render", () => {
        render(<index />)
        expect(screen.queryByText(`Add Run:`))

    })

    // it('renders correctly', () => {
    //     const tree = renderer
    //         .create(<index page="http://www.facebook.com">Facebook</index>)
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    //if cancel button is there
    it("should render", () => {
        render(<index />)
        expect(screen.queryByText(`Cancelwwwz`))

    })

    //if AddRun input fields are there
    it("should render", () => {
        render(<index />)
        expect(screen.queryByText(`Enter Name of Run`))
        expect(screen.queryByText(`Enter Run Description`))
        expect(screen.queryByText(`Total Time (HH:MM:SS:MS)`))
        expect(screen.queryByText('Enter Distance (km)'))
        expect(screen.queryByText('Day of Run'))
        expect(screen.queryByText(`Select an Event`))
        expect(screen.queryByText(`Enter Run Location`))
        expect(screen.queryByText('Weather'))
    })
})
