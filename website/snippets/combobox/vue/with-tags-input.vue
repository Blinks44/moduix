<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import {
  useCombobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
} from '@moduix/vue/combobox';
import {
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
  useTagsInput,
} from '@moduix/vue/tags-input';
import { computed, useId } from 'vue';

const frameworkOptions = ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js'];
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: frameworkOptions,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
});
const id = useId();
const ids = { input: `${id}-input`, control: `${id}-control` };
const tagsInput = useTagsInput({ ids });
const combobox = useCombobox(
  computed(() => ({
    ids,
    collection: collection.value,
    modelValue: [],
    allowCustomValue: true,
    selectionBehavior: 'clear' as const,
    onInputValueChange: (details: { inputValue: string }) => filter(details.inputValue),
    onValueChange: (details: { value: string[] }) => {
      if (details.value[0]) tagsInput.value.addValue(details.value[0]);
    },
  })),
);
</script>

<template>
  <ComboboxRootProvider :value="combobox">
    <TagsInputRootProvider :value="tagsInput">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <ComboboxInput as-child>
          <TagsInputInput placeholder="Add framework" />
        </ComboboxInput>
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInputRootProvider>
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxOption v-for="item in collection.items" :key="item" :item="item">
          {{ item }}
        </ComboboxOption>
      </ComboboxContent>
    </ComboboxPositioner>
  </ComboboxRootProvider>
</template>