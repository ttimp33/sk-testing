import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import Counter from './Counter.svelte';

test('Counter renders with correct initial count', () => {
  // 1. Arrange: Render the component with an initial prop value
  render(Counter, { initialCount: 42 });

  // 2. Assert: Check for the button with the expected text
  const button = screen.getByRole('button', { name: /Count is 42/i });
  expect(button).toBe;
});

test('Counter increments count when button is clicked', async () => {
  // 1. Arrange: Render the component
  render(Counter, { initialCount: 0 });
  
  const button = screen.getByRole('button', { name: /Count is 0/i });
  expect(button).toBeInTheDocument();

  // 2. Act: Click the button
  await fireEvent.click(button);

  // 3. Assert: Check the new state
  expect(button.textContent).toBe('Count is 1');

  // 4. Act: Click again
  await fireEvent.click(button);

  // 5. Assert: Check the final state
  expect(button.textContent).toBe('Count is 2');
});

// --- Styling Test (Component/CSS Presence) --- 
test('Counter applies "active" class when count is greater than zero', async () => {
    // Test Case 1: Initial state (count > 0)
    render(Counter, { initialCount: 5});
    const buttonActive = screen.getByRole('button', { name: /Count is 5/i });

    // Assert: Class is present immediately
    expect(buttonActive).toHaveClass('counter-button');
    expect(buttonActive).toHaveClass('active');

    // Test Case 2: Initial state (count = 0) and then activation
    render(Counter, { initialCount: 0 });
    const buttonInactive = screen.getByRole('button', { name: /Count is 0/i });

    // Assert: Class is NOT present
    expect(buttonInactive).not.toHaveClass('active');

    // Act: Click to increment
    await fireEvent.click(buttonInactive);

    // Assert: Class IS now present
    expect(buttonInactive).toHaveClass('active');
});