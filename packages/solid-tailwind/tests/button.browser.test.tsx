import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Button } from '../src';

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
  expect([...button!.classList]).toEqual(
    expect.arrayContaining([
      'transition-[background-color,border-color,color,opacity,transform,translate]',
      'duration-150',
      'motion-reduce:transition-none',
      "motion-safe:[&[data-slot='button-root']:not([data-variant='link']):not([aria-haspopup]):active]:translate-y-px",
    ]),
  );
  expect(
    button?.classList.contains("motion-safe:[&:not([data-variant='link']):active]:translate-y-px"),
  ).toBe(false);
  expect(button.dataset).toMatchObject({ variant: 'default', size: 'md' });
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

test('exposes root utilities without overriding an explicit icon size', () => {
  render(() => (
    <Button>
      <svg class="size-6" data-testid="icon" />
      Save changes
    </Button>
  ));

  const button = screen.getByRole('button', { name: 'Save changes' });

  expect([...button!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'items-center',
      'gap-2',
      'rounded-md',
      "[&>svg:not([class*='size-'])]:size-4",
      '[&>svg]:shrink-0',
    ]),
  );
  expect(screen.getByTestId('icon')?.classList.contains('size-6')).toBe(true);
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Button class="bg-secondary p-0 text-xs" size="lg">
      Save changes
    </Button>
  ));

  const button = screen.getByRole('button', { name: 'Save changes' });

  expect([...button!.classList]).toEqual(
    expect.arrayContaining(['bg-secondary', 'p-0', 'text-xs']),
  );
  for (const utility of ['bg-primary', 'px-5', 'py-1.5', 'text-lg']) {
    expect(button!.classList.contains(utility)).toBe(false);
  }
});