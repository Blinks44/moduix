<script lang="ts">
  import {
    ComboboxContent,
    ComboboxContext,
    ComboboxControl,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemContext,
    ComboboxItemText,
    ComboboxLabel,
    ComboboxList,
    ComboboxPositioner,
    ComboboxRootProvider,
    useCombobox,
  } from '@/components/combobox';
  import { fruits } from '../select/fruits';
  import ItemState from './ItemState.svelte';
  import RootState from './RootState.svelte';

  const combobox = useCombobox({ collection: fruits, defaultOpen: true });
</script>

<ComboboxRootProvider value={combobox} portalled={false}>
  <RootState />
  <ComboboxContext>
    {#snippet render(context)}
      <output>{context().open ? 'Open slot' : 'Closed slot'}</output>
    {/snippet}
  </ComboboxContext>
  <ComboboxLabel>Provider fruit</ComboboxLabel>
  <ComboboxControl><ComboboxInput /></ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxList>
        <ComboboxItem item={fruits.items[0]}>
          <ComboboxItemText>Apple <ItemState /></ComboboxItemText>
          <ComboboxItemContext>
            {#snippet render(context)}
              <span>{context().highlighted ? 'Highlighted slot' : 'Not highlighted slot'}</span>
            {/snippet}
          </ComboboxItemContext>
        </ComboboxItem>
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</ComboboxRootProvider>