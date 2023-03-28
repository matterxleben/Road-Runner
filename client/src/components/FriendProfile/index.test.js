
//tests by John

import { render, fireEvent, screen, getByRole, getByText, queryByText, getByDisplayValue } from "@testing-library/react";
import index from "./index";
import React from 'react';

describe('index', () => {


    //if Profile headers are there
    it("should show profile headers", () => {
        render(<index />)
        expect(screen.queryByText(`City`))
        expect(screen.queryByText(`Height`))
        expect(screen.queryByText(`Weight`))

    })


    //if Run Log is there
    it("should show run log", () => {
        render(<index />)
        expect(screen.queryByText(`Runner's Log`))

    })


})
