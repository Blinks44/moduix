import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Combobox, useCombobox } from '@moduix/solid/combobox';
import { TagsInput, useTagsInput } from '@moduix/solid/tags-input';
import { createUniqueId, For } from 'solid-js';

const frameworkOptions = ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js'];

export default function ComboboxWithTagsInputDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: frameworkOptions,
    filter: contains,
  });
  const id = createUniqueId();
  const ids = { input: `${id}-input`, control: `${id}-control` };
  const tagsInput = useTagsInput({ ids });
  const combobox = useCombobox({
    ids,
    collection: collection(),
    value: [],
    allowCustomValue: true,
    selectionBehavior: 'clear',
    onInputValueChange: (details) => {
      filter(details.inputValue);
    },
    onValueChange: (details) => {
      if (details.value[0]) {
        tagsInput().addValue(details.value[0]);
      }
    },
  });

  return (
    <Combobox.RootProvider value={combobox}>
      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <Combobox.Input
            asChild={(props) => <TagsInput.Input {...props()} placeholder="Add framework" />}
          />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput.RootProvider>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No frameworks found.</Combobox.Empty>
          <For each={collection().items}>
            {(item) => <Combobox.Option item={item}>{item}</Combobox.Option>}
          </For>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.RootProvider>
  );
}