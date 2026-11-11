<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
  import { Fieldset, FieldsetLegend } from '@moduix/svelte/fieldset';
  import styles from '@/components/examples/fieldset/fieldset-checkbox.module.css';

  const preferences = [
    { label: 'Product updates', value: 'product' },
    { label: 'Marketing emails', value: 'marketing' },
  ];
</script>

<Fieldset class={styles.root}>
  <FieldsetLegend>Email preferences</FieldsetLegend>
  <CheckboxGroup>
    {#each preferences as preference (preference.value)}
      <Checkbox value={preference.value}>
        <CheckboxControl />
        <CheckboxLabel>{preference.label}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    {/each}
  </CheckboxGroup>
</Fieldset>