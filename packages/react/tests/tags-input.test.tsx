import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { createRef, useState } from 'react';
import { TagsInput, useTagsInput } from '../src';

function Tags({
  defaultValue = ['React'],
  name,
  translations,
}: {
  defaultValue?: string[];
  name?: string;
  translations?: ComponentProps<typeof TagsInput>['translations'];
}) {
  return (
    <TagsInput defaultValue={defaultValue} name={name} translations={translations}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

test('renders the standard item tree with stable parts and default actions', () => {
  render(<Tags defaultValue={['React', 'Solid']} />);

  const root = screen.getByText('Frameworks').parentElement!;
  const input = screen.getByRole('textbox', { name: 'Frameworks' });
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
  render(
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
    />,
  );

  expect(screen.getByRole('button', { name: 'Supprimer React' })).toBeVisible();

  const clearTrigger = screen.getByRole('button', { name: 'Effacer tous les tags' });
  expect(clearTrigger).toHaveAttribute('data-scope', 'tags-input');
  expect(clearTrigger).toHaveAttribute('data-part', 'clear-trigger');
  expect(clearTrigger).toHaveAttribute('data-slot', 'tags-input-clear-trigger');
});

test('submits through an explicit Ark hidden input', async () => {
  const { container } = render(
    <form>
      <Tags defaultValue={['React']} name="frameworks" />
    </form>,
  );

  const form = container.querySelector('form')!;
  const input = screen.getByRole('textbox', { name: 'Frameworks' });

  fireEvent.focus(input);
  await Promise.resolve();
  fireEvent.input(input, { inputType: 'insertText', target: { value: 'Vue' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(new FormData(form).get('frameworks')).toBe('React, Vue'));
});

test('keeps explicit form data for asChild roots', () => {
  const { container } = render(
    <form>
      <TagsInput asChild defaultValue={['React']} name="frameworks">
        <section>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </section>
      </TagsInput>
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(new FormData(form).get('frameworks')).toBe('React');
  expect(container.querySelector('section input[name="frameworks"]')).not.toBeNull();
});

test('keeps explicit form data for root providers', async () => {
  function ProviderTags() {
    const tagsInput = useTagsInput({ defaultValue: ['React'], name: 'frameworks' });

    return (
      <form>
        <TagsInput.RootProvider value={tagsInput}>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.RootProvider>
      </form>
    );
  }

  const { container } = render(<ProviderTags />);
  const form = container.querySelector('form')!;
  const input = screen.getByRole('textbox', { name: 'Frameworks' });

  fireEvent.focus(input);
  await Promise.resolve();
  fireEvent.input(input, { inputType: 'insertText', target: { value: 'Vue' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(new FormData(form).get('frameworks')).toBe('React, Vue'));
});

test('keeps the consumer in control of controlled values', async () => {
  function ControlledTags() {
    const [value, setValue] = useState(['React']);

    return (
      <>
        <TagsInput value={value} onValueChange={(details) => setValue(details.value)}>
          <TagsInput.Label>Controlled frameworks</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input />
          </TagsInput.Control>
        </TagsInput>
        <output>{value.join(',')}</output>
      </>
    );
  }

  render(<ControlledTags />);

  const input = screen.getByRole('textbox', { name: 'Controlled frameworks' });
  fireEvent.focus(input);
  await Promise.resolve();
  fireEvent.input(input, { inputType: 'insertText', target: { value: 'Vue' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('React,Vue'));
});

test('forwards refs through ordinary Ark React part paths', () => {
  const rootRef = createRef<HTMLDivElement>();
  const labelRef = createRef<HTMLLabelElement>();
  const inputRef = createRef<HTMLInputElement>();

  render(
    <TagsInput ref={rootRef}>
      <TagsInput.Label ref={labelRef}>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Input ref={inputRef} />
      </TagsInput.Control>
    </TagsInput>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'tags-input-root');
  expect(labelRef.current).toHaveAttribute('data-slot', 'tags-input-label');
  expect(inputRef.current).toHaveAttribute('data-slot', 'tags-input-input');
});