<script lang="ts">
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/svelte/radio-group';
</script>

<RadioGroup defaultValue="React">
  <RadioGroupLabel>Framework</RadioGroupLabel>
  <RadioGroupOption value="React">React</RadioGroupOption>
  <RadioGroupOption disabled value="Solid">Solid</RadioGroupOption>
  <RadioGroupOption value="Vue">Vue</RadioGroupOption>
</RadioGroup>