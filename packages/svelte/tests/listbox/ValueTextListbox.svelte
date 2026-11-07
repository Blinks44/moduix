<script lang="ts">
  import { Listbox, ListboxContent, ListboxValueText } from '@/components/listbox';
  import { fruits } from './fruits';

  let { custom = false, value = ['apple'] }: { custom?: boolean; value?: string[] } = $props();
</script>

{#snippet customValue()}<strong>Custom value</strong>{/snippet}

<Listbox {value} collection={fruits}>
  <ListboxContent />
  <ListboxValueText
    data-testid="value"
    class="consumer-value"
    title="Selected fruit"
    placeholder="Choose fruit"
    children={custom ? customValue : undefined}
  />
</Listbox>