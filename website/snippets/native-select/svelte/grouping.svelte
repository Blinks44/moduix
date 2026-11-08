<script lang="ts">
  import { NativeSelect } from '@moduix/svelte/native-select';

  const groups = [
    { label: 'Frontend', options: ['React', 'Solid', 'Vue'] },
    { label: 'Backend', options: ['Node.js', 'Go', 'Rust'] },
  ];
</script>

<NativeSelect aria-label="Technology">
  {#each groups as group (group.label)}
    <optgroup label={group.label}>
      {#each group.options as option (option)}
        <option value={option}>
          {option}
        </option>
      {/each}
    </optgroup>
  {/each}
</NativeSelect>