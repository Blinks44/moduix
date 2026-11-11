import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildFormTags from './tags-input/AsChildFormTags.svelte';
import ContextTags from './tags-input/ContextTags.svelte';
import ControlledTags from './tags-input/ControlledTags.svelte';
import FormTags from './tags-input/FormTags.svelte';
import ProviderTags from './tags-input/ProviderTags.svelte';
import RefsTags from './tags-input/RefsTags.svelte';
import Tags from './tags-input/Tags.svelte';
import TranslatedTags from './tags-input/TranslatedTags.svelte';

test('renders the standard item tree with stable parts and default actions', async () => {
  render(Tags, { props: { defaultValue: ['React', 'Solid'] } });

  const root = screen.getByText('Frameworks').parentElement!;

  const hiddenInput = root.querySelector('input[hidden]');
  const itemText = root.querySelector('[data-slot="tags-input-item-text"]');
  const deleteTrigger = root.querySelector('[data-slot="tags-input-item-delete-trigger"]');

  expect(root.getAttribute('data-scope')).toBe('tags-input');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('tags-input-root');
  await expect
    .element(page.getByRole('textbox', { name: 'Frameworks', exact: true }))
    .toHaveAttribute('data-part', 'input');
  await expect
    .element(page.getByRole('textbox', { name: 'Frameworks', exact: true }))
    .toHaveAttribute('data-slot', 'tags-input-input');
  expect(hiddenInput!.hasAttribute('hidden')).toBe(true);
  expect(itemText!.getAttribute('data-part')).toBe('item-text');
  expect(deleteTrigger!.getAttribute('data-part')).toBe('item-delete-trigger');
  expect(deleteTrigger?.querySelector('svg')).not.toBeNull();
  const clearTriggerLocator = page.getByRole('button', { name: 'Clear all tags', exact: true });
  await expect.element(clearTriggerLocator).toHaveAttribute('data-scope', 'tags-input');
  await expect.element(clearTriggerLocator).toHaveAttribute('data-part', 'clear-trigger');
  await expect
    .element(clearTriggerLocator)
    .toHaveAttribute('data-slot', 'tags-input-clear-trigger');
});

test('keeps Ark translations and anatomy on default actions', async () => {
  render(TranslatedTags);

  await expect
    .element(page.getByRole('button', { name: 'Supprimer React', exact: true }))
    .toBeVisible();

  const clearTriggerLocator = page.getByRole('button', {
    name: 'Effacer tous les tags',
    exact: true,
  });
  await expect.element(clearTriggerLocator).toHaveAttribute('data-scope', 'tags-input');
  await expect.element(clearTriggerLocator).toHaveAttribute('data-part', 'clear-trigger');
  await expect
    .element(clearTriggerLocator)
    .toHaveAttribute('data-slot', 'tags-input-clear-trigger');
});

test('submits through an explicit Ark hidden input', async () => {
  const { container } = render(FormTags);

  const form = container.querySelector('form')!;
  await page.getByRole('button', { name: 'Clear all tags', exact: true }).click();

  await expect.poll(() => new FormData(form).get('frameworks')).toBe('');
});

test('keeps explicit form data for asChild roots', () => {
  const { container } = render(AsChildFormTags);
  const form = container.querySelector('form')!;

  expect(new FormData(form).get('frameworks')).toBe('React');
  expect(container.querySelector('section input[name="frameworks"]')).not.toBeNull();
});

test('keeps explicit form data for root providers', async () => {
  const { component, container } = render(ProviderTags);
  const form = container.querySelector('form')!;
  component.addValue('Vue');

  await expect.poll(() => new FormData(form).get('frameworks')).toBe('React, Vue');
});

test('forwards Svelte refs through ordinary and asChild Ark paths', async () => {
  const { component } = render(RefsTags);
  const refs = component.getRefs();

  expect(refs.root!.getAttribute('data-slot')).toBe('tags-input-root');
  expect(refs.label!.getAttribute('data-slot')).toBe('tags-input-label');
  expect(refs.input!.getAttribute('data-slot')).toBe('tags-input-input');
  expect(refs.asChildRoot!.getAttribute('data-slot')).toBe('tags-input-root');
  await expect
    .element(page.getByRole('region', { name: 'Composed frameworks', exact: true }))
    .toHaveAttribute('data-slot', 'tags-input-root');
});

test('keeps context snippets connected to the root and item state', async () => {
  render(ContextTags);
  await expect.element(page.getByText('Tags: React')).toBeAttached();
  await expect.element(page.getByText('Highlighted: false')).toBeAttached();
});

test('keeps the consumer in control of bound values and forwards value details once', async () => {
  const details: string[][] = [];
  render(ControlledTags, { props: { details } });
  await page.getByRole('button', { name: 'Clear frameworks', exact: true }).click();

  await expect.poll(() => details).toEqual([[]]);
});