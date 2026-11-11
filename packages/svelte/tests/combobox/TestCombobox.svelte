<script lang="ts">
  import {
    Combobox,
    ComboboxClearTrigger,
    ComboboxContent,
    ComboboxControl,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxLabel,
    ComboboxList,
    ComboboxOption,
    ComboboxPositioner,
    ComboboxStatus,
    ComboboxTrigger,
    type ComboboxRootProps,
  } from '@/components/combobox';
  import { fruits } from '../select/fruits';

  let { portalled = false, ...props }: Omit<ComboboxRootProps, 'collection'> = $props();
</script>

<form>
  <Combobox {...props} collection={fruits} defaultOpen {portalled} name="fruit">
    <ComboboxLabel>Fruit</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput />
      <ComboboxClearTrigger />
      <ComboboxTrigger aria-label="Open fruits" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxStatus>Status</ComboboxStatus>
        <ComboboxEmpty>No fruit</ComboboxEmpty>
        <ComboboxList>
          {#each fruits.items as item (item.value)}
            <ComboboxOption {item}>{item.label}</ComboboxOption>
          {/each}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</form>