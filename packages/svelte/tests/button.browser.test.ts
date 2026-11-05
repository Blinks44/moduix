import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import TestButton from './button/TestButton.svelte';

test('preserves semantic anchors, refs, data hooks, and composed event handlers with asChild', async () => {
  const calls: string[] = [];

  const { component } = render(TestButton, {
    props: {
      label: 'Read the docs',
      link: true,
      'data-scope': 'dialog',
      'data-part': 'trigger',
      'data-slot': 'custom-trigger',
      variant: 'outline',
      onclickcapture: () => calls.push('button capture'),
      onclick: () => calls.push('button click'),
      linkClick: () => calls.push('link click'),
    },
  });

  const link = screen.getByRole('link', { name: 'Read the docs' });

  expect(component.getRef()).toBe(link);
  await expect
    .element(page.getByRole('link', { name: 'Read the docs' }))
    .toHaveAttribute('href', '#docs');
  await expect
    .element(page.getByRole('link', { name: 'Read the docs' }))
    .not.toHaveAttribute('type');
  expect(link.dataset).toMatchObject({ scope: 'dialog', part: 'trigger', slot: 'custom-trigger' });

  await page.getByRole('link', { name: 'Read the docs' }).click();

  expect(calls).toEqual(['button capture', 'link click', 'button click']);
});

test('disables custom hosts accessibly and prevents activation', async () => {
  let activationCount = 0;
  const handleClick = () => activationCount++;

  render(TestButton, {
    props: {
      label: 'Read the docs',
      link: true,
      disabled: true,
      onclick: handleClick,
      linkClick: handleClick,
    },
  });

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

  render(TestButton, {
    props: { label: 'Unavailable', 'aria-disabled': 'true', onclick: () => activationCount++ },
  });

  const button = screen.getByRole('button', { name: 'Unavailable' });

  await expect.element(page.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: 'Unavailable' }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Unavailable' }))
    .toHaveAttribute('data-disabled');

  expect(button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );

  expect(activationCount).toBe(0);
});

test('wires the loading state without taking over its content', async () => {
  render(TestButton, { props: { label: 'Saving', loading: true } });

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

test.each([false, true])(
  'updates native ARIA state without remounting (asChild=%s)',
  async (asChild) => {
    let activations = 0;
    const base = { label: 'Continue', link: asChild, onclick: () => activations++ };
    const { rerender } = render(TestButton, {
      props: { ...base, 'aria-disabled': 'false', 'aria-busy': false, loading: false },
    });
    const role = asChild ? 'link' : 'button';
    const host = screen.getByRole(role, { name: 'Continue' });
    const button = page.getByRole(role, { name: 'Continue' });

    for (const value of [true, 'true'] as const) {
      await rerender({ ...base, 'aria-disabled': value, 'aria-busy': true, loading: false });
      await expect.element(button).toHaveAttribute('aria-disabled', 'true');
      await expect.element(button).toHaveAttribute('aria-busy', 'true');
      await expect.element(button).toHaveAttribute('data-disabled');
      expect(host.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
        false,
      );
      expect(activations).toBe(0);
    }

    await rerender({ ...base, 'aria-disabled': false, 'aria-busy': undefined, loading: false });
    await expect.element(button).toHaveAttribute('aria-disabled', 'false');
    await expect.element(button).not.toHaveAttribute('aria-busy');
    await expect.element(button).not.toHaveAttribute('data-disabled');
    if (!asChild) await expect.element(button).not.toBeDisabled();
    await button.click();
    expect(activations).toBe(1);

    await rerender({ ...base, 'aria-disabled': false, 'aria-busy': undefined, loading: true });
    await expect.element(button).toHaveAttribute('aria-busy', 'true');
    await expect.element(button).toHaveAttribute('aria-disabled', 'true');
    await rerender({ ...base, 'aria-disabled': false, 'aria-busy': undefined, loading: false });
    await expect.element(button).not.toHaveAttribute('aria-busy');
    await expect.element(button).toHaveAttribute('aria-disabled', 'false');
    expect(screen.getByRole(role, { name: 'Continue' })).toBe(host);
  },
);

test('preserves cancellation by a capture listener on a custom host', async () => {
  const calls: string[] = [];
  render(TestButton, {
    props: {
      label: 'Continue',
      link: true,
      onclickcapture: (event) => {
        calls.push('capture');
        event.preventDefault();
      },
      onclick: (event) => calls.push(`click ${event.defaultPrevented}`),
    },
  });
  await page.getByRole('link', { name: 'Continue' }).click();
  expect(calls).toEqual(['capture', 'click true']);
});

test('applies explicit variant and size values to the root', () => {
  render(TestButton, {
    props: {
      label: '×',
      'aria-label': 'Delete item',
      size: 'icon-lg',
      variant: 'destructive-outline',
    },
  });

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button.dataset).toMatchObject({ size: 'icon-lg', variant: 'destructive-outline' });
});