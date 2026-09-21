import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import {
  useCombobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
} from '@moduix/react/combobox';
import { TagsInput, useTagsInput } from '@moduix/react/tags-input';
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
    <ComboboxRootProvider value={combobox}>
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
          <ComboboxInput asChild>
            <TagsInput.Input placeholder="Add framework" />
          </ComboboxInput>
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput.RootProvider>
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          {collection.items.map((item) => (
            <ComboboxOption key={item} item={item}>
              {item}
            </ComboboxOption>
          ))}
        </ComboboxContent>
      </ComboboxPositioner>
    </ComboboxRootProvider>
  );
}