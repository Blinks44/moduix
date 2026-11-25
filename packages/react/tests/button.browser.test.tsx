import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Button } from '@/index';

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

test('renders a built-in spinner when loading and supports loadingText and loadingIndicator', async () => {
  const { rerender } = render(<Button loading>Saving</Button>);

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
  expect(button.querySelector('[data-slot="spinner-root"]')).not.toBeNull();

  rerender(
    <Button loading loadingText="Submitting...">
      Save
    </Button>,
  );
  expect(screen.getByRole('button', { name: 'Submitting...' })).toBe(button);
  expect(button.querySelector('[data-slot="spinner-root"]')).not.toBeNull();

  rerender(
    <Button loading loadingIndicator={false}>
      Saving
    </Button>,
  );
  expect(button.querySelector('[data-slot="spinner-root"]')).toBeNull();

  rerender(
    <Button aria-label="Refresh" loading size="icon-md">
      <span data-testid="icon-child">↻</span>
    </Button>,
  );
  expect(screen.queryByTestId('icon-child')).toBeNull();
  expect(button.querySelector('[data-slot="spinner-root"]')).not.toBeNull();
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