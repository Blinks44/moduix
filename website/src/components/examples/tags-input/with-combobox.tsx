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
import { TagsInputClearTrigger, TagsInputControl, TagsInputInput, TagsInputItems, TagsInputLabel, TagsInputRootProvider, useTagsInput } from '@moduix/react/tags-input';
import { useId } from 'react';
import styles from '@/components/examples/tags-input/tags-input-with-combobox.module.css';

const frameworkOptions = ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js'];

export default function ComboboxTagsInput() {
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
    <ComboboxRootProvider className={styles.root} value={combobox}>
      <TagsInputRootProvider value={tagsInput}>
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
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
