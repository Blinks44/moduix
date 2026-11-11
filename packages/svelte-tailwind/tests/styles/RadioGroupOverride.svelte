<script lang="ts">
  import {
    RadioGroup,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
    RadioGroupLabel,
  } from '@/components/radio-group';
</script>

<RadioGroup class="gap-4 text-primary" data-testid="root">
  <RadioGroupLabel>Framework</RadioGroupLabel>
  <RadioGroupItem class="grid w-56" value="React" data-testid="item">
    <RadioGroupItemControl
      class="size-6 border-primary bg-muted before:size-3"
      data-testid="control"
    />
    <RadioGroupItemHiddenInput />
    <RadioGroupItemText>React</RadioGroupItemText>
  </RadioGroupItem>
</RadioGroup>