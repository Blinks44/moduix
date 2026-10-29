import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Button } from '@/index';

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

test('preserves semantic asChild anchors and composed event handlers', async () => {
  const calls: string[] = [];

  render(() => (
    <Button
      variant="outline"
      onClickCapture={() => calls.push('button capture')}
      onClick={() => calls.push('button click')}
      asChild={(props) => (
        <a {...props({ onClick: () => calls.push('link click') })} href="#docs">
          Read the docs
        </a>
      )}
    />
  ));

  const link = screen.getByRole('link', { name: 'Read the docs' });
  expect(link.getAttribute('href')).toBe('#docs');
  expect(link.hasAttribute('type')).toBe(false);
  expect(link.dataset).toMatchObject({ slot: 'button-root', variant: 'outline' });

  await page.getByRole('link', { name: 'Read the docs' }).click();

  expect(calls).toEqual(['button capture', 'link click', 'button click']);
});

test('supports Solid bound click handlers', async () => {
  const calls: string[] = [];

  render(() => (
    <Button onClick={[(value: string) => calls.push(value), 'saved']}>Save changes</Button>
  ));

  await page.getByRole('button', { name: 'Save changes' }).click();

  expect(calls).toEqual(['saved']);
});

test('disables custom hosts accessibly and prevents activation', async () => {
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

  render(() => (
    <Button aria-disabled="true" onClick={() => activationCount++}>
      Unavailable
    </Button>
  ));

  const button = screen.getByRole('button', { name: 'Unavailable' });

  await expect.element(page.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: 'Unavailable' }))
    .toHaveAttribute('data-disabled');
  button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  expect(activationCount).toBe(0);
});

test('wires the loading state without taking over its content', async () => {
  render(() => <Button loading>Saving</Button>);

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
  render(() => (
    <Button aria-label="Delete item" size="icon-lg" variant="destructive-outline">
      ×
    </Button>
  ));

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button.dataset).toMatchObject({ size: 'icon-lg', variant: 'destructive-outline' });
});