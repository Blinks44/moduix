<script lang="ts">
  import {
    ListboxContent,
    ListboxContext,
    ListboxItem,
    ListboxItemContext,
    ListboxItemText,
    ListboxRootProvider,
    useListbox,
  } from '@/components/listbox';
  import ContextValue from './ContextValue.svelte';
  import { fruits } from './fruits';

  const listbox = useListbox({ collection: fruits, defaultValue: ['mango'] });
</script>

<ListboxRootProvider value={listbox}>
  <ListboxContext>
    {#snippet render(context)}<span>{context().value.join(',')}</span>{/snippet}
  </ListboxContext>
  <ListboxContent>
    {#each fruits.items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemContext>
          {#snippet render(context)}
            <ListboxItemText>
              {context().selected ? `${item.label} selected` : item.label}
            </ListboxItemText>
          {/snippet}
        </ListboxItemContext>
      </ListboxItem>
    {/each}
  </ListboxContent>
  <ContextValue />
</ListboxRootProvider>