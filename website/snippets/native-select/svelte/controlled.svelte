<script lang="ts">
  import { NativeSelect } from '@moduix/svelte/native-select';

  const frameworkOptions = [
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

  let value = $state('react');
</script>

<NativeSelect bind:value aria-label="Framework">
  {#each frameworkOptions as option (option.value)}
    <option value={option.value}>
      {option.label}
    </option>
  {/each}
</NativeSelect>