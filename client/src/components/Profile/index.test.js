
//tests by Abhinav

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

    //if Profile headers are there
    it("should render", () => {
        render(<index />)
        expect(screen.queryByText(`City`))
        expect(screen.queryByText(`Height`))
        expect(screen.queryByText(`Weight`))

    })

    it('renders correctly', () => {
        const tree = renderer
            .create(<index page="http://www.facebook.com">Facebook</index>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    //if Run Log is there
    it("should render", () => {
        render(<index />)
        expect(screen.queryByText(`Runner's Logkhjgkhjgjkhghj`))

    })

    //if Profile input fields are there
    it("should render", () => {
        render(<index />)
        expect(screen.queryByText(`Enter Runner's Name`))
        expect(screen.queryByText(`Enter a Bio`))
        expect(screen.queryByText(`Enter Runner's City`))
        expect(screen.queryByText('Select an Height'))
        expect(screen.queryByText('Select a Weight'))

    })


    /*
    it("should click button", () => {
        render(<index />)
        //const save = screen.queryByText(`Save`)
        //fireEvent.click(save);

        fireEvent.click(screen.queryByText(`Save`));
        expect(screen.getByText('Please enter an Profile Weight!')).toBeInTheDocument();
    })
    
    */




})
