
//tests by John

import { render, fireEvent, screen, getByRole, getByText, queryByText, getByDisplayValue } from "@testing-library/react";
import index from "./index";
import React from 'react';

describe('index', () => {

    //if save button is there
    it("should show save button", () => {
        render(<index />)
        expect(screen.queryByText(`Save`))

    })

    //if UserDetail input fields are there
    it("should show profile input fields", () => {
        render(<index />)
        expect(screen.queryByText(`Enter Runner's Name`))
        expect(screen.queryByText(`Enter a Bio`))
        expect(screen.queryByText(`Enter a Age`))
        expect(screen.queryByText(`Enter Runner's City`))
        expect(screen.queryByText('Select an Height'))
        expect(screen.queryByText('Select a Weight'))

    })

})
