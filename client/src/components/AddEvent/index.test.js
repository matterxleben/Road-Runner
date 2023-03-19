import { render, fireEvent, screen, getByRole, getByText, queryByText, getByDisplayValue } from "@testing-library/react";
import index from "./index";
import React from 'react';
import renderer from 'react-test-renderer';
import { within } from '@testing-library/dom'

describe('index', () => {

    it("Save button test", () => {
        render(<index />)
        expect(screen.queryByText(`Save`))

    })

    it("Cancel button", () => {
        render(<index />)
        expect(screen.queryByText(`Cancel`))

    })

    it("Title test", () => {
        render(<index />)
        expect(screen.queryByText(`Create Event:`))

    })

    it("Name test", () => {
        render(<index />)
        expect(screen.queryByText(`Enter Event Name`))

    })

    it("Date test", () => {
        render(<index />)
        expect(screen.queryByText(`yyyy-mm-dd`))

    })

    it("Location test", () => {
        render(<index />)
        expect(screen.queryByText(`Enter Event Location`))

    })

});