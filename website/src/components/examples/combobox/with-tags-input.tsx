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
import { TagsInputClearTrigger, TagsInputControl, TagsInputInput, TagsInputItem, TagsInputItemDeleteTrigger, TagsInputItemInput, TagsInputItemPreview, TagsInputItemText, TagsInputLabel, TagsInputRootProvider, useTagsInput } from '@moduix/react/tags-input';
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
      <TagsInputRootProvider value={tagsInput}>
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          {tagsInput.value.map((item, index) => (
            <TagsInputItem key={`${item}-${index}`} index={index} value={item}>
              <TagsInputItemPreview>
                <TagsInputItemText>{item}</TagsInputItemText>
                <TagsInputItemDeleteTrigger aria-label={`Remove ${item}`} />
              </TagsInputItemPreview>
              <TagsInputItemInput />
            </TagsInputItem>
          ))}
          <ComboboxInput asChild>
            <TagsInputInput placeholder="Add framework" />
          </ComboboxInput>
          <TagsInputClearTrigger aria-label="Clear frameworks" />
        </TagsInputControl>
      </TagsInputRootProvider>
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
