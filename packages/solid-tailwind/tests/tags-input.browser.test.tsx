import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import type { ComponentProps } from 'solid-js';
import { createSignal } from 'solid-js';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
  useTagsInput,
} from '../src';

function Tags(props: {
  defaultValue?: string[];
  name?: string;
  translations?: ComponentProps<typeof TagsInput>['translations'];
}) {
  return (
    <TagsInput
      defaultValue={props.defaultValue ?? ['React']}
      name={props.name}
      translations={props.translations}
    >
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger />
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  );
}

test('does not evaluate unused children when the clear trigger uses asChild', async () => {
  let childMounts = 0;
  function UnusedChild() {
    childMounts++;
    return <span>Unused</span>;
  }

  render(() => (
    <TagsInput defaultValue={['Solid']}>
      <TagsInputClearTrigger asChild={(props) => <button {...props()}>Clear</button>}>
        <UnusedChild />
      </TagsInputClearTrigger>
    </TagsInput>
  ));

  await expect
    .element(page.getByRole('button', { name: 'Clear all tags', exact: true }))
    .toContainText('Clear');
  expect(childMounts).toBe(0);
});

test('renders the standard item tree with stable parts and default actions', async () => {
  render(() => <Tags defaultValue={['React', 'Solid']} />);

  const root = screen.getByText('Frameworks').parentElement!;

  const hiddenInput = root.querySelector('input[hidden]');
  const itemText = root.querySelector('[data-slot="tags-input-item-text"]');
  const deleteTrigger = root.querySelector('[data-slot="tags-input-item-delete-trigger"]');

  expect(root!.getAttribute('data-scope')).toBe('tags-input');
  expect(root!.getAttribute('data-part')).toBe('root');
  expect(root!.getAttribute('data-slot')).toBe('tags-input-root');
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
  render(() => (
    <Tags
      translations={{
        clearTriggerLabel: 'Effacer tous les tags',
        deleteTagTriggerLabel: (value) => `Supprimer ${value}`,
        tagSelected: (value) => `${value} sélectionné`,
        tagAdded: (value) => `${value} ajouté`,
        tagsPasted: (values) => `${values.length} tags collés`,
        tagEdited: (value) => `${value} modifié`,
        tagUpdated: (value) => `${value} mis à jour`,
        tagDeleted: (value) => `${value} supprimé`,
      }}
    />
  ));

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
  const { container } = render(() => (
    <form>
      <Tags defaultValue={['React']} name="frameworks" />
    </form>
  ));

  const form = container.querySelector('form')!;

  await page.getByRole('textbox', { name: 'Frameworks', exact: true }).fill('Vue');
  await page.getByRole('textbox', { name: 'Frameworks', exact: true }).press('Enter');

  await expect.poll(() => new FormData(form).get('frameworks')).toBe('React, Vue');
});

test('keeps explicit form data for asChild roots', () => {
  const { container } = render(() => (
    <form>
      <TagsInput
        asChild={(props) => <section {...props()} />}
        defaultValue={['React']}
        name="frameworks"
      >
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput />
        </TagsInputControl>
        <TagsInputHiddenInput />
      </TagsInput>
    </form>
  ));

  const form = container.querySelector('form')!;

  expect(new FormData(form).get('frameworks')).toBe('React');
  expect(container.querySelector('section input[name="frameworks"]')).not.toBeNull();
});

test('keeps explicit form data for root providers', async () => {
  function ProviderTags() {
    const tagsInput = useTagsInput({ defaultValue: ['React'], name: 'frameworks' });

    return (
      <form>
        <TagsInputRootProvider value={tagsInput}>
          <TagsInputLabel>Frameworks</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput />
          </TagsInputControl>
          <TagsInputHiddenInput />
        </TagsInputRootProvider>
      </form>
    );
  }

  const { container } = render(() => <ProviderTags />);
  const form = container.querySelector('form')!;

  await page.getByRole('textbox', { name: 'Frameworks', exact: true }).fill('Vue');
  await page.getByRole('textbox', { name: 'Frameworks', exact: true }).press('Enter');

  await expect.poll(() => new FormData(form).get('frameworks')).toBe('React, Vue');
});

test('keeps the consumer in control of controlled values', async () => {
  function ControlledTags() {
    const [value, setValue] = createSignal(['React']);

    return (
      <>
        <TagsInput value={value()} onValueChange={(details) => setValue(details.value)}>
          <TagsInputLabel>Controlled frameworks</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput />
          </TagsInputControl>
        </TagsInput>
        <output>{value().join(',')}</output>
      </>
    );
  }

  render(() => <ControlledTags />);

  await page.getByRole('textbox', { name: 'Controlled frameworks', exact: true }).fill('Vue');
  await page.getByRole('textbox', { name: 'Controlled frameworks', exact: true }).press('Enter');

  await expect.element(page.getByRole('status')).toContainText('React,Vue');
});

test('forwards refs through ordinary Ark Solid part paths', () => {
  let rootRef!: HTMLDivElement;
  let labelRef!: HTMLLabelElement;
  let inputRef!: HTMLInputElement;

  render(() => (
    <TagsInput ref={(element) => (rootRef = element)}>
      <TagsInputLabel ref={(element) => (labelRef = element)}>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputInput ref={(element) => (inputRef = element)} />
      </TagsInputControl>
    </TagsInput>
  ));

  expect(rootRef!.getAttribute('data-slot')).toBe('tags-input-root');
  expect(labelRef!.getAttribute('data-slot')).toBe('tags-input-label');
  expect(inputRef!.getAttribute('data-slot')).toBe('tags-input-input');
});

test('does not forward refs through native Ark Solid root asChild composition', async () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <TagsInput
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Frameworks" />}
    >
      <TagsInputControl>
        <TagsInputInput />
      </TagsInputControl>
    </TagsInput>
  ));

  await expect
    .element(page.getByRole('region', { name: 'Frameworks', exact: true }))
    .toHaveAttribute('data-slot', 'tags-input-root');
  expect(rootRef).toBeUndefined();
});

test('lets consumer utilities replace defaults and keeps visual parts visible', async () => {
  const { container } = render(() => (
    <TagsInput class="w-80" defaultValue={['React']}>
      <TagsInputLabel>Styled frameworks</TagsInputLabel>
      <TagsInputControl class="rounded-lg">
        <TagsInputItems />
        <TagsInputInput class="h-8" />
        <TagsInputClearTrigger class="size-5" aria-label="Clear styled frameworks" />
      </TagsInputControl>
    </TagsInput>
  ));

  const root = container.querySelector('[data-slot="tags-input-root"]')!;
  const control = container.querySelector('[data-slot="tags-input-control"]')!;
  const input = container.querySelector('[data-slot="tags-input-input"]')!;
  const itemPreview = container.querySelector('[data-slot="tags-input-item-preview"]')!;
  const deleteTrigger = container.querySelector('[data-slot="tags-input-item-delete-trigger"]')!;
  const clearTrigger = container.querySelector('[data-slot="tags-input-clear-trigger"]')!;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80']));
  expect(root!.classList.contains('w-full')).toBe(false);
  expect([...control!.classList]).toEqual(expect.arrayContaining(['rounded-lg']));
  expect(control!.classList.contains('rounded-md')).toBe(false);
  expect([...input!.classList]).toEqual(expect.arrayContaining(['h-8']));
  expect(input!.classList.contains('h-control-xs')).toBe(false);
  expect([...itemPreview!.classList]).toEqual(expect.arrayContaining(['bg-secondary']));
  expect([...deleteTrigger!.classList]).toEqual(expect.arrayContaining(['size-4']));
  expect([...clearTrigger!.classList]).toEqual(expect.arrayContaining(['size-5']));
  expect(clearTrigger!.classList.contains('size-control-xs')).toBe(false);
  await expect.element(page.locator('[data-slot="tags-input-root"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="tags-input-input"]')).toHaveCSS('height', '32px');
  await expect
    .element(page.locator('[data-slot="tags-input-clear-trigger"]'))
    .toHaveCSS('width', '20px');
});

test('keeps consumer-owned styles on an asChild clear trigger', async () => {
  const { container } = render(() => (
    <TagsInput defaultValue={['React']}>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput />
      </TagsInputControl>
      <TagsInputClearTrigger
        asChild={(props) => (
          <button {...props()} class={`${props().class} h-9 rounded-lg`} type="button">
            Clear all tags
          </button>
        )}
      />
    </TagsInput>
  ));

  const clearTrigger = container.querySelector('[data-slot="tags-input-clear-trigger"]')!;

  expect([...clearTrigger!.classList]).toEqual(expect.arrayContaining(['h-9', 'rounded-lg']));
  expect(
    ['size-control-xs', 'rounded-sm'].some((name) => clearTrigger!.classList.contains(name)),
  ).toBe(false);
  await expect
    .element(page.locator('[data-slot="tags-input-clear-trigger"]'))
    .toHaveCSS('height', '36px');
});