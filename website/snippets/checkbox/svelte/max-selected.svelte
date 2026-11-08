<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';

  const options = [
    { value: 'react', label: 'React' },
    { value: 'solid', label: 'Solid' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ];
  const defaultValue = ['react', 'solid'];
</script>

<CheckboxGroup {defaultValue} maxSelectedValues={2} name="frameworks">
  {#each options as option (option.value)}
    <Checkbox value={option.value}>
      <CheckboxControl />
      <CheckboxLabel>{option.label}</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  {/each}
</CheckboxGroup>