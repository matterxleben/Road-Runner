import { render, fireEvent, screen, getByRole, getByText, queryByText, getByDisplayValue } from "@testing-library/react";
import index from "./index";
import React from 'react';
import renderer from 'react-test-renderer';
import { within } from '@testing-library/dom'

describe('index', () => {

    //if join button is there
    it("join button test", () => {
        render(<index />)
        expect(screen.queryByText(`Join`))

    })

    it("Cancel button", () => {
        render(<index />)
        expect(screen.queryByText(`Cancel`))

    })

    it("Title test", () => {
        render(<index />)
        expect(screen.queryByText(`Join Event:`))

    })

    it("Dropdown test", () => {
        render(<index />)
        expect(screen.queryByText(`Select an event`))

    })
});