import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Toggle, ToggleIndicator, useToggleContext } from '../src';

function ToggleStateLabel() {
  const toggle = useToggleContext();

  return <span>{toggle.pressed ? 'Enabled' : 'Disabled'}</span>;
}

test('preserves the Ark button contract and styled icon slots', async () => {
  const ref = createRef<HTMLButtonElement>();

  render(
    <Toggle ref={ref} defaultPressed data-testid="toggle">
      <svg aria-hidden="true" />
      Favorite
      <ToggleIndicator fallback={<svg aria-label="Off icon" />}>
        <svg aria-label="On icon" />
      </ToggleIndicator>
    </Toggle>,
  );

  const toggle = screen.getByTestId('toggle');

  expect(ref.current).toBe(toggle);
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('type', 'button');
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('aria-pressed', 'true');
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('data-state', 'on');
  expect(toggle.dataset).toMatchObject({ slot: 'toggle-root', variant: 'default', size: 'md' });
  await expect.element(page.getByLabel('On icon')).toBeVisible();
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

  await expect
    .element(page.getByRole('button', { name: 'Disabled', exact: true }))
    .toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Disabled', exact: true }).click();
  await expect
    .element(page.getByRole('button', { name: 'Enabled' }))
    .toHaveAttribute('aria-pressed', 'true');
  await expect.element(page.getByText('Enabled')).toBeVisible();

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

  await expect.element(page.getByRole('button', { name: 'Disabled toggle' })).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: 'Disabled toggle' }))
    .toHaveAttribute('data-disabled');
  expect(disabledToggle.getAttribute('aria-pressed')).toBe('false');
  await expect
    .element(page.getByRole('button', { name: 'Custom toggle' }))
    .toHaveAttribute('aria-pressed', 'true');
  expect(customToggle.getAttribute('data-slot')).toBe('toggle-root');
});

test('supports native button keyboard activation', async () => {
  render(<button type="button">Before</button>);

  render(<Toggle>Notifications</Toggle>);

  await page.getByRole('button', { name: 'Before' }).press('Tab');
  const toggle = page.getByRole('button', { name: 'Notifications' });

  await expect.element(toggle).toBeFocused();

  await toggle.press('Space');
  await expect.element(toggle).toHaveAttribute('aria-pressed', 'true');

  await toggle.press('Enter');
  await expect.element(toggle).toHaveAttribute('aria-pressed', 'false');
});