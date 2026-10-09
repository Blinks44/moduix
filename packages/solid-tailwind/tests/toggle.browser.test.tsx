import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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

test('preserves the Ark button contract and styled icon slots', async () => {
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
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('type', 'button');
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('aria-pressed', 'true');
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('data-state', 'on');
  expect(toggle.dataset).toMatchObject({ slot: 'toggle-root', variant: 'default', size: 'md' });
  await expect.element(page.getByLabel('On icon')).toBeVisible();
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

  await expect
    .element(page.getByRole('button', { name: 'Disabled', exact: true }))
    .toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Disabled', exact: true }).click();
  await expect
    .element(page.getByRole('button', { name: 'Enabled' }))
    .toHaveAttribute('aria-pressed', 'true');
  await expect.element(page.getByText('Enabled')).toBeVisible();

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
  render(() => <button type="button">Before</button>);

  render(() => <Toggle>Notifications</Toggle>);

  await page.getByRole('button', { name: 'Before' }).press('Tab');
  const toggle = page.getByRole('button', { name: 'Notifications' });

  await expect.element(toggle).toBeFocused();

  await toggle.press('Space');
  await expect.element(toggle).toHaveAttribute('aria-pressed', 'true');

  await toggle.press('Enter');
  await expect.element(toggle).toHaveAttribute('aria-pressed', 'false');
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

  expect([...toggle!.classList]).toEqual(
    expect.arrayContaining([
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
      '[&>svg]:block',
      '[&>svg]:size-4',
      '[&>svg]:shrink-0',
    ]),
  );
  expect([...indicator!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'items-center',
      'justify-center',
      '[&>svg]:block',
      '[&>svg]:size-4',
    ]),
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Toggle class="border-primary bg-secondary p-0 text-xs" size="lg" variant="outline">
      Save changes
    </Toggle>
  ));

  const toggle = screen.getByRole('button', { name: 'Save changes' });

  expect([...toggle!.classList]).toEqual(
    expect.arrayContaining(['border-primary', 'bg-secondary', 'p-0', 'text-xs']),
  );
  for (const utility of ['border-border', 'bg-background', 'px-5', 'py-1.5', 'text-md']) {
    expect(toggle!.classList.contains(utility)).toBe(false);
  }
  expect(toggle.classList.contains('min-h-control-lg')).toBe(true);
  expect(getComputedStyle(toggle)).toMatchObject({
    minHeight: '40px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    fontSize: '12px',
  });
});