
//tests by Abhinav

import { render, fireEvent, screen, getByRole, getByText, queryByText, getByDisplayValue } from "@testing-library/react";
import index from "./index";
import React from 'react';
import renderer from 'react-test-renderer';
import { within } from '@testing-library/dom'

describe('index', () => {

    //if sign up button is there
    it("should show sign up button", () => {
        render(<index />)
        expect(screen.queryByText(`SIGN UP`))

    })

    //if clear button is there
    it("should show clear button", () => {
        render(<index />)
        expect(screen.queryByText(`clear`))

    })

    //if clear button is there
    it("should show sign in button", () => {
        render(<index />)
        expect(screen.queryByText(`sign in`))

    })

    //if Sign-In:
    it("should show Sign-In", () => {
        render(<index />)
        expect(screen.queryByText(`Sign-In:`))

    })

    //if Sign-In inputs are shown
    it("should show profile input fields", () => {
        render(<index />)
        expect(screen.queryByText(`Enter your Email`))
        expect(screen.queryByText(`Enter your Password`))
        expect(screen.queryByText(`Confirm your Password`))

    })
})
