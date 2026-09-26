import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('preserves Ark behavior and semantic asChild composition', () => {
  render(
    <Switch asChild>
      <label>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Enable reminders</SwitchLabel>
      </label>
    </Switch>,
  );

  const switchInput = screen.getByRole('checkbox', { name: 'Enable reminders' });

  expect(switchInput).not.toBeChecked();
  fireEvent.click(switchInput);
  expect(switchInput).toBeChecked();
  expect(switchInput).toHaveAttribute('type', 'checkbox');
});

test('forwards refs and exposes stable slots on public parts', () => {
  const rootRef = createRef<HTMLLabelElement>();
  const controlRef = createRef<HTMLSpanElement>();
  const thumbRef = createRef<HTMLSpanElement>();
  const labelRef = createRef<HTMLSpanElement>();

  render(
    <Switch ref={rootRef} size="lg">
      <SwitchControl ref={controlRef}>
        <SwitchThumb ref={thumbRef} />
      </SwitchControl>
      <SwitchHiddenInput />
      <SwitchLabel ref={labelRef}>Email notifications</SwitchLabel>
    </Switch>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'switch-root');
  expect(rootRef.current).toHaveAttribute('data-size', 'lg');
  expect(controlRef.current).toHaveAttribute('data-slot', 'switch-control');
  expect(thumbRef.current).toHaveAttribute('data-slot', 'switch-thumb');
  expect(labelRef.current).toHaveAttribute('data-slot', 'switch-label');
});

test('keeps the moduix data-size attribute authoritative over consumer value', () => {
  render(
    <Switch size="lg" data-size="sm">
      <SwitchControl />
      <SwitchHiddenInput />
      <SwitchLabel>Authoritative size</SwitchLabel>
    </Switch>,
  );

  const root = screen.getByText('Authoritative size').closest('[data-slot="switch-root"]')!;

  expect(root).toHaveAttribute('data-size', 'lg');
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
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

  const disabled = screen.getByRole('checkbox', { name: 'Disabled option' });
  const readOnly = screen.getByRole('checkbox', { name: 'Read-only option' });
  const required = screen.getByRole('checkbox', { name: 'Required option' });

  fireEvent.click(disabled);
  fireEvent.click(readOnly);

  expect(disabled).not.toBeChecked();
  expect(disabled).toBeDisabled();
  expect(readOnly).not.toBeChecked();
  expect(required).toBeRequired();
  expect(required).toHaveAttribute('aria-invalid', 'true');
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

  const switchInput = screen.getByRole('checkbox', { name: 'Enable alerts' });
  const control = document.querySelector('[data-slot="switch-control"]')!;

  expect(control).toHaveAttribute('data-invalid');
  expect(control).toHaveAttribute('data-state', 'unchecked');
  fireEvent.click(control);
  await waitFor(() => expect(control).toHaveAttribute('data-state', 'checked'));
  expect(switchInput).toBeChecked();
});

test('applies native utilities to component-owned visual parts', () => {
  render(
    <Switch defaultChecked>
      <SwitchControl />
      <SwitchLabel>Notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>,
  );

  const root = screen.getByText('Notifications').parentElement!;
  const control = root.querySelector('[data-slot="switch-control"]')!;
  const thumb = root.querySelector('[data-slot="switch-thumb"]')!;
  const label = screen.getByText('Notifications');

  expect(root).toHaveClass('inline-flex', 'gap-2', 'w-fit');
  expect(control).toHaveClass('inline-flex', 'w-11', 'h-control-xs', 'rounded-full', 'bg-muted');
  expect(control).toHaveClass(
    'data-invalid:border-destructive',
    'data-[state=checked]:data-invalid:border-destructive',
    'data-[state=checked]:bg-primary',
  );
  expect(thumb).toHaveClass(
    'inline-flex',
    'size-5',
    'rounded-full',
    'bg-background',
    'shadow-sm',
    'transition-[translate,background-color,color]',
  );
  expect(label).toHaveClass('text-sm', 'font-medium');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Switch className="gap-4" data-testid="root">
      <SwitchControl className="w-10 rounded-md bg-background p-1">
        <SwitchThumb className="size-4 bg-muted-foreground" />
      </SwitchControl>
      <SwitchLabel className="text-lg">Notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>,
  );

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="switch-control"]')!;
  const thumb = root.querySelector('[data-slot="switch-thumb"]')!;
  const label = screen.getByText('Notifications');

  expect(root).toHaveClass('gap-4');
  expect(root).not.toHaveClass('gap-2');
  expect(control).toHaveClass('w-10', 'rounded-md', 'bg-background', 'p-1');
  expect(control).not.toHaveClass('w-11', 'rounded-full', 'bg-muted', 'p-0.5');
  expect(thumb).toHaveClass('size-4', 'bg-muted-foreground');
  expect(thumb).not.toHaveClass('size-5', 'bg-background');
  expect(label).toHaveClass('text-lg');
  expect(label).not.toHaveClass('text-sm');
});