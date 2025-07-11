import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders Task Manager title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Task Manager/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/Test Task/i);
    expect(taskElement).toBeInTheDocument();
  });

  test('toggles task completion', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    const taskCheckbox = screen.getByRole('checkbox');
    fireEvent.click(taskCheckbox);

    expect(taskCheckbox.checked).toBe(true);
  });

  test('deletes a task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    const taskElement = screen.queryByText(/Test Task/i);
    expect(taskElement).toBeNull();
  });

  test('filters completed tasks', async () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    const taskCheckbox = screen.getByRole('checkbox');
    fireEvent.click(taskCheckbox);

    const completedButton = screen.getByText(/Completed/i);
    fireEvent.click(completedButton);

    const taskElement = await screen.findByText(/Test Task/i);
    expect(taskElement).toBeInTheDocument();
  });

  test('adds a task with high priority', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButton = screen.getByText(/Add Task/i);
    const prioritySelect = screen.getByRole('combobox');

    fireEvent.change(inputElement, { target: { value: 'High Priority Task' } });
    fireEvent.change(prioritySelect, { target: { value: 'High' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/High Priority Task/i);
    expect(taskElement).toBeInTheDocument();
  });
});