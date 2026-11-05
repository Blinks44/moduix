<script lang="ts">
  import { RadioGroupLabel, RadioGroupRootProvider, useRadioGroup } from '@/components/radio-group';
  import RadioOptions from './RadioOptions.svelte';

  const radioGroup = useRadioGroup({ defaultValue: 'Solid' });
</script>

<RadioGroupRootProvider value={radioGroup}>
  <RadioGroupLabel>Framework</RadioGroupLabel>
  <RadioOptions />
</RadioGroupRootProvider>