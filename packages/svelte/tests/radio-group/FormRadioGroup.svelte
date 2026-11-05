<script lang="ts">
  import { RadioGroup, RadioGroupLabel } from '@/components/radio-group';
  import RadioOptions from './RadioOptions.svelte';
</script>

<form data-testid="form">
  <RadioGroup defaultValue="React" name="framework">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioOptions />
  </RadioGroup>
</form>