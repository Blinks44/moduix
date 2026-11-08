import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './input-group/AsChildHarness.svelte';
import BoundHarness from './input-group/BoundHarness.svelte';
import ClearCustomHarness from './input-group/ClearCustomHarness.svelte';
import ClearFormHarness from './input-group/ClearFormHarness.svelte';
import ClearOwnedHarness from './input-group/ClearOwnedHarness.svelte';
import ResponsiveHarness from './input-group/ResponsiveHarness.svelte';

test('keeps the group size context reactive and allows a local input size', async () => {
  const { component } = render(ResponsiveHarness);

  await expect.element(page.getByTestId('responsive-group')).toHaveAttribute('data-size', 'sm');
  await expect
    .element(page.getByRole('textbox', { name: 'Workspace', exact: true }))
    .toHaveAttribute('data-size', 'sm');
  await expect
    .element(page.getByRole('textbox', { name: 'Small workspace', exact: true }))
    .toHaveAttribute('data-size', 'xs');
  await expect
    .element(page.getByRole('button', { name: 'Copy', exact: true }))
    .toHaveAttribute('data-size', 'sm');

  component.setSize('xl');

  await expect.element(page.getByTestId('responsive-group')).toHaveAttribute('data-size', 'xl');
  await expect
    .element(page.getByRole('textbox', { name: 'Workspace', exact: true }))
    .toHaveAttribute('data-size', 'xl');
  await expect
    .element(page.getByRole('textbox', { name: 'Small workspace', exact: true }))
    .toHaveAttribute('data-size', 'xs');
  await expect
    .element(page.getByRole('button', { name: 'Copy', exact: true }))
    .toHaveAttribute('data-size', 'xl');
});

test('preserves semantic hosts with asChild composition', async () => {
  const { component } = render(AsChildHarness);
  const root = screen.getByTestId('as-child-root');
  const addon = screen.getByText('@');
  const text = screen.getByText('.com');

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByTestId('as-child-root'))
    .toHaveAttribute('data-slot', 'input-group-root');
  expect(component.getRefs().rootRef).toBe(root);
  expect(addon.tagName).toBe('STRONG');
  await expect
    .element(page.getByText('@', { exact: true }))
    .toHaveAttribute('data-slot', 'input-group-addon');
  expect(component.getRefs().addonRef).toBe(addon);
  expect(text.tagName).toBe('EM');
  await expect
    .element(page.getByText('.com', { exact: true }))
    .toHaveAttribute('data-slot', 'input-group-text');
  expect(component.getRefs().textRef).toBe(text);
});

test.each([false, true])(
  'supports controlled bind:value through InputGroupInput (asChild=%s)',
  async (asChild) => {
    const changes: string[] = [];
    const { component } = render(BoundHarness, { props: { asChild, changes } });

    const textbox = page.getByRole('textbox', { name: 'Project key', exact: true });
    await expect.element(textbox).toHaveValue('initial');
    await textbox.fill('next');

    await expect.element(textbox).toHaveValue('next');
    await expect.element(page.getByText('next', { exact: true })).toBeAttached();
    expect(changes).toEqual(['next']);
    component.setValue('from parent');
    await expect.element(textbox).toHaveValue('from parent');
    expect(changes).toEqual(['next']);
  },
);

test('clear trigger forwards a single click, inherits size, and does not submit or reset a form', async () => {
  const clear = rs.fn();
  const submit = rs.fn();
  render(ClearFormHarness, { props: { clear, submit } });
  const button = screen.getByRole('button', { name: 'Clear input' });
  const buttonLocator = page.getByRole('button', { name: 'Clear input', exact: true });
  await expect.element(buttonLocator).toHaveAttribute('type', 'button');
  await expect.element(buttonLocator).toHaveAttribute('data-size', 'lg');
  await expect.element(buttonLocator).toHaveAttribute('data-slot', 'input-group-clear-trigger');
  await expect.element(buttonLocator).toHaveAttribute('data-scope', 'input-group');
  await expect.element(buttonLocator).toHaveAttribute('data-part', 'clear-trigger');
  expect([...button.classList]).toEqual(expect.arrayContaining(['consumer-clear']));
  expect(button.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
  await buttonLocator.click();
  expect(clear).toHaveBeenCalledTimes(1);
  expect(submit).not.toHaveBeenCalled();
  await expect
    .element(page.getByRole('textbox', { name: 'Search', exact: true }))
    .toHaveValue('moduix');
});

test('clear trigger supports app-owned value, visibility, and focus', async () => {
  const { component } = render(ClearOwnedHarness);
  await page.getByRole('button', { name: 'Clear input', exact: true }).click();
  expect(component.getValue()).toBe('');
  await expect.element(page.getByRole('textbox', { name: 'Search', exact: true })).toHaveValue('');
  await expect.element(page.getByRole('textbox', { name: 'Search', exact: true })).toBeFocused();
  await expect.element(page.getByRole('button')).toHaveCount(0);
});

test('clear trigger preserves custom labels, children, asChild hosts, refs, and disabled behavior', async () => {
  const clear = rs.fn();
  const { component } = render(ClearCustomHarness, { props: { clear } });
  const button = screen.getByRole('button', { name: 'Erase query' });
  expect(component.getRefs().trigger).toBe(button);
  const buttonLocator = page.getByRole('button', { name: 'Erase query', exact: true });
  await expect.element(buttonLocator).not.toHaveAttribute('aria-label');
  await expect.element(buttonLocator).toContainText('Custom icon');
  await expect.element(buttonLocator).toHaveAttribute('data-size', 'sm');
  await buttonLocator.click();
  expect(clear).toHaveBeenCalledTimes(1);

  await expect
    .element(page.getByRole('button', { name: 'Disabled clear', exact: true }))
    .toBeDisabled();
  expect(clear).toHaveBeenCalledTimes(1);
});