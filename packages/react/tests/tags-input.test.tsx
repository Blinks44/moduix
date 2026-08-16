import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
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
    </TagsInput>
  );
}

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

test('keeps automatic form data and reset synchronization', async () => {
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

  fireEvent.reset(form);

  await waitFor(() => expect(new FormData(form).get('frameworks')).toBe('React'));
});

test('keeps automatic form data for asChild roots', () => {
  const { container } = render(
    <form>
      <TagsInput asChild defaultValue={['React']} name="frameworks">
        <section>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input />
          </TagsInput.Control>
        </section>
      </TagsInput>
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(new FormData(form).get('frameworks')).toBe('React');
  expect(container.querySelector('[data-slot="tags-input-hidden-input"]')).toHaveAttribute(
    'name',
    'frameworks',
  );
});

test('keeps automatic form data and reset synchronization for root providers', async () => {
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

  fireEvent.reset(form);

  await waitFor(() => expect(new FormData(form).get('frameworks')).toBe('React'));
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