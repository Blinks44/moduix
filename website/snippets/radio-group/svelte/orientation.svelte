<script lang="ts">
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/svelte/radio-group';
  import { Stack } from '@moduix/svelte/stack';

  const frameworks = ['React', 'Solid', 'Vue'];
</script>

<RadioGroup orientation="horizontal" defaultValue="React">
  <RadioGroupLabel>Framework</RadioGroupLabel>
  <Stack direction="row" wrap="wrap" gap="2">
    {#each frameworks as framework (framework)}
      <RadioGroupOption value={framework}>
        {framework}
      </RadioGroupOption>
    {/each}
  </Stack>
</RadioGroup>