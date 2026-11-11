<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Select,
    SelectContent,
    SelectField,
    SelectLabel,
    SelectOption,
    SelectPositioner,
  } from '@moduix/svelte/select';

  const languages = [
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Rust', value: 'rust' },
    { label: 'TypeScript', value: 'typescript' },
  ];
  let value = $state(['javascript']);
  const collection = $derived(
    createListCollection({
      items: languages.map((item) => ({
        ...item,
        disabled: value.length >= 3 && !value.includes(item.value),
      })),
    }),
  );
  const setValue = (next: string[]) => {
    if (next.length <= 3) value = next;
  };
</script>

<Select bind:value={() => value, setValue} {collection} multiple>
  <SelectLabel>Languages</SelectLabel>
  <SelectField placeholder="Select up to 3" clearLabel="Clear selection" />
  <SelectPositioner>
    <SelectContent>
      {#each collection.items as item (item.value)}
        <SelectOption {item}>{item.label}</SelectOption>
      {/each}
    </SelectContent>
  </SelectPositioner>
</Select>