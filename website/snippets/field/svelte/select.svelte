<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    SelectContent,
    SelectControl,
    SelectHiddenSelect,
    SelectIndicator,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPositioner,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
  } from '@ark-ui/svelte/select';
  import { Field, FieldHelperText } from '@moduix/svelte/field';
  import styles from '@/components/examples/field/field-select.module.css';

  type Priority = { label: string; value: string };

  const priorities = createListCollection<Priority>({
    items: [
      { label: 'Low', value: 'low' },
      { label: 'Normal', value: 'normal' },
      { label: 'High', value: 'high' },
    ],
  });
</script>

<Field class={styles.root}>
  <SelectRoot collection={priorities} required name="priority">
    <SelectLabel>Priority</SelectLabel>
    <SelectControl>
      <SelectTrigger><SelectValueText placeholder="Select priority" /></SelectTrigger>
      <SelectIndicator />
    </SelectControl>
    <SelectPositioner>
      <SelectContent>
        {#each priorities.items as item (item.value)}
          <SelectItem {item}>
            <SelectItemText>{item.label}</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        {/each}
      </SelectContent>
    </SelectPositioner>
    <SelectHiddenSelect />
  </SelectRoot>
  <FieldHelperText>Used for triage queues.</FieldHelperText>
</Field>