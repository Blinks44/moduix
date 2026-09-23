import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { createSignal } from 'solid-js';
import { Toggle, ToggleIndicator, useToggleContext } from '../src';
import * as toggleEntry from '../src/components/toggle';
import * as toggleSource from '../src/components/toggle/Toggle';

test('keeps toggleVariants out of package and registry source entry points', () => {
  expect('toggleVariants' in toggleEntry).toBe(false);
  expect('toggleVariants' in toggleSource).toBe(false);
});

function ToggleStateLabel() {
  const toggle = useToggleContext();

  return <span>{toggle().pressed ? 'Enabled' : 'Disabled'}</span>;
}

test('preserves the Ark button contract and styled icon slots', () => {
  let ref!: HTMLButtonElement;

  render(() => (
    <Toggle ref={(element) => (ref = element)} defaultPressed data-testid="toggle">
      <svg aria-hidden="true" />
      Favorite
      <ToggleIndicator fallback={<svg aria-label="Off icon" />}>
        <svg aria-label="On icon" />
      </ToggleIndicator>
    </Toggle>
  ));

  const toggle = screen.getByTestId('toggle');

  expect(ref).toBe(toggle);
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
  const [pressed, setPressed] = createSignal(false);

  render(() => (
    <>
      <Toggle pressed={pressed()} onPressedChange={setPressed}>
        <ToggleStateLabel />
      </Toggle>
      <Toggle disabled onPressedChange={() => undefined}>
        Disabled toggle
      </Toggle>
      <Toggle
        asChild={(props) => (
          <button {...props()} type="button">
            Custom toggle
          </button>
        )}
        defaultPressed
      />
    </>
  ));

  const controlledToggle = screen.getByRole('button', { name: 'Disabled' });

  expect(controlledToggle).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(controlledToggle);
  await waitFor(() => expect(controlledToggle).toHaveAttribute('aria-pressed', 'true'));
  expect(screen.getByText('Enabled')).toBeVisible();

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

  render(() => <Toggle>Notifications</Toggle>);

  const toggle = screen.getByRole('button', { name: 'Notifications' });

  await user.tab();
  expect(toggle).toHaveFocus();

  await user.keyboard(' ');
  expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await user.keyboard('{Enter}');
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
});

test('applies native utilities to component-owned visual parts', () => {
  render(() => (
    <Toggle variant="outline">
      <svg aria-hidden="true" />
      <ToggleIndicator>
        <svg aria-hidden="true" />
      </ToggleIndicator>
    </Toggle>
  ));

  const toggle = screen.getByRole('button');
  const indicator = document.querySelector('[data-slot="toggle-indicator"]')!;

  expect(toggle).toHaveClass(
    'box-border',
    'inline-flex',
    'min-h-control-md',
    'gap-2',
    'rounded-md',
    'border',
    'bg-background',
    'px-4',
    'py-1',
    'text-sm',
  );
  expect(toggle).toHaveClass('[&>svg]:block', '[&>svg]:size-4', '[&>svg]:shrink-0');
  expect(indicator).toHaveClass(
    'inline-flex',
    'items-center',
    'justify-center',
    '[&>svg]:block',
    '[&>svg]:size-4',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Toggle class="border-primary bg-secondary p-0 text-xs" size="lg" variant="outline">
      Save changes
    </Toggle>
  ));

  const toggle = screen.getByRole('button', { name: 'Save changes' });

  expect(toggle).toHaveClass('border-primary', 'bg-secondary', 'p-0', 'text-xs');
  expect(toggle).not.toHaveClass(
    'border-border',
    'bg-background',
    'min-h-control-lg',
    'px-5',
    'py-1.5',
    'text-md',
  );
});