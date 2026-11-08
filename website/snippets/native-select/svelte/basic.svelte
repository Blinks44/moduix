<script lang="ts">
  import { NativeSelect } from '@moduix/svelte/native-select';

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

<NativeSelect aria-label="Framework">
  {#each frameworkOptions as option (option.value)}
    <option value={option.value} disabled={option.disabled} selected={option.value === ''}>
      {option.label}
    </option>
  {/each}
</NativeSelect>