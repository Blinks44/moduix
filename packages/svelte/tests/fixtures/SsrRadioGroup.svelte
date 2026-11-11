<script lang="ts">
  import { RadioGroup, RadioGroupLabel } from '@/components/radio-group';
  import RadioOptions from '../radio-group/RadioOptions.svelte';
</script>

<RadioGroup defaultValue="React" name="framework">
  <RadioGroupLabel>Framework</RadioGroupLabel>
  <RadioOptions />
</RadioGroup>