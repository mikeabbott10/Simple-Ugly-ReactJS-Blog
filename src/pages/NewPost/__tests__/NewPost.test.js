import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import NewPost from "../NewPost"

test('on initial render, the submit button in NewPost component is disabled. After filling both fields it gets enabled.', async () => {
    render(
        <BrowserRouter>
            <NewPost/>
        </BrowserRouter>
    )

    expect( await screen.findByRole('button')).toBeDisabled();

    await userEvent.type(screen.getByRole('textbox', {  name: /title/i}), "Title")

    expect( await screen.findByRole('button')).toBeDisabled();

    await userEvent.type(screen.getByRole('textbox', {  name: /body/i}), "Bodyy")

    expect( await screen.findByRole('button')).toBeEnabled();
})