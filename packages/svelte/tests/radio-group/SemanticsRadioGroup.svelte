<script lang="ts">
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@/components/radio-group';
</script>

<RadioGroup disabled>
  <RadioGroupLabel>Disabled framework</RadioGroupLabel>
  <RadioGroupOption value="React">Disabled option</RadioGroupOption>
</RadioGroup>
<RadioGroup readOnly>
  <RadioGroupLabel>Read-only framework</RadioGroupLabel>
  <RadioGroupOption value="React">Read-only option</RadioGroupOption>
</RadioGroup>
<RadioGroup invalid required>
  <RadioGroupLabel>Required framework</RadioGroupLabel>
  <RadioGroupOption value="React">Required option</RadioGroupOption>
</RadioGroup>