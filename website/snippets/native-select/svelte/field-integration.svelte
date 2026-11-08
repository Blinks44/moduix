<script lang="ts">
  import { Field, FieldErrorText, FieldLabel } from '@moduix/svelte/field';
  import { NativeSelect } from '@moduix/svelte/native-select';
  import styles from '@/components/examples/native-select/native-select-field-integration.module.css';

  const frameworkOptions = [
    {
      value: '',
      label: 'Choose framework',
      disabled: true,
    },
    {
      value: 'react',
      label: 'React',
    },
    {
      value: 'vue',
      label: 'Vue',
    },
    {
      value: 'svelte',
      label: 'Svelte',
    },
  ];
</script>

<Field class={styles.root} invalid required>
  <FieldLabel>Framework</FieldLabel>
  <NativeSelect name="framework">
    {#each frameworkOptions as option (option.value)}
      <option value={option.value} disabled={option.disabled} selected={option.value === ''}>
        {option.label}
      </option>
    {/each}
  </NativeSelect>
  <FieldErrorText>Select a framework.</FieldErrorText>
</Field>