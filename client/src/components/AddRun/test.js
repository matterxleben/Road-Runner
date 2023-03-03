import React from 'react';
import { render, screen } from "@testing-library/react";
import AddRun from './index.js';

describe ('AddRun', () => {
    function renderComponent() {
        render(<AddRun/>)
    }
    it ("checking words", () => {
        renderComponent();
        expect(screen.getByText('Save'))
    })
    it ("checking title", () => {
        renderComponent();
        expect(screen.getByText('Add Run:'))
    })
    it("should render", () => {
        render(<index />)
        expect(screen.queryByText(`Save`))
    })
})