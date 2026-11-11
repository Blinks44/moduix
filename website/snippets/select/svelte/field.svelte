<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Field, FieldHelperText } from '@moduix/svelte/field';
  import {
    Select,
    SelectClearTrigger,
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
  import styles from '@/components/examples/select/select-field.module.css';

  const frameworks = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte', disabled: true },
    ],
  });
</script>

<Field class={styles.root} required>
  <Select collection={frameworks} name="framework">
    <SelectLabel>Framework</SelectLabel>
    <SelectControl>
      <SelectTrigger><SelectValueText placeholder="Select framework" /></SelectTrigger>
      <SelectClearTrigger aria-label="Clear selection" />
      <SelectIndicator />
    </SelectControl>
    <SelectPositioner>
      <SelectContent>
        {#each frameworks.items as item (item.value)}
          <SelectOption {item}>{item.label}</SelectOption>
        {/each}
      </SelectContent>
    </SelectPositioner>
    <SelectHiddenSelect />
  </Select>
  <FieldHelperText>Pick the framework used by this project.</FieldHelperText>
</Field>