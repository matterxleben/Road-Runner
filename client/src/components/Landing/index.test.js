import { render, fireEvent, screen, getByRole, getByText, queryByText, getByDisplayValue } from "@testing-library/react";
import index from "./index";
import React from 'react';
import renderer from 'react-test-renderer';
import { within } from '@testing-library/dom'

describe('index', () => {

    //if join button is there
    it("Display Leaderboard & Run Log button test", () => {
        render(<index />)
        expect(screen.queryByText(`Display Leaderboard & Run Log`))

    })

    it("Leaderboard", () => {
        render(<index />)
        expect(screen.queryByText(`Leaderboard:`))

    })

    it("Run Log", () => {
      render(<index />)
      expect(screen.queryByText(`Run Log:`))

    })    

    it("Title test", () => {
        render(<index />)
        expect(screen.queryByText(`Welcome to RoadRunner! Your home for all things running!`))

    })

    it("Dropdown event selection test", () => {
        render(<index />)
        expect(screen.queryByText(`Select an event`))

    })
});