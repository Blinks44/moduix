<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
  import { Stack } from '@moduix/svelte/stack';

  const options = [
    { value: 'react', label: 'React' },
    { value: 'solid', label: 'Solid' },
    { value: 'vue', label: 'Vue' },
  ];
  let value = $state(['react']);
  const allValues = options.map((option) => option.value);
  const allSelected = $derived(value.length === allValues.length);
  const indeterminate = $derived(value.length > 0 && value.length < allValues.length);
</script>

<Stack gap="2">
  <Checkbox
    checked={indeterminate ? 'indeterminate' : allSelected}
    onCheckedChange={(details) => (value = details.checked === true ? allValues : [])}
  >
    <CheckboxControl />
    <CheckboxLabel>Select all</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
  <CheckboxGroup bind:value name="frameworks">
    {#each options as option (option.value)}
      <Checkbox value={option.value}>
        <CheckboxControl />
        <CheckboxLabel>{option.label}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    {/each}
  </CheckboxGroup>
</Stack>