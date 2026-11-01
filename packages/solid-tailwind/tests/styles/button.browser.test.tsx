import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Button } from '@/index';

test('renders a native button with safe defaults, stable hooks, and a forwarded ref', async () => {
  let ref!: HTMLButtonElement;

  render(() => (
    <Button ref={(element) => (ref = element)} data-testid="button">
      Save changes
    </Button>
  ));

  const button = screen.getByTestId('button');

  expect(ref).toBe(button);
  await expect.element(page.getByTestId('button')).toHaveAttribute('type', 'button');
  expect(button.dataset).toMatchObject({ scope: 'button', part: 'root', slot: 'button-root' });
  expect(button.dataset).toMatchObject({ variant: 'default', size: 'md' });
});

test('sizes unsized icons and keeps an explicit icon size', () => {
  render(() => (
    <Button>
      <svg data-testid="default-icon" />
      <svg class="size-6" data-testid="sized-icon" />
      Save changes
    </Button>
  ));

  expect(screen.getByTestId('default-icon').getBoundingClientRect().width).toBe(16);
  expect(screen.getByTestId('sized-icon').getBoundingClientRect().width).toBe(24);
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Button class="p-0" size="lg">
      Save changes
    </Button>
  ));

  expect(getComputedStyle(screen.getByRole('button', { name: 'Save changes' })).padding).toBe(
    '0px',
  );
});

test('reads the token duration and lets a consumer duration replace it', () => {
  render(() => (
    <Button class="duration-500" data-testid="button">
      Save
    </Button>
  ));

  const button = screen.getByTestId('button');

  expect(getComputedStyle(button).transitionDuration.split(', ')[0]).toBe('0.5s');
});