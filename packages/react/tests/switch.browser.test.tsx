import { LocaleProvider } from '@ark-ui/react/locale';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
  useSwitch,
} from '../src';

function ProviderSwitch() {
  const switchApi = useSwitch({ defaultChecked: true, name: 'provider-notifications' });

  return (
    <SwitchRootProvider value={switchApi}>
      <SwitchControl />
      <SwitchHiddenInput />
      <SwitchLabel>Provider notifications</SwitchLabel>
    </SwitchRootProvider>
  );
}

function expectThumbGeometry(control: Element, edge: 'left' | 'right') {
  const track = control.getBoundingClientRect();
  const thumb = control.querySelector('[data-slot="switch-thumb"]')!.getBoundingClientRect();
  // 1px border plus the 2px spacing-0-5 inset on each side.
  const gap = edge === 'left' ? thumb.left - track.left : track.right - thumb.right;

  expect(thumb.width).toBeCloseTo(track.height - 6, 0);
  expect(thumb.height).toBeCloseTo(track.height - 6, 0);
  expect(Math.abs(gap - 3)).toBeLessThanOrEqual(1);
}

test('submits through explicit Ark inputs', () => {
  const { container } = render(
    <form>
      <Switch defaultChecked name="notifications" value="email">
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Email notifications</SwitchLabel>
      </Switch>
      <ProviderSwitch />
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(2);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', async () => {
  render(
    <Switch asChild>
      <label>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Enable reminders</SwitchLabel>
      </label>
    </Switch>,
  );

  const checkbox = page.getByRole('checkbox', { name: 'Enable reminders', exact: true });
  await expect.element(checkbox).not.toBeChecked();
  await page.getByText('Enable reminders', { exact: true }).click();
  await expect.element(checkbox).toBeChecked();
  await expect.element(checkbox).toHaveAttribute('type', 'checkbox');
  await checkbox.press('Space');
  await expect.element(checkbox).not.toBeChecked();
});

test('forwards refs and exposes stable slots on public parts', () => {
  const rootRef = createRef<HTMLLabelElement>();
  const controlRef = createRef<HTMLSpanElement>();
  const thumbRef = createRef<HTMLSpanElement>();
  const labelRef = createRef<HTMLSpanElement>();

  render(
    <Switch ref={rootRef} size="lg" data-size="sm">
      <SwitchControl ref={controlRef}>
        <SwitchThumb ref={thumbRef} />
      </SwitchControl>
      <SwitchHiddenInput />
      <SwitchLabel ref={labelRef}>Email notifications</SwitchLabel>
    </Switch>,
  );

  expect(rootRef.current!.getAttribute('data-slot')).toBe('switch-root');
  expect(rootRef.current!.getAttribute('data-size')).toBe('lg');
  expect(controlRef.current!.getAttribute('data-slot')).toBe('switch-control');
  expect(thumbRef.current!.getAttribute('data-slot')).toBe('switch-thumb');
  expect(labelRef.current!.getAttribute('data-slot')).toBe('switch-label');
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
  render(
    <>
      <Switch disabled>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Disabled option</SwitchLabel>
      </Switch>
      <Switch readOnly>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Read-only option</SwitchLabel>
      </Switch>
      <Switch invalid required>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Required option</SwitchLabel>
      </Switch>
    </>,
  );

  await page.getByText('Read-only option', { exact: true }).click();

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
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('keeps controlled state and invalid styling hooks Ark-shaped', async () => {
  function ControlledSwitch() {
    const [checked, setChecked] = useState(false);

    return (
      <Switch invalid checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Enable alerts</SwitchLabel>
      </Switch>
    );
  }

  render(<ControlledSwitch />);

  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-invalid');
  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-state', 'unchecked');
  await page.locator('[data-slot="switch-control"]').click();
  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-state', 'checked');
  await expect
    .element(page.getByRole('checkbox', { name: 'Enable alerts', exact: true }))
    .toBeChecked();
});

test('places a square thumb from the control box, including size overrides and RTL', () => {
  const { container } = render(
    <>
      <Switch size="sm">
        <SwitchControl />
        <SwitchHiddenInput />
      </Switch>
      <Switch defaultChecked>
        <SwitchControl style={{ width: '64px', height: '32px' }} />
        <SwitchHiddenInput />
      </Switch>
      <LocaleProvider locale="ar">
        <Switch defaultChecked size="lg">
          <SwitchControl />
          <SwitchHiddenInput />
        </Switch>
      </LocaleProvider>
    </>,
  );

  const [unchecked, overridden, rtl] = container.querySelectorAll('[data-slot="switch-control"]');

  expectThumbGeometry(unchecked!, 'left');
  expect(overridden!.getBoundingClientRect().width).toBe(64);
  expectThumbGeometry(overridden!, 'right');
  expectThumbGeometry(rtl!, 'left');
});

test('paints the focus ring of an invalid switch with the destructive color', async () => {
  render(
    <>
      <button type="button">Before</button>
      <Switch invalid>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Invalid option</SwitchLabel>
      </Switch>
    </>,
  );

  const before = page.getByRole('button', { name: 'Before', exact: true });
  await before.click();
  await before.press('Tab');

  const control = document.querySelector('[data-slot="switch-control"]')!;
  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-focus-visible');
  const style = getComputedStyle(control);
  expect(style.outlineStyle).toBe('solid');
  expect(style.outlineColor).toBe(style.borderTopColor);
});