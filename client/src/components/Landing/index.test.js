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

    it('should sort leaderboard by distance when distance column is clicked', () => {
        render(<index />)
        
        // mock function to sort
        const handleSort = jest.fn();

        // Check if the mock function was called
        expect(handleSort('total_distance'))

        // check if sorts by column
        expect(screen.queryByText(`total_distance`))
    })

    it('should sort leaderboard by pace when pace column is clicked', () => {
        render(<index />)
        
        // mock function to sort
        const handleSort = jest.fn();

        // Check if the mock function was called
        expect(handleSort('pace'))

        // check if sorts by column
        expect(screen.queryByText(`pace`))
    })

    it('should sort leaderboard by name when name column is clicked', () => {
        render(<index />)
        
        // mock function to sort
        const handleSort = jest.fn();

        // Check if the mock function was called
        expect(handleSort('name'))

        // check if sorts by column
        expect(screen.queryByText(`name`))
    })


});