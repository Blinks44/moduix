<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import {
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxOption,
    ComboboxPositioner,
    ComboboxRootProvider,
    useCombobox,
  } from '@moduix/svelte/combobox';
  import {
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
    TagsInputRootProvider,
    useTagsInput,
  } from '@moduix/svelte/tags-input';

  const frameworkOptions = ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js'];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: frameworkOptions,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
  });
  const id = $props.id();
  const ids = { input: `${id}-input`, control: `${id}-control` };
  const tagsInput = useTagsInput({ id, ids });
  const combobox = useCombobox(() => ({
    id: `${id}-combobox`,
    ids,
    collection: collection(),
    value: [],
    allowCustomValue: true,
    selectionBehavior: 'clear' as const,
    onInputValueChange: (details: { inputValue: string }) => filter(details.inputValue),
    onValueChange: (details: { value: string[] }) => {
      if (details.value[0]) tagsInput().addValue(details.value[0]);
    },
  }));
</script>

<ComboboxRootProvider value={combobox}>
  <TagsInputRootProvider value={tagsInput}>
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <ComboboxInput>
        {#snippet asChild(props)}
          <TagsInputInput {...props()} placeholder="Add framework" />
        {/snippet}
      </ComboboxInput>
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
  </TagsInputRootProvider>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      {#each collection().items as item (item)}
        <ComboboxOption {item}>{item}</ComboboxOption>
      {/each}
    </ComboboxContent>
  </ComboboxPositioner>
</ComboboxRootProvider>