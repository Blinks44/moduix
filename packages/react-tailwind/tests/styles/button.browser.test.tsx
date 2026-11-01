import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Button } from '@/index';

test('renders a native button with safe defaults, stable hooks, and a forwarded ref', async () => {
  const ref = createRef<HTMLButtonElement>();

  render(
    <Button ref={ref} data-testid="button">
      Save changes
    </Button>,
  );

  const button = screen.getByTestId('button');

  expect(ref.current).toBe(button);
  await expect.element(page.getByTestId('button')).toHaveAttribute('type', 'button');
  expect(button.dataset).toMatchObject({ scope: 'button', part: 'root', slot: 'button-root' });
  expect(button.dataset).toMatchObject({ variant: 'default', size: 'md' });
});

test('sizes unsized icons and keeps an explicit icon size', () => {
  render(
    <Button>
      <svg data-testid="default-icon" />
      <svg className="size-6" data-testid="sized-icon" />
      Save changes
    </Button>,
  );

  expect(screen.getByTestId('default-icon').getBoundingClientRect().width).toBe(16);
  expect(screen.getByTestId('sized-icon').getBoundingClientRect().width).toBe(24);
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Button className="p-0" size="lg">
      Save changes
    </Button>,
  );

  expect(getComputedStyle(screen.getByRole('button', { name: 'Save changes' })).padding).toBe(
    '0px',
  );
});

test('reads the token duration and lets a consumer duration replace it', () => {
  render(
    <Button className="duration-500" data-testid="button">
      Save
    </Button>,
  );

  const button = screen.getByTestId('button');

  expect(getComputedStyle(button).transitionDuration.split(', ')[0]).toBe('0.5s');
});