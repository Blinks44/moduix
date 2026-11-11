<script lang="ts">
  import {
    RadioGroup,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
    RadioGroupLabel,
  } from '@moduix/svelte/radio-group';

  const frameworks = ['React', 'Solid', 'Vue'];
</script>

<RadioGroup defaultValue="React">
  <RadioGroupLabel>Framework</RadioGroupLabel>
  {#each frameworks as framework (framework)}
    <RadioGroupItem value={framework}>
      <RadioGroupItemControl />
      <RadioGroupItemText>{framework}</RadioGroupItemText>
      <RadioGroupItemHiddenInput />
    </RadioGroupItem>
  {/each}
</RadioGroup>