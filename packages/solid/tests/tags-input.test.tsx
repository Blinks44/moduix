import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import type { ComponentProps } from 'solid-js';
import { createSignal } from 'solid-js';
import { TagsInput, TagsInputClearTrigger, TagsInputControl, TagsInputHiddenInput, TagsInputInput, TagsInputItems, TagsInputLabel, TagsInputRootProvider, useTagsInput } from '../src';

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

test('renders the standard item tree with stable parts and default actions', () => {
  render(() => <Tags defaultValue={['React', 'Solid']} />);

  const root = screen.getByText('Frameworks').parentElement!;
  const input = screen.getByRole('textbox', { name: 'Frameworks' }) as HTMLInputElement;
  const hiddenInput = root.querySelector('input[hidden]');
  const itemText = root.querySelector('[data-slot="tags-input-item-text"]');
  const deleteTrigger = root.querySelector('[data-slot="tags-input-item-delete-trigger"]');
  const clearTrigger = screen.getByRole('button', { name: 'Clear all tags' });

  expect(root).toHaveAttribute('data-scope', 'tags-input');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'tags-input-root');
  expect(input).toHaveAttribute('data-part', 'input');
  expect(input).toHaveAttribute('data-slot', 'tags-input-input');
  expect(hiddenInput).toHaveAttribute('hidden');
  expect(itemText).toHaveAttribute('data-part', 'item-text');
  expect(deleteTrigger).toHaveAttribute('data-part', 'item-delete-trigger');
  expect(deleteTrigger?.querySelector('svg')).not.toBeNull();
  expect(clearTrigger).toHaveAttribute('data-scope', 'tags-input');
  expect(clearTrigger).toHaveAttribute('data-part', 'clear-trigger');
  expect(clearTrigger).toHaveAttribute('data-slot', 'tags-input-clear-trigger');
});

test('keeps Ark translations and anatomy on default actions', () => {
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

  expect(screen.getByRole('button', { name: 'Supprimer React' })).toBeVisible();

  const clearTrigger = screen.getByRole('button', { name: 'Effacer tous les tags' });
  expect(clearTrigger).toHaveAttribute('data-scope', 'tags-input');
  expect(clearTrigger).toHaveAttribute('data-part', 'clear-trigger');
  expect(clearTrigger).toHaveAttribute('data-slot', 'tags-input-clear-trigger');
});

test('submits through an explicit Ark hidden input', async () => {
  const { container } = render(() => (
    <form>
      <Tags defaultValue={['React']} name="frameworks" />
    </form>
  ));

  const form = container.querySelector('form')!;
  const input = screen.getByRole('textbox', { name: 'Frameworks' }) as HTMLInputElement;

  fireEvent.focusIn(input);
  await Promise.resolve();
  input.value = 'Vue';
  input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
  await Promise.resolve();
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(new FormData(form).get('frameworks')).toBe('React, Vue'));
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
  expect(container.querySelector('section input[hidden]')).not.toBeNull();
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
  const input = screen.getByRole('textbox', { name: 'Frameworks' }) as HTMLInputElement;

  fireEvent.focusIn(input);
  await Promise.resolve();
  input.value = 'Vue';
  input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
  await Promise.resolve();
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(new FormData(form).get('frameworks')).toBe('React, Vue'));
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

  const input = screen.getByRole('textbox', { name: 'Controlled frameworks' }) as HTMLInputElement;
  fireEvent.focusIn(input);
  await Promise.resolve();
  input.value = 'Vue';
  input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
  await Promise.resolve();
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('React,Vue'));
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

  expect(rootRef).toHaveAttribute('data-slot', 'tags-input-root');
  expect(labelRef).toHaveAttribute('data-slot', 'tags-input-label');
  expect(inputRef).toHaveAttribute('data-slot', 'tags-input-input');
});

test('does not forward refs through native Ark Solid root asChild composition', () => {
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

  expect(screen.getByRole('region', { name: 'Frameworks' })).toHaveAttribute(
    'data-slot',
    'tags-input-root',
  );
  expect(rootRef).toBeUndefined();
});
