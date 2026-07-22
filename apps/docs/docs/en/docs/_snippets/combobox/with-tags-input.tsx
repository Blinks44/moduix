import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox, TagsInput, useCombobox, useTagsInput } from '@moduix/react';
import { useId } from 'react';

const frameworkOptions = ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js'];

export default function ComboboxWithTagsInputDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: frameworkOptions,
    filter: contains,
  });
  const id = useId();
  const ids = { input: `${id}-input`, control: `${id}-control` };
  const tagsInput = useTagsInput({ ids });
  const combobox = useCombobox({
    ids,
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