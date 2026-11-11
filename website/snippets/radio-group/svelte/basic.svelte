<script lang="ts">
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/svelte/radio-group';

  const frameworks = ['React', 'Solid', 'Vue'];
</script>

<RadioGroup defaultValue="React">
  <RadioGroupLabel>Framework</RadioGroupLabel>
  {#each frameworks as framework (framework)}
    <RadioGroupOption value={framework}>
      {framework}
    </RadioGroupOption>
  {/each}
</RadioGroup>