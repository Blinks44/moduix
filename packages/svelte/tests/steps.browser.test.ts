import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './steps/AsChildHarness.svelte';
import BindHarness from './steps/BindHarness.svelte';
import ProgressHarness from './steps/ProgressHarness.svelte';
import ProviderHarness from './steps/ProviderHarness.svelte';
import RefsHarness from './steps/RefsHarness.svelte';
import TestSteps from './steps/TestSteps.svelte';

test('preserves Ark semantics, refs, attributes, anatomy, and default indicators', async () => {
  const changes: number[] = [];
  const { component } = render(RefsHarness, { props: { changes } });

  const account = screen.getByRole('tab', { name: /Account/ });
  const indicators = document.querySelectorAll('[data-slot="steps-indicator"]');
  const refs = component.getRefs();
  const root = refs.rootRef as HTMLElement;

  expect(root.getAttribute('data-slot')).toBe('steps-root');
  expect(root.getAttribute('data-scope')).toBe('steps');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect([...root.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  await expect
    .element(page.getByRole('tab', { name: /Account/, exact: true }))
    .toHaveAttribute('aria-controls');
  await expect
    .element(page.getByRole('tab', { name: /Profile/, exact: true }))
    .toHaveAttribute('aria-controls');
  expect(refs.triggerRef).toBe(account);
  expect(indicators[0]!.textContent).toContain('1');
  await expect.element(page.getByRole('button', { name: 'Back', exact: true })).toBeDisabled();

  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect.poll(() => changes).toEqual([1]);
  expect(indicators[0]!.hasAttribute('data-complete')).toBe(true);
  expect(Boolean(indicators[0]?.querySelector('svg')?.isConnected)).toBe(true);
});

test('keeps controlled step state synchronized with Ark details and bind:step', async () => {
  const changes: number[] = [];
  render(BindHarness, { props: { changes } });

  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect.element(page.getByRole('status')).toHaveAttribute('data-step', '1');
  expect(changes).toEqual([1]);
  await expect.element(page.getByRole('status')).toContainText('Current step: 2');
  await expect
    .element(page.getByRole('tab', { name: /Profile/, exact: true }))
    .toHaveAttribute('aria-selected', 'true');
});

test('preserves completion events, progress, and skippable navigation', async () => {
  const complete = rs.fn();
  const change = rs.fn();
  render(ProgressHarness, { props: { change, complete } });

  const button = page.getByRole('button', { name: 'Next', exact: true });

  await button.click();
  await expect.poll(() => change).toHaveBeenLastCalledWith({ step: 1 });

  await button.click();
  await expect.poll(() => change).toHaveBeenLastCalledWith({ step: 2 });
  await expect.element(page.getByText('Last panel')).toBeVisible();
  expect(
    document
      .querySelector<HTMLElement>('[data-slot="steps-root"]')!
      .style.getPropertyValue('--percent'),
  ).toBe('66.66666666666666%');

  await button.click();

  await expect.poll(() => complete).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledTimes(3);
  await expect.element(page.getByText('Finished')).toBeVisible();
  await expect.element(button).toBeDisabled();
  await expect
    .element(page.locator('[data-slot="steps-progress"]'))
    .toHaveAttribute('data-complete');

  await page.getByRole('button', { name: 'Back', exact: true }).click();

  await expect.element(page.getByText('Last panel')).toBeVisible();
});

test('preserves Ark linear validation and prevents direct navigation', async () => {
  const invalidSteps: Array<{
    step: number;
    action: 'next' | 'set';
    targetStep?: number;
  }> = [];
  render(TestSteps, {
    props: {
      linear: true,
      isStepValid: (index: number) => index !== 0,
      onStepInvalid: (details: { step: number; action: 'next' | 'set'; targetStep?: number }) =>
        invalidSteps.push(details),
    },
  });

  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect.poll(() => invalidSteps).toHaveLength(1);
  expect(invalidSteps[0]).toMatchObject({ step: 0, action: 'next' });

  await page.getByRole('tab', { name: /Profile/, exact: true }).click();

  expect(invalidSteps).toHaveLength(1);
  await expect.element(page.getByRole('tab').nth(0)).toHaveAttribute('aria-selected', 'true');
});

test('keeps RootProvider stores and context parts connected', async () => {
  render(ProviderHarness);

  await expect.element(page.getByText('Root step: 1')).toBeAttached();
  await expect.element(page.getByText('Context step: 1')).toBeAttached();
  await expect.element(page.getByText('First item is current')).toBeAttached();

  await page.getByRole('button', { name: 'Advance externally', exact: true }).click();

  await expect.element(page.getByText('Root step: 2')).toBeAttached();
  await expect.element(page.getByText('Context step: 2')).toBeAttached();
  await expect.element(page.getByText('First item is not current')).toBeAttached();
});

test('preserves custom indicator snippets and semantic asChild hosts', async () => {
  const { component } = render(AsChildHarness);

  const root = screen.getByRole('region', { name: 'Setup steps' });
  const trigger = screen.getByRole('tab', { name: 'Account' });
  const refs = component.getRefs();

  expect(root.tagName).toBe('SECTION');
  expect(refs.rootRef).toBe(root);
  expect(trigger.tagName).toBe('A');
  expect(refs.triggerRef).toBe(trigger);
  await expect
    .element(page.getByRole('tab', { name: 'Account', exact: true }))
    .toHaveAttribute('data-slot', 'steps-trigger');
  await expect.element(page.getByText('Start')).toBeAttached();
});

test('merges consumer classes on the trigger', async () => {
  const { component } = render(RefsHarness, {
    props: { changes: [], classes: 'consumer-trigger' },
  });

  expect([...(component.getRefs().triggerRef as HTMLElement).classList]).toEqual(
    expect.arrayContaining(['consumer-trigger']),
  );
});