import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './collapsible/AsChildHarness.svelte';
import BindHarness from './collapsible/BindHarness.svelte';
import PartialHarness from './collapsible/PartialHarness.svelte';
import ProviderHarness from './collapsible/ProviderHarness.svelte';
import RefsHarness from './collapsible/RefsHarness.svelte';
import TestCollapsible from './collapsible/TestCollapsible.svelte';

test('preserves Ark trigger semantics and lazy unmounting', async () => {
  render(TestCollapsible, { props: { lazyMount: true, unmountOnExit: true } });

  const trigger = page.getByRole('button', { name: 'Recovery details' });

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect.element(page.getByText('Keep this safe.')).toHaveCount(0);

  await trigger.click();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect.element(page.getByText('Keep this safe.')).toBeAttached();

  await trigger.click();

  await expect.element(page.getByText('Keep this safe.')).toHaveCount(0);
});

test('supports bind:open and forwards the controlled callback details object', async () => {
  const details: boolean[] = [];
  render(BindHarness, { props: { details } });

  await page.getByRole('button', { name: 'Recovery details' }).click();

  await expect.element(page.getByText('Open: true')).toBeAttached();
  expect(details).toEqual([true]);
});

test('does not toggle or emit changes while disabled', async () => {
  const changes = rs.fn();
  render(TestCollapsible, { props: { disabled: true, onOpenChange: changes } });
  const trigger = page.getByRole('button', { name: 'Recovery details' });
  await expect.element(trigger).toHaveAttribute('data-disabled');
  await trigger.click();
  await trigger.press('Enter');
  await trigger.press('Space');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(changes).not.toHaveBeenCalled();
});

test('keeps interactive content inert while partially collapsed', async () => {
  render(PartialHarness);

  const content = screen.getByTestId('partial-content');

  expect(content.hasAttribute('data-has-collapsed-size')).toBe(true);
  await expect.element(page.getByTestId('partial-content')).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Nested action')).toHaveAttribute('inert');

  await page.getByRole('button', { name: 'Partial details' }).click();

  await expect.element(page.getByText('Nested action')).not.toHaveAttribute('inert');
});

test('preserves consumer-owned trigger refs and behavior with asChild', async () => {
  const { component } = render(AsChildHarness);

  const trigger = screen.getByRole('button', { name: 'Composed details' });

  expect(component.getRefs().triggerRef).toBe(trigger);
  expect(trigger.classList.contains('consumer-trigger')).toBe(true);
  expect(trigger.getAttribute('data-slot')).toBe('collapsible-trigger');
  const triggerLocator = page.getByRole('button', { name: 'Composed details' });

  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'false');

  await triggerLocator.click();

  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'true');
});

test('preserves Svelte refs, anatomy, attributes, and moduix hooks', async () => {
  const { component } = render(RefsHarness);

  const trigger = screen.getByRole('button', { name: 'Details' });
  const body = screen.getByText('Content');
  const content = body.parentElement;
  const refs = component.getRefs();
  const root = refs.rootRef as HTMLElement;

  expect(root.dataset).toMatchObject({
    slot: 'collapsible-root',
    scope: 'collapsible',
    probe: 'root',
  });
  expect(refs.triggerRef).toBe(trigger);
  const triggerLocator = page.getByRole('button', { name: 'Details' });
  await expect.element(triggerLocator).toHaveAttribute('type', 'button');
  expect(trigger.getAttribute('data-slot')).toBe('collapsible-trigger');
  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'true');
  await expect.element(triggerLocator).toHaveAttribute('aria-controls', content?.id);
  expect(
    trigger.querySelector('[data-slot="collapsible-indicator"] svg')?.isConnected ?? false,
  ).toBe(true);
  expect(refs.indicatorRef?.getAttribute('data-slot')).toBe('collapsible-indicator');
  expect(refs.contentRef).toBe(content);
  expect(content?.getAttribute('data-slot')).toBe('collapsible-content');
  expect(refs.bodyRef).toBe(body);
  expect(body.dataset).toMatchObject({
    scope: 'collapsible',
    part: 'body',
    slot: 'collapsible-body',
  });
});

test('keeps provider and descendant context composition connected', async () => {
  render(ProviderHarness);

  const trigger = screen.getByRole('button', { name: 'Provider details' });
  const triggerLocator = page.getByRole('button', { name: 'Provider details' });
  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'true');

  await page.getByRole('button', { name: 'Close from context' }).click();

  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'false');
  expect(trigger.closest('[data-slot="collapsible-root-provider"]')?.isConnected ?? false).toBe(
    true,
  );
});