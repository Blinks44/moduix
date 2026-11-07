<script lang="ts">
  import {
    Combobox,
    ComboboxContent,
    ComboboxControl,
    ComboboxInput,
    ComboboxLabel,
    ComboboxList,
    ComboboxOption,
    ComboboxPositioner,
    ComboboxTrigger,
  } from '@/components/combobox';
  import { fruits } from '../select/fruits';

  const refs: Record<'root' | 'input' | 'item', Element | null> = $state({
    root: null,
    input: null,
    item: null,
  });

  export const getRefs = () => refs;
</script>

<form>
  <Combobox
    bind:ref={refs.root}
    collection={fruits}
    defaultOpen
    defaultValue={['apple']}
    portalled={false}
    name="fruit"
  >
    <ComboboxLabel>Fruit</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput bind:ref={refs.input} data-probe="input" />
      <ComboboxTrigger aria-label="Open fruits" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxOption bind:ref={refs.item} item={fruits.items[0]}>Apple</ComboboxOption>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</form>