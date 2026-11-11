<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { useListboxContext } from '@moduix/svelte/listbox';

  let { allValues }: { allValues: string[] } = $props();
  const listbox = useListboxContext();
  const allSelected = $derived(listbox().value.length === allValues.length);
</script>

<div>
  <output>Selected: {listbox().value.length}</output>
  <Button type="button" onclick={() => listbox().setValue(allSelected ? [] : allValues)}>
    {allSelected ? 'Clear all' : 'Select all'}
  </Button>
</div>