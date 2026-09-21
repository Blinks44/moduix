import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { Button } from '../src';

test('renders a native button with safe defaults, stable hooks, and a forwarded ref', () => {
  let ref!: HTMLButtonElement;

  render(() => (
    <Button ref={(element) => (ref = element)} data-testid="button">
      Save changes
    </Button>
  ));

  const button = screen.getByTestId('button');

  expect(ref).toBe(button);
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('data-scope', 'button');
  expect(button).toHaveAttribute('data-part', 'root');
  expect(button).toHaveAttribute('data-slot', 'button-root');
  expect(button).toHaveAttribute('data-variant', 'default');
  expect(button).toHaveAttribute('data-size', 'md');
});

test('preserves semantic anchors with native Ark Solid asChild composition', () => {
  render(() => (
    <Button
      variant="outline"
      asChild={(props) => (
        <a {...props()} href="#docs">
          Read the docs
        </a>
      )}
    />
  ));

  const link = screen.getByRole('link', { name: 'Read the docs' });

  expect(link).toHaveAttribute('href', '#docs');
  expect(link).not.toHaveAttribute('type');
  expect(link).toHaveAttribute('data-slot', 'button-root');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let ref: HTMLButtonElement | undefined;

  render(() => (
    <Button
      ref={(element) => (ref = element)}
      asChild={(props) => (
        <a {...props()} href="#docs">
          Read the docs
        </a>
      )}
    />
  ));

  expect(ref).toBeUndefined();
});

test('preserves root event handlers while enabled', () => {
  const calls: string[] = [];

  render(() => (
    <Button
      onClickCapture={() => calls.push('button capture')}
      onClick={() => calls.push('button click')}
      asChild={(props) => (
        <a {...props({ onClick: () => calls.push('link click') })} href="#docs">
          Read the docs
        </a>
      )}
    />
  ));

  fireEvent.click(screen.getByRole('link', { name: 'Read the docs' }));

  expect(calls).toEqual(['button capture', 'link click', 'button click']);
});

test('supports Solid bound click handlers', () => {
  const calls: string[] = [];

  render(() => (
    <Button onClick={[(value: string) => calls.push(value), 'saved']}>Save changes</Button>
  ));

  fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

  expect(calls).toEqual(['saved']);
});

test('disables custom hosts accessibly and prevents activation', () => {
  let activationCount = 0;

  render(() => (
    <Button
      disabled
      asChild={(props) => (
        <a {...props()} href="#docs">
          Read the docs
        </a>
      )}
      onClick={() => activationCount++}
    />
  ));

  const link = screen.getByRole('link', { name: 'Read the docs' });

  expect(link).toHaveAttribute('aria-disabled', 'true');
  expect(link).toHaveAttribute('data-disabled');
  expect(fireEvent.click(link)).toBe(false);
  expect(activationCount).toBe(0);
});

test('wires the loading state without taking over its content', () => {
  render(() => <Button loading>Saving</Button>);

  const button = screen.getByRole('button', { name: 'Saving' });

  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('aria-busy', 'true');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  expect(button).toHaveAttribute('data-disabled');
  expect(button).toHaveAttribute('data-loading');
});

test('applies explicit recipe values to the root', () => {
  render(() => (
    <Button aria-label="Delete item" size="icon-lg" variant="destructive-outline">
      ×
    </Button>
  ));

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button).toHaveAttribute('data-size', 'icon-lg');
  expect(button).toHaveAttribute('data-variant', 'destructive-outline');
});

test('exposes root utilities without overriding an explicit icon size', () => {
  render(() => (
    <Button>
      <svg class="size-6" data-testid="icon" />
      Save changes
    </Button>
  ));

  const button = screen.getByRole('button', { name: 'Save changes' });

  expect(button).toHaveClass('inline-flex', 'items-center', 'gap-2', 'rounded-md');
  expect(button).toHaveClass("[&>svg:not([class*='size-'])]:size-4", '[&>svg]:shrink-0');
  expect(screen.getByTestId('icon')).toHaveClass('size-6');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Button class="bg-secondary p-0 text-xs" size="lg">
      Save changes
    </Button>
  ));

  const button = screen.getByRole('button', { name: 'Save changes' });

  expect(button).toHaveClass('bg-secondary', 'p-0', 'text-xs');
  expect(button).not.toHaveClass('bg-primary', 'px-5', 'py-1.5', 'text-lg');
});