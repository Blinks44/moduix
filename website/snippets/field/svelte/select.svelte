<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Field, FieldHelperText } from '@moduix/svelte/field';
  import {
    Select,
    SelectContent,
    SelectControl,
    SelectHiddenSelect,
    SelectIndicator,
    SelectLabel,
    SelectOption,
    SelectPositioner,
    SelectTrigger,
    SelectValueText,
  } from '@moduix/svelte/select';
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
  <Select collection={priorities} required name="priority">
    <SelectLabel>Priority</SelectLabel>
    <SelectControl>
      <SelectTrigger><SelectValueText placeholder="Select priority" /></SelectTrigger>
      <SelectIndicator />
    </SelectControl>
    <SelectPositioner>
      <SelectContent>
        {#each priorities.items as item (item.value)}
          <SelectOption {item}>{item.label}</SelectOption>
        {/each}
      </SelectContent>
    </SelectPositioner>
    <SelectHiddenSelect />
  </Select>
  <FieldHelperText>Used for triage queues.</FieldHelperText>
</Field>