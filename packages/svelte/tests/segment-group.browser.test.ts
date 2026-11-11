import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildSegmentGroup from './segment-group/AsChildSegmentGroup.svelte';
import BoundSegmentGroup from './segment-group/BoundSegmentGroup.svelte';
import ContextSegmentGroup from './segment-group/ContextSegmentGroup.svelte';
import ExternalSegmentGroup from './segment-group/ExternalSegmentGroup.svelte';
import FormSegmentGroup from './segment-group/FormSegmentGroup.svelte';
import OrientationSegmentGroup from './segment-group/OrientationSegmentGroup.svelte';
import ProviderAsChildSegmentGroup from './segment-group/ProviderAsChildSegmentGroup.svelte';
import RefsSegmentGroup from './segment-group/RefsSegmentGroup.svelte';
import SnippetItemsSegmentGroup from './segment-group/SnippetItemsSegmentGroup.svelte';
import StatesSegmentGroup from './segment-group/StatesSegmentGroup.svelte';
import StringItemsSegmentGroup from './segment-group/StringItemsSegmentGroup.svelte';
import VerticalSegmentGroup from './segment-group/VerticalSegmentGroup.svelte';

test('submits through the convenience item inputs and preserves radio semantics', async () => {
  render(FormSegmentGroup);

  const form = screen.getByTestId('form') as HTMLFormElement;
  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('React');
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('Solid');
});

test('reacts to external bind:value changes', async () => {
  render(ExternalSegmentGroup);

  await page.getByRole('button', { name: 'Set Solid', exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
});

test('forwards refs, attrs, anatomy, and consumer classes on public parts', async () => {
  const { component } = render(RefsSegmentGroup);
  const refs = component.getRefs();

  const root = refs.root as HTMLElement;
  const label = screen.getByText('Framework');
  const item = screen.getByText('React').closest('[data-slot="segment-group-item"]') as HTMLElement;
  const text = screen.getByText('React');
  const indicator = screen
    .getByRole('radiogroup')
    .querySelector('[data-slot="segment-group-indicator"]');
  expect(root.getAttribute('data-slot')).toBe('segment-group-root');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect([...root.classList]).toEqual(expect.arrayContaining(['custom-root']));
  await expect
    .element(page.getByText('Framework'))
    .toHaveAttribute('data-slot', 'segment-group-label');
  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeChecked();
  expect(item.getAttribute('data-slot')).toBe('segment-group-item');
  expect([...item.classList]).toEqual(expect.arrayContaining(['custom-item']));
  await expect
    .element(page.getByText('React'))
    .toHaveAttribute('data-slot', 'segment-group-item-text');
  expect(indicator?.getAttribute('data-slot')).toBe('segment-group-indicator');
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['custom-indicator']));
  expect(refs.label).toBe(label);
  expect(refs.item).toBe(item);
  expect(refs.text).toBe(text);
  expect(refs.indicator).toBe(indicator);
});

test('keeps asChild item state and indicator geometry reactive', async () => {
  render(AsChildSegmentGroup);

  const annual = screen.getByTestId('annual');
  const indicator = screen.getByTestId('indicator');
  await expect.element(page.getByTestId('monthly')).toHaveAttribute('data-state', 'checked');
  await page.getByTestId('annual').click();
  await expect.element(page.getByTestId('annual')).toHaveAttribute('data-state', 'checked');
  await expect.element(page.getByTestId('monthly')).not.toHaveAttribute('data-state', 'checked');
  await expect
    .poll(() => parseFloat(indicator.style.getPropertyValue('--left')))
    .toBe(annual.offsetLeft);
});

test('preserves vertical orientation and native selection behavior', async () => {
  render(VerticalSegmentGroup);

  await expect
    .element(page.getByRole('radiogroup'))
    .toHaveAttribute('aria-orientation', 'vertical');
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
});

test('defaults the root and the hook to horizontal orientation', async () => {
  render(OrientationSegmentGroup);

  await expect.element(page.getByTestId('root')).toHaveAttribute('data-orientation', 'horizontal');
  await expect
    .element(page.getByTestId('provider'))
    .toHaveAttribute('data-orientation', 'horizontal');
});

test('renders string items with the string as value and label', async () => {
  render(StringItemsSegmentGroup);

  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('framework')).toBe(
    'Solid',
  );
});

test('renders snippet labels and disabled item options', async () => {
  render(SnippetItemsSegmentGroup);

  await expect.element(page.getByTestId('rich-label')).toBeAttached();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeDisabled();
});

test('supports bind:value and emits one value-change detail per selection', async () => {
  const details: Array<string | null> = [];
  render(BoundSegmentGroup, { props: { details } });

  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByText('Current value: Solid')).toBeAttached();
  expect(details).toEqual(['Solid']);
});

test('preserves disabled, read-only, invalid, and required states', async () => {
  render(StatesSegmentGroup);

  await expect
    .element(page.getByRole('radio', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radio', { name: 'Read-only option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radiogroup', { name: 'Read-only framework', exact: true }))
    .toHaveAttribute('aria-readonly', 'true');
  await expect
    .element(page.getByRole('radio', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('radio', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('keeps asChild composition semantic and forwards item inputs', async () => {
  const { component } = render(ProviderAsChildSegmentGroup);
  const refs = component.getRefs();

  const root = screen.getByRole('radiogroup', { name: 'Framework choices' });
  const item = screen.getByTestId('custom-item');
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('radiogroup', { name: 'Framework choices', exact: true }))
    .toHaveAttribute('data-slot', 'segment-group-root');
  expect(item.tagName).toBe('LABEL');
  await expect
    .element(page.getByTestId('custom-item'))
    .toHaveAttribute('data-slot', 'segment-group-item');
  expect(item.querySelector('input[type="radio"]')?.isConnected).toBe(true);
  expect(refs.rootRef).toBe(root);
  expect(refs.itemRef).toBe(item);
});

test('connects root and item contexts through the provider', async () => {
  render(ContextSegmentGroup);

  await expect.element(page.getByText('checked')).toBeAttached();
  await page.getByRole('button', { name: 'Select', exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  await expect.element(page.getByText('unchecked')).toBeAttached();
});