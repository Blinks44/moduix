import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
} from '../src';

function ProviderCheckbox() {
  const checkbox = useCheckbox({ defaultChecked: true, name: 'provider-notifications' });

  return (
    <CheckboxRootProvider value={checkbox}>
      <CheckboxControl />
      <CheckboxHiddenInput />
      <CheckboxLabel>Provider notifications</CheckboxLabel>
    </CheckboxRootProvider>
  );
}

test('submits through explicit Ark inputs for roots', () => {
  const { container } = render(
    <form>
      <Checkbox defaultChecked name="notifications" value="email">
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Email notifications</CheckboxLabel>
      </Checkbox>
      <ProviderCheckbox />
      <CheckboxGroup defaultValue={['react']} name="frameworks">
        <Checkbox value="react">
          <CheckboxControl />
          <CheckboxHiddenInput />
          <CheckboxLabel>React</CheckboxLabel>
        </Checkbox>
        <Checkbox value="vue">
          <CheckboxControl />
          <CheckboxHiddenInput />
          <CheckboxLabel>Vue</CheckboxLabel>
        </Checkbox>
      </CheckboxGroup>
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(4);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
    ['frameworks', 'react'],
  ]);
  const root = screen.getByText('Email notifications').parentElement!;
  const control = root.querySelector('[data-slot="checkbox-control"]')!;
  const checkedIcon = root.querySelector('[data-slot="checkbox-indicator-checked-icon"]')!;
  const label = screen.getByText('Email notifications');

  expect([...root.classList]).toEqual(expect.arrayContaining(['inline-flex', 'gap-2']));
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'size-5', 'rounded-xs', 'bg-background']),
  );
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['data-[state=checked]:bg-primary']),
  );
  expect([...checkedIcon.classList]).toEqual(expect.arrayContaining(['inline-flex', 'size-3']));
  expect([...label.classList]).toEqual(expect.arrayContaining(['text-sm', 'font-medium']));
});

test('preserves Ark behavior and semantic asChild composition', async () => {
  render(
    <Checkbox asChild>
      <label>
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Accept terms</CheckboxLabel>
      </label>
    </Checkbox>,
  );

  const checkbox = page.getByRole('checkbox', { name: 'Accept terms', exact: true });
  await expect.element(checkbox).not.toBeChecked();
  await page.getByText('Accept terms', { exact: true }).click();
  await expect.element(checkbox).toBeChecked();
  await expect.element(checkbox).toHaveAttribute('type', 'checkbox');
  await checkbox.press('Space');
  await expect.element(checkbox).not.toBeChecked();
});

test('forwards refs and exposes stable slots on public parts', () => {
  const rootRef = createRef<HTMLLabelElement>();
  const controlRef = createRef<HTMLDivElement>();
  const indicatorRef = createRef<HTMLDivElement>();
  const labelRef = createRef<HTMLSpanElement>();
  const groupRef = createRef<HTMLDivElement>();

  render(
    <CheckboxGroup ref={groupRef} defaultValue={['email']}>
      <Checkbox ref={rootRef} value="email" size="lg">
        <CheckboxControl ref={controlRef}>
          <CheckboxIndicator ref={indicatorRef} />
        </CheckboxControl>
        <CheckboxHiddenInput />
        <CheckboxLabel ref={labelRef}>Email notifications</CheckboxLabel>
      </Checkbox>
    </CheckboxGroup>,
  );

  expect(rootRef.current!.getAttribute('data-slot')).toBe('checkbox-root');
  expect(rootRef.current!.getAttribute('data-size')).toBe('lg');
  expect(controlRef.current!.getAttribute('data-slot')).toBe('checkbox-control');
  expect(indicatorRef.current!.getAttribute('data-slot')).toBe('checkbox-indicator');
  expect(labelRef.current!.getAttribute('data-slot')).toBe('checkbox-label');
  expect(groupRef.current!.getAttribute('data-slot')).toBe('checkbox-group');
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
  render(
    <>
      <Checkbox disabled>
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Disabled option</CheckboxLabel>
      </Checkbox>
      <Checkbox readOnly>
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Read-only option</CheckboxLabel>
      </Checkbox>
      <Checkbox invalid required>
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Required option</CheckboxLabel>
      </Checkbox>
      <CheckboxGroup readOnly>
        <Checkbox value="group-option">
          <CheckboxControl />
          <CheckboxHiddenInput />
          <CheckboxLabel>Read-only group option</CheckboxLabel>
        </Checkbox>
      </CheckboxGroup>
    </>,
  );

  await page.getByText('Read-only option', { exact: true }).click();
  await page.getByText('Read-only group option', { exact: true }).click();

  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('checkbox', { name: 'Read-only option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Read-only group option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('keeps controlled indeterminate state transitions Ark-shaped', async () => {
  function ControlledCheckbox() {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');

    return (
      <Checkbox checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Select all</CheckboxLabel>
      </Checkbox>
    );
  }

  render(<ControlledCheckbox />);

  await expect
    .element(page.locator('[data-slot="checkbox-control"]'))
    .toHaveAttribute('data-state', 'indeterminate');
  await page.locator('[data-slot="checkbox-control"]').click();
  await expect
    .element(page.locator('[data-slot="checkbox-control"]'))
    .toHaveAttribute('data-state', 'checked');
  await expect
    .element(page.getByRole('checkbox', { name: 'Select all', exact: true }))
    .toBeChecked();
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <Checkbox className="gap-4 text-primary" data-testid="root">
      <CheckboxControl className="rounded-md bg-muted p-1" />
      <CheckboxLabel>Notifications</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>,
  );

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="checkbox-control"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect(['gap-2', 'text-foreground'].some((name) => root.classList.contains(name))).toBe(false);
  expect([...control.classList]).toEqual(expect.arrayContaining(['rounded-md', 'bg-muted', 'p-1']));
  expect(
    ['rounded-xs', 'bg-background', 'p-0'].some((name) => control.classList.contains(name)),
  ).toBe(false);
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect
    .element(page.locator('[data-slot="checkbox-control"]'))
    .toHaveCSS('padding-left', '4px');
});