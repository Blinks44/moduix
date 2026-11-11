<script lang="ts">
  import {
    Select,
    SelectContent,
    SelectField,
    SelectHiddenSelect,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectList,
    SelectPositioner,
    type SelectRootProps,
  } from '@/components/select';
  import { fruits } from './fruits';

  let {
    defaultOpen = true,
    portalled = false,
    value = $bindable(),
    ...props
  }: Omit<SelectRootProps, 'collection'> = $props();
</script>

<Select {...props} collection={fruits} {defaultOpen} {portalled} bind:value name="fruit">
  <SelectLabel>Fruit</SelectLabel>
  <SelectField placeholder="Select fruit" clearLabel="Clear fruit" />
  <SelectPositioner>
    <SelectContent>
      <SelectList>
        {#each fruits.items as item (item.value)}
          <SelectItem {item}>
            <SelectItemText>{item.label}</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        {/each}
      </SelectList>
    </SelectContent>
  </SelectPositioner>
  <SelectHiddenSelect />
</Select>