<script lang="ts">
  import {
    Select,
    SelectContent,
    SelectField,
    SelectItem,
    SelectLabel,
    SelectList,
    SelectPositioner,
  } from '@/components/select';
  import { fruits } from '../select/fruits';
</script>

<Select collection={fruits} defaultOpen portalled={false}>
  <SelectLabel>Server fruit</SelectLabel>
  <SelectField placeholder="Select fruit" />
  <SelectPositioner>
    <SelectContent>
      <SelectList>
        {#each fruits.items as item (item.value)}
          <SelectItem {item}>{item.label}</SelectItem>
        {/each}
      </SelectList>
    </SelectContent>
  </SelectPositioner>
</Select>