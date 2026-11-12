<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Button } from '@moduix/svelte/button';
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
  import styles from '@/components/examples/select/select-form-usage.module.css';

  const themes = createListCollection({
    items: [
      { label: 'System', value: 'system' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
  });
  let submitted = $state('Nothing submitted');
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    submitted = String(new FormData(event.currentTarget as HTMLFormElement).get('theme') ?? '');
  }
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <Select collection={themes} name="theme" required>
    <SelectLabel>Theme</SelectLabel>
    <SelectControl>
      <SelectTrigger><SelectValueText placeholder="Select theme" /></SelectTrigger>
      <SelectIndicator />
      <SelectClearTrigger aria-label="Clear selection" />
    </SelectControl>
    <SelectPositioner>
      <SelectContent>
        {#each themes.items as item (item.value)}
          <SelectOption {item}>{item.label}</SelectOption>
        {/each}
      </SelectContent>
    </SelectPositioner>
    <SelectHiddenSelect />
  </Select>
  <div data-preview-meta>
    <output>Submitted: {submitted}</output><Button type="submit" size="sm">Submit</Button>
  </div>
</form>