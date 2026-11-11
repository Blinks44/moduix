<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Button } from '@moduix/svelte/button';
  import {
    SelectContent,
    SelectField,
    SelectLabel,
    SelectOption,
    SelectPositioner,
    SelectRootProvider,
    useSelect,
  } from '@moduix/svelte/select';
  import styles from '@/components/examples/select/select-select-all.module.css';

  const languages = createListCollection({
    items: [
      { label: 'C#', value: 'csharp' },
      { label: 'Go', value: 'go' },
      { label: 'JavaScript', value: 'javascript' },
      { label: 'Python', value: 'python' },
      { label: 'Rust', value: 'rust' },
      { label: 'TypeScript', value: 'typescript' },
    ],
  });
  const id = $props.id();
  const select = useSelect({ id, collection: languages, multiple: true });
  function selectAll() {
    select().selectAll();
    select().setOpen(false);
  }
</script>

<div class={styles.root}>
  <SelectRootProvider value={select}>
    <SelectLabel>Languages</SelectLabel>
    <SelectField placeholder="Select languages" clearLabel="Clear selection" />
    <SelectPositioner>
      <SelectContent>
        {#each languages.items as item (item.value)}
          <SelectOption {item}>{item.label}</SelectOption>
        {/each}
      </SelectContent>
    </SelectPositioner>
  </SelectRootProvider>
  <div>
    <output>Selected: {select().value.length}</output>
    <Button type="button" size="sm" onclick={selectAll}>Select all</Button>
  </div>
</div>