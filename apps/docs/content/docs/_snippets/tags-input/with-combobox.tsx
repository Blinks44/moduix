/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox, TagsInput, useCombobox, useTagsInput } from '@moduix/react';
import { useId } from 'react';

const frameworkOptions = ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js'];

export function ComboboxTagsInput() {
  const { contains } = useFilter({
    sensitivity: 'base',
  });
  const { collection, filter } = useListCollection({
    initialItems: frameworkOptions,
    filter: contains,
  });
  const id = useId();
  const inputId = `${id}-input`;
  const controlId = `${id}-control`;
  const tagsInput = useTagsInput({
    ids: {
      input: inputId,
      control: controlId,
    },
  });
  const combobox = useCombobox({
    ids: {
      input: inputId,
      control: controlId,
    },
    collection,
    value: [],
    allowCustomValue: true,
    selectionBehavior: 'clear',
    onInputValueChange: (details) => {
      filter(details.inputValue);
    },
    onValueChange: (details) => {
      if (details.value[0]) {
        tagsInput.addValue(details.value[0]);
      }
    },
  });
  return (
    <Combobox.RootProvider value={combobox}>
      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <Combobox.Input asChild>
            <TagsInput.Input placeholder="Add framework" />
          </Combobox.Input>
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput.RootProvider>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No frameworks found.</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Option key={item} item={item}>
              {item}
            </Combobox.Option>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.RootProvider>
  );
}

//#endregion