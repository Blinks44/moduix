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

  const selectedFrameworks = ['react', 'vue'];
</script>

<NativeSelect multiple size={3} aria-label="Frameworks">
  {#each frameworkOptions as option (option.value)}
    <option value={option.value} selected={selectedFrameworks.includes(option.value)}>
      {option.label}
    </option>
  {/each}
</NativeSelect>