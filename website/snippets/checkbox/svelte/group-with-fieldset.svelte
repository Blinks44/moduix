<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
  import { Fieldset, FieldsetLegend } from '@moduix/svelte/fieldset';
  import styles from '@/components/examples/checkbox/checkbox-group-with-fieldset.module.css';

  const options = [
    { value: 'react', label: 'React' },
    { value: 'solid', label: 'Solid' },
    { value: 'vue', label: 'Vue' },
  ];

  const defaultValue = ['react'];
</script>

<Fieldset class={styles.root}>
  <FieldsetLegend>Frameworks</FieldsetLegend>
  <CheckboxGroup {defaultValue} name="frameworks">
    {#each options as option (option.value)}
      <Checkbox value={option.value}>
        <CheckboxControl />
        <CheckboxLabel>{option.label}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    {/each}
  </CheckboxGroup>
</Fieldset>