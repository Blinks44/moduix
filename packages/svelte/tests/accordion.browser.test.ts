import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './accordion/AsChildHarness.svelte';
import BindHarness from './accordion/BindHarness.svelte';
import ProviderHarness from './accordion/ProviderHarness.svelte';
import RefsHarness from './accordion/RefsHarness.svelte';
import TestAccordion from './accordion/TestAccordion.svelte';

test('preserves Ark semantics, Svelte refs, anatomy, attributes, and moduix hooks', async () => {
  const { component } = render(RefsHarness);

  const trigger = screen.getByRole('button', { name: 'First item' });
  const body = screen.getByText('First content');
  const content = body.parentElement;
  const refs = component.getRefs();
  const root = refs.rootRef as HTMLElement;

  expect(root.getAttribute('data-slot')).toBe('accordion-root');
  expect(root.getAttribute('data-scope')).toBe('accordion');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(refs.triggerRef).toBe(trigger);
  const triggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await expect.element(triggerLocator).toHaveAttribute('type', 'button');
  await expect.element(triggerLocator).toHaveAttribute('data-slot', 'accordion-item-trigger');
  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'true');
  await expect.element(triggerLocator).toHaveAttribute('aria-controls', content?.id);
  expect(
    Boolean(trigger.querySelector('[data-slot="accordion-item-indicator"] svg')?.isConnected),
  ).toBe(true);
  expect(content!.getAttribute('data-slot')).toBe('accordion-item-content');
  expect(content!.getAttribute('aria-labelledby')).toBe(trigger.id);
  expect(refs.bodyRef).toBe(body);
  await expect.element(page.getByText('First content')).toHaveAttribute('data-part', 'item-body');
  await expect
    .element(page.getByText('First content'))
    .toHaveAttribute('data-slot', 'accordion-item-body');
});

test('moves focus between vertical triggers with arrow keys', async () => {
  render(TestAccordion);

  const firstTriggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await firstTriggerLocator.click();
  await firstTriggerLocator.press('ArrowDown');
  const secondTriggerLocator = page.getByRole('button', { name: 'Second item', exact: true });
  await expect.element(secondTriggerLocator).toBeFocused();

  await secondTriggerLocator.press('ArrowUp');
  await expect.element(firstTriggerLocator).toBeFocused();

  await firstTriggerLocator.press('End');
  await expect.element(secondTriggerLocator).toBeFocused();
  await secondTriggerLocator.press('Home');
  await expect.element(firstTriggerLocator).toBeFocused();
});

test('keeps Ark value details and ignores disabled items', async () => {
  const values: string[][] = [];
  render(TestAccordion, {
    props: { disabled: true, onValueChange: (details) => values.push(details.value) },
  });

  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toBeDisabled();

  expect(values).toEqual([]);
});

test('supports bind:value and calls onValueChange once', async () => {
  const details: string[][] = [];
  render(BindHarness, { props: { details } });
  await page.getByRole('button', { name: 'Second item', exact: true }).click();

  await expect.element(page.getByText('Open items: second')).toBeAttached();
  expect(details).toEqual([['second']]);
});

test('mounts lazy content only after its item opens', async () => {
  render(TestAccordion, { props: { lazyMount: true } });

  await expect.element(page.getByText('Second content')).toHaveCount(0);
  await page.getByRole('button', { name: 'Second item', exact: true }).click();
  await expect.element(page.getByText('Second content')).toBeVisible();
});

test('uses horizontal keyboard navigation', async () => {
  render(TestAccordion, { props: { orientation: 'horizontal' } });

  await page.getByRole('button', { name: 'First item', exact: true }).click();
  await page.getByRole('button', { name: 'First item', exact: true }).press('ArrowRight');
  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toBeFocused();
});

test('preserves the omitted and explicit collapsible contract', async () => {
  const { unmount } = render(TestAccordion);

  const collapsibleTriggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await collapsibleTriggerLocator.click();
  await expect.element(collapsibleTriggerLocator).toHaveAttribute('aria-expanded', 'true');
  unmount();

  render(TestAccordion, { props: { collapsible: true } });

  await collapsibleTriggerLocator.click();
  await expect.element(collapsibleTriggerLocator).toHaveAttribute('aria-expanded', 'false');
});

test('preserves semantic hosts and refs with asChild', async () => {
  const { component } = render(AsChildHarness);
  const root = screen.getByRole('region', { name: 'Frequently asked questions' });
  const body = screen.getByRole('article');
  const refs = component.getRefs();

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Frequently asked questions', exact: true }))
    .toHaveAttribute('data-slot', 'accordion-root');
  expect(refs.rootRef).toBe(root);
  await expect
    .element(page.getByRole('article'))
    .toHaveAttribute('data-slot', 'accordion-item-body');
  await expect.element(page.getByRole('article')).toHaveAttribute('data-part', 'item-body');
  expect(refs.bodyRef).toBe(body);
});

test('keeps provider and context composition connected', async () => {
  render(ProviderHarness);
  const firstTrigger = screen.getByRole('button', { name: /First item/ });

  await expect.element(page.getByText('First item is open')).toBeAttached();

  await page.getByRole('button', { name: 'Open second from context', exact: true }).click();
  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toHaveAttribute('aria-expanded', 'true');
  await expect
    .element(page.getByRole('button', { name: /First item/, exact: true }))
    .toHaveAttribute('aria-expanded', 'false');
  await expect.element(page.getByText('First item is closed')).toBeAttached();
  expect(Boolean(firstTrigger.closest('[data-slot="accordion-root-provider"]')?.isConnected)).toBe(
    true,
  );
});