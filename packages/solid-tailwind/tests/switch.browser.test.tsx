import { LocaleProvider } from '@ark-ui/solid/locale';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
  const { container } = render(() => (
    <form>
      <Switch defaultChecked name="notifications" value="email">
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Email notifications</SwitchLabel>
      </Switch>
      <ProviderSwitch />
    </form>
  ));

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(2);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
  ]);
  const root = screen.getByText('Email notifications').parentElement!;
  const control = root.querySelector('[data-slot="switch-control"]')!;
  const thumb = root.querySelector('[data-slot="switch-thumb"]')!;
  const label = screen.getByText('Email notifications');

  expect([...root.classList]).toEqual(expect.arrayContaining(['inline-flex', 'gap-2', 'w-fit']));
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'w-11', 'h-control-xs', 'rounded-full', 'bg-muted']),
  );
  expect([...control.classList]).toEqual(
    expect.arrayContaining([
      'data-invalid:border-destructive',
      'data-[state=checked]:data-invalid:border-destructive',
      'data-[state=checked]:bg-primary',
    ]),
  );
  expect([...thumb.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'h-[calc(100%-var(--moduix-spacing-0-5)*2)]',
      'rounded-full',
      'bg-background',
      'shadow-sm',
      'transition-[inset-inline-start,translate,background-color,color]',
    ]),
  );
  expect([...label.classList]).toEqual(expect.arrayContaining(['text-sm', 'font-medium']));
});

test('preserves Ark behavior and semantic asChild composition', async () => {
  let rootRef: HTMLLabelElement | undefined;
  render(() => (
    <Switch ref={(element) => (rootRef = element)} asChild={(props) => <label {...props()} />}>
      <SwitchControl />
      <SwitchHiddenInput />
      <SwitchLabel>Enable reminders</SwitchLabel>
    </Switch>
  ));

  const checkbox = page.getByRole('checkbox', { name: 'Enable reminders', exact: true });
  await expect.element(checkbox).not.toBeChecked();
  await page.getByText('Enable reminders', { exact: true }).click();
  await expect.element(checkbox).toBeChecked();
  await expect.element(checkbox).toHaveAttribute('type', 'checkbox');
  await checkbox.press('Space');
  await expect.element(checkbox).not.toBeChecked();
  expect(rootRef).toBeUndefined();
});

test('forwards refs and exposes stable slots on public parts', () => {
  let rootRef!: HTMLLabelElement;
  let controlRef!: HTMLSpanElement;
  let thumbRef!: HTMLSpanElement;
  let labelRef!: HTMLSpanElement;

  render(() => (
    <Switch ref={(element) => (rootRef = element)} size="lg" data-size="sm">
      <SwitchControl ref={(element) => (controlRef = element)}>
        <SwitchThumb ref={(element) => (thumbRef = element)} />
      </SwitchControl>
      <SwitchHiddenInput />
      <SwitchLabel ref={(element) => (labelRef = element)}>Email notifications</SwitchLabel>
    </Switch>
  ));

  expect(rootRef.getAttribute('data-slot')).toBe('switch-root');
  expect(rootRef.getAttribute('data-size')).toBe('lg');
  expect(controlRef.getAttribute('data-slot')).toBe('switch-control');
  expect(thumbRef.getAttribute('data-slot')).toBe('switch-thumb');
  expect(labelRef.getAttribute('data-slot')).toBe('switch-label');
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
  render(() => (
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
    </>
  ));

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
    const [checked, setChecked] = createSignal(false);

    return (
      <Switch
        invalid
        checked={checked()}
        onCheckedChange={(details) => setChecked(details.checked)}
      >
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Enable alerts</SwitchLabel>
      </Switch>
    );
  }

  render(() => <ControlledSwitch />);

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

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <Switch class="gap-4" data-testid="root">
      <SwitchControl class="w-10 rounded-md bg-background">
        <SwitchThumb class="size-4 bg-muted-foreground" />
      </SwitchControl>
      <SwitchLabel class="text-lg">Notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  ));

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="switch-control"]')!;
  const thumb = root.querySelector('[data-slot="switch-thumb"]')!;
  const label = screen.getByText('Notifications');

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect(root.classList.contains('gap-2')).toBe(false);
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['w-10', 'rounded-md', 'bg-background']),
  );
  expect(
    ['w-11', 'rounded-full', 'bg-muted'].some((name) => control.classList.contains(name)),
  ).toBe(false);
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['size-4', 'bg-muted-foreground']));
  expect(
    ['h-[calc(100%-var(--moduix-spacing-0-5)*2)]', 'bg-background'].some((name) =>
      thumb.classList.contains(name),
    ),
  ).toBe(false);
  expect([...label.classList]).toEqual(expect.arrayContaining(['text-lg']));
  expect(label.classList.contains('text-sm')).toBe(false);
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="switch-control"]')).toHaveCSS('width', '40px');
  await expect.element(page.locator('[data-slot="switch-thumb"]')).toHaveCSS('width', '16px');
});

test('places a square thumb from the control box, including size overrides and RTL', () => {
  const { container } = render(() => (
    <>
      <Switch size="sm">
        <SwitchControl />
        <SwitchHiddenInput />
      </Switch>
      <Switch defaultChecked>
        <SwitchControl class="h-[32px] w-[64px]" />
        <SwitchHiddenInput />
      </Switch>
      <LocaleProvider locale="ar">
        <Switch defaultChecked size="lg">
          <SwitchControl />
          <SwitchHiddenInput />
        </Switch>
      </LocaleProvider>
    </>
  ));

  const [unchecked, overridden, rtl] = container.querySelectorAll('[data-slot="switch-control"]');

  expectThumbGeometry(unchecked!, 'left');
  expect(overridden!.getBoundingClientRect().width).toBe(64);
  expectThumbGeometry(overridden!, 'right');
  expectThumbGeometry(rtl!, 'left');
});

test('paints the focus ring of an invalid switch with the destructive color', async () => {
  render(() => (
    <>
      <button type="button">Before</button>
      <Switch invalid>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Invalid option</SwitchLabel>
      </Switch>
    </>
  ));

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