import { render, screen } from '@testing-library/react';
import Todo from './Todo';

const mockHandler = jest.fn()

const testTodo = {
    text: "testing testing",
    done: false
}

test('accurate description is rendered', () => {
    render(<Todo todo={testTodo} onClickDelete={mockHandler} onClickComplete={mockHandler}/>)
    const notdone = screen.getByText(/This todo is not done/);
    expect(notdone).toBeInTheDocument()
});
