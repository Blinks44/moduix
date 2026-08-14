import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { Toggle, useToggleContext } from '../src';

function ToggleStateLabel() {
  const toggle = useToggleContext();

  return <span>{toggle.pressed ? 'Enabled' : 'Disabled'}</span>;
}

test('preserves the Ark button contract and styled icon slots', () => {
  const ref = createRef<HTMLButtonElement>();

  render(
    <Toggle ref={ref} defaultPressed data-testid="toggle">
      <svg aria-hidden="true" />
      Favorite
      <Toggle.Indicator fallback={<svg aria-label="Off icon" />}>
        <svg aria-label="On icon" />
      </Toggle.Indicator>
    </Toggle>,
  );

  const toggle = screen.getByTestId('toggle');

  expect(ref.current).toBe(toggle);
  expect(toggle).toHaveAttribute('type', 'button');
  expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(toggle).toHaveAttribute('data-state', 'on');
  expect(toggle).toHaveAttribute('data-slot', 'toggle-root');
  expect(toggle).toHaveAttribute('data-variant', 'default');
  expect(toggle).toHaveAttribute('data-size', 'md');
  expect(screen.getByLabelText('On icon')).toBeVisible();
  expect(screen.queryByLabelText('Off icon')).toBeNull();
});

test('keeps controlled state, context, disabled, and asChild behavior Ark-shaped', async () => {
  function ControlledToggle() {
    const [pressed, setPressed] = useState(false);

    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <ToggleStateLabel />
      </Toggle>
    );
  }

  const { rerender } = render(<ControlledToggle />);
  const controlledToggle = screen.getByRole('button', { name: 'Disabled' });

  expect(controlledToggle).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(controlledToggle);
  await waitFor(() => expect(controlledToggle).toHaveAttribute('aria-pressed', 'true'));
  expect(screen.getByText('Enabled')).toBeVisible();

  rerender(
    <>
      <Toggle disabled onPressedChange={() => undefined}>
        Disabled toggle
      </Toggle>
      <Toggle asChild defaultPressed>
        <button type="button">Custom toggle</button>
      </Toggle>
    </>,
  );

  const disabledToggle = screen.getByRole('button', { name: 'Disabled toggle' });
  const customToggle = screen.getByRole('button', { name: 'Custom toggle' });

  expect(disabledToggle).toBeDisabled();
  expect(disabledToggle).toHaveAttribute('data-disabled');
  expect(fireEvent.click(disabledToggle)).toBe(false);
  expect(customToggle).toHaveAttribute('aria-pressed', 'true');
  expect(customToggle).toHaveAttribute('data-slot', 'toggle-root');
});

test('supports native button keyboard activation', async () => {
  const user = userEvent.setup();

  render(<Toggle>Notifications</Toggle>);

  const toggle = screen.getByRole('button', { name: 'Notifications' });

  await user.tab();
  expect(toggle).toHaveFocus();

  await user.keyboard(' ');
  expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await user.keyboard('{Enter}');
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
});