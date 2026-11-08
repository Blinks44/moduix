<script lang="ts">
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/svelte/radio-group';

  const frameworks = ['React', 'Solid', 'Vue'];
</script>

<RadioGroup defaultValue="Solid">
  <RadioGroupLabel>Framework</RadioGroupLabel>
  {#each frameworks as framework (framework)}
    <RadioGroupOption value={framework}>
      {framework}
    </RadioGroupOption>
  {/each}
</RadioGroup>