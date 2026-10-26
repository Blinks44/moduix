import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Button } from '../src';

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

test('preserves semantic asChild anchors and composed event handlers', async () => {
  const ref = createRef<HTMLButtonElement>();
  const calls: string[] = [];

  render(
    <Button
      ref={ref}
      variant="outline"
      asChild
      onClickCapture={() => calls.push('button capture')}
      onClick={() => calls.push('button click')}
    >
      <a href="#docs" onClick={() => calls.push('link click')}>
        Read the docs
      </a>
    </Button>,
  );

  const link = screen.getByRole('link', { name: 'Read the docs' });
  expect(ref.current).toBe(link);
  expect(link.getAttribute('href')).toBe('#docs');
  expect(link.hasAttribute('type')).toBe(false);
  expect(link.dataset).toMatchObject({ slot: 'button-root', variant: 'outline' });

  await page.getByRole('link', { name: 'Read the docs' }).click();

  expect(calls).toEqual(['button capture', 'link click', 'button click']);
});

test('disables custom hosts accessibly and prevents activation', async () => {
  let activationCount = 0;

  render(
    <Button asChild disabled onClick={() => activationCount++}>
      <a href="#docs" onClick={() => activationCount++}>
        Read the docs
      </a>
    </Button>,
  );

  const link = screen.getByRole('link', { name: 'Read the docs' });

  await expect
    .element(page.getByRole('link', { name: 'Read the docs' }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('link', { name: 'Read the docs' }))
    .toHaveAttribute('data-disabled');
  expect(link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );
  expect(activationCount).toBe(0);
});

test('aria-disabled prevents activation and disables a native button', async () => {
  let activationCount = 0;

  render(
    <Button aria-disabled="true" onClick={() => activationCount++}>
      Unavailable
    </Button>,
  );

  const button = screen.getByRole('button', { name: 'Unavailable' });

  await expect.element(page.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: 'Unavailable' }))
    .toHaveAttribute('data-disabled');
  button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  expect(activationCount).toBe(0);
});

test('wires the loading state without taking over its content', async () => {
  render(<Button loading>Saving</Button>);

  const button = screen.getByRole('button', { name: 'Saving' });

  await expect.element(page.getByRole('button', { name: 'Saving' })).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: 'Saving' }))
    .toHaveAttribute('aria-busy', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Saving' }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Saving' }))
    .toHaveAttribute('data-disabled');
  expect(button.hasAttribute('data-loading')).toBe(true);
});

test('applies explicit recipe values to the root', () => {
  render(
    <Button aria-label="Delete item" size="icon-lg" variant="destructive-outline">
      ×
    </Button>,
  );

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button.dataset).toMatchObject({ size: 'icon-lg', variant: 'destructive-outline' });
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