<script lang="ts">
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/svelte/radio-group';
  import { Stack } from '@moduix/svelte/stack';

  const frameworks = ['React', 'Solid', 'Vue'];
  let value = $state<string | null>(null);
</script>

<Stack align="center" gap="2">
  <RadioGroup bind:value>
    <RadioGroupLabel>Framework</RadioGroupLabel>
    {#each frameworks as framework (framework)}
      <RadioGroupOption value={framework}>
        {framework}
      </RadioGroupOption>
    {/each}
  </RadioGroup>
  <output>Selected: {value ?? 'none'}</output>
</Stack>