<script lang="ts">
  import {
    Select,
    SelectContent,
    SelectField,
    SelectItem,
    SelectItemText,
    SelectLabel,
    SelectList,
    SelectPositioner,
  } from '@/components/select';
  import { fruits } from './fruits';

  let { portalled = false }: { portalled?: boolean } = $props();
  const refs: Record<'root' | 'field' | 'item', Element | null> = $state({
    root: null,
    field: null,
    item: null,
  });

  export const getRefs = () => refs;
</script>

<Select bind:ref={refs.root} collection={fruits} defaultOpen {portalled} data-probe="root">
  <SelectLabel>Fruit</SelectLabel>
  <SelectField bind:ref={refs.field} placeholder="Select fruit" />
  <SelectPositioner>
    <SelectContent>
      <SelectList>
        <SelectItem bind:ref={refs.item} item={fruits.items[0]}>
          <SelectItemText>Apple</SelectItemText>
        </SelectItem>
        <SelectItem item={fruits.items[1]}>Mango</SelectItem>
      </SelectList>
    </SelectContent>
  </SelectPositioner>
</Select>