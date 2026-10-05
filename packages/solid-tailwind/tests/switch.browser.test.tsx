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
    expect.arrayContaining([
      'inline-flex',
      'w-11',
      'h-[var(--switch-height)]',
      'rounded-full',
      'bg-muted',
    ]),
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
      'size-[var(--switch-thumb-size)]',
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
      <SwitchControl class="w-10 rounded-md bg-background p-1">
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
    expect.arrayContaining(['w-10', 'rounded-md', 'bg-background', 'p-1']),
  );
  expect(
    ['w-11', 'rounded-full', 'bg-muted', 'p-0.5'].some((name) => control.classList.contains(name)),
  ).toBe(false);
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['size-4', 'bg-muted-foreground']));
  expect(
    ['size-[var(--switch-thumb-size)]', 'bg-background'].some((name) =>
      thumb.classList.contains(name),
    ),
  ).toBe(false);
  expect([...label.classList]).toEqual(expect.arrayContaining(['text-lg']));
  expect(label.classList.contains('text-sm')).toBe(false);
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveCSS('padding-left', '4px');
  await expect.element(page.locator('[data-slot="switch-control"]')).toHaveCSS('width', '40px');
  await expect.element(page.locator('[data-slot="switch-thumb"]')).toHaveCSS('width', '16px');
});