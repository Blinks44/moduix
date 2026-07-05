/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useListCollection } from '@ark-ui/react/collection';
import { useCombobox } from '@ark-ui/react/combobox';
import { useFilter } from '@ark-ui/react/locale';
import { useTagsInput } from '@ark-ui/react/tags-input';
import { Combobox, TagsInput } from '@moduix/react';
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
          {tagsInput.value.map((item, index) => (
            <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
              <TagsInput.ItemPreview>
                <TagsInput.ItemText>{item}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger aria-label={`Remove ${item}`} />
              </TagsInput.ItemPreview>
              <TagsInput.ItemInput />
            </TagsInput.Item>
          ))}
          <Combobox.Input asChild>
            <TagsInput.Input placeholder="Add framework" />
          </Combobox.Input>
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No frameworks found.</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item key={item} item={item}>
              <Combobox.ItemText>{item}</Combobox.ItemText>
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.RootProvider>
  );
}

//#endregion