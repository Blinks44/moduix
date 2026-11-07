import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ClassClipboard from './clipboard/ClassClipboard.svelte';
import ContextClipboard from './clipboard/ContextClipboard.svelte';
import ControlledClipboard from './clipboard/ControlledClipboard.svelte';
import DisabledClipboard from './clipboard/DisabledClipboard.svelte';
import InputClipboard from './clipboard/InputClipboard.svelte';
import ProviderClipboard from './clipboard/ProviderClipboard.svelte';
import RefsClipboard from './clipboard/RefsClipboard.svelte';
import TimeoutClipboard from './clipboard/TimeoutClipboard.svelte';

test('keeps controlled value changes Ark-shaped and calls each Svelte callback once', async () => {
  const details: string[] = [];
  render(ControlledClipboard, { props: { onValueChange: (next) => details.push(next.value) } });

  await page.getByRole('button', { name: 'Change URL', exact: true }).click();

  await expect
    .element(page.getByRole('textbox', { name: 'Share URL', exact: true }))
    .toHaveValue('https://chakra-ui.com');
  await expect.poll(() => details).toEqual(['https://chakra-ui.com']);
  await expect.element(page.getByText('https://chakra-ui.com', { exact: true })).toBeAttached();
});

test.each([false, true])(
  'keeps reactive input attrs and classes with asChild=%s',
  async (asChild) => {
    const clicked = rs.fn();
    const { component, rerender } = render(InputClipboard, {
      props: {
        asChild,
        clicked,
        inputClass: 'consumer-input initial-class',
        title: 'Initial title',
      },
    });

    const input = screen.getByRole('textbox', { name: 'Code' });
    expect(component.getRefs().inputRef).toBe(input);
    expect(getComputedStyle(input).color).toBe('rgb(255, 0, 0)');
    const inputLocator = page.getByRole('textbox', { name: 'Code', exact: true });
    await expect.element(inputLocator).toHaveValue('clipboard-code');
    await expect.element(inputLocator).toHaveAttribute('data-testid', 'clipboard-input');
    await rerender({ inputClass: 'updated-class', title: 'Updated title' });
    await expect.element(inputLocator).toHaveAttribute('title', 'Updated title');
    expect(input.classList.contains('updated-class')).toBe(true);
    expect(input.classList.contains('initial-class')).toBe(false);
    await inputLocator.click();
    expect(clicked).toHaveBeenCalledTimes(1);
  },
);

test('keeps RootProvider and asChild composition semantic', async () => {
  render(ProviderClipboard);

  await expect
    .element(page.getByRole('textbox', { name: 'Provider value', exact: true }))
    .toHaveValue('provider-value');
  await expect
    .element(page.getByRole('textbox', { name: 'Provider value', exact: true }))
    .toHaveAttribute('data-slot', 'clipboard-input');
  await expect
    .element(page.locator('[data-slot="clipboard-trigger"]'))
    .toHaveAttribute('data-slot', 'clipboard-trigger');
});

test('forwards refs and renders default and custom indicator snippets', async () => {
  const { component } = render(RefsClipboard);
  const input = screen.getByRole('textbox', { name: 'Copy this link' });
  const trigger = screen.getByRole('button', { name: 'Copy to clipboard' });

  expect(component.getRefs().rootRef?.getAttribute('data-slot')).toBe('clipboard-root');
  expect(component.getRefs().inputRef).toBe(input);
  expect(component.getRefs().triggerRef).toBe(trigger);
  await expect
    .element(page.locator('[data-slot="clipboard-indicator"] > svg[class*="copy"]'))
    .toBeAttached();
  expect(
    document.querySelector('[data-slot="clipboard-indicator"] > svg')?.getAttribute('stroke-width'),
  ).toBe('2.5');

  await page.locator('[data-slot="clipboard-trigger"]').click();

  await expect
    .element(page.locator('[data-slot="clipboard-trigger"]'))
    .toHaveAttribute('data-copied');
  await expect.poll(() => navigator.clipboard.readText()).toBe('https://moduix.dev/docs/clipboard');
  await expect
    .element(page.locator('[data-slot="clipboard-indicator"] > svg[class*="copy"]'))
    .toHaveCount(0);
  await expect
    .element(page.locator('[data-slot="clipboard-indicator"] > svg[class*="check"]'))
    .toBeAttached();
  await expect.element(page.getByText('Copied!')).toBeAttached();
});

test('exposes the Ark clipboard state through context', async () => {
  render(ContextClipboard);

  await expect.element(page.getByText('render:context-value')).toBeAttached();
  await expect.element(page.getByText('context-value:false')).toBeAttached();
});

test('preserves native disabled semantics on the input and trigger', async () => {
  render(DisabledClipboard);

  await expect
    .element(page.getByRole('textbox', { name: 'Disabled value', exact: true }))
    .toBeDisabled();
  await expect.element(page.locator('[data-slot="clipboard-trigger"]')).toBeDisabled();
});

test('clears copied state after the configured timeout', async () => {
  const statusChange = rs.fn();

  render(TimeoutClipboard, { props: { statusChange } });

  const copyTrigger = page.locator('[data-slot="clipboard-trigger"]');
  await copyTrigger.click();

  expect(statusChange).toHaveBeenCalledExactlyOnceWith({ copied: true });
  await expect.element(copyTrigger).not.toHaveAttribute('data-copied');
});

test('preserves value text anatomy and consumer classes', () => {
  const { container } = render(ClassClipboard);
  const root = container.querySelector('[data-slot="clipboard-root"]');
  const control = container.querySelector('[data-slot="clipboard-control"]');
  const valueText = container.querySelector('[data-slot="clipboard-value-text"]');
  const trigger = container.querySelector('[data-slot="clipboard-trigger"]');

  expect(root?.className.endsWith('consumer-root')).toBe(true);
  expect(control?.className.endsWith('consumer-control')).toBe(true);
  expect(valueText?.className.endsWith('consumer-value')).toBe(true);
  expect(trigger?.className.endsWith('consumer-trigger')).toBe(true);
});