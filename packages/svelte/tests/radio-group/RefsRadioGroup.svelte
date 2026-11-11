<script lang="ts">
  import {
    RadioGroup,
    RadioGroupIndicator,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
    RadioGroupLabel,
  } from '@/components/radio-group';

  const refs: Record<'root' | 'label' | 'item' | 'control' | 'text' | 'indicator', Element | null> =
    $state({ root: null, label: null, item: null, control: null, text: null, indicator: null });

  export const getRefs = () => refs;
</script>

<RadioGroup bind:ref={refs.root} defaultValue="React" orientation="horizontal" data-probe="root">
  <RadioGroupLabel bind:ref={refs.label}>Framework</RadioGroupLabel>
  <RadioGroupItem bind:ref={refs.item} value="React">
    <RadioGroupItemControl bind:ref={refs.control} />
    <RadioGroupItemHiddenInput />
    <RadioGroupItemText bind:ref={refs.text}>React</RadioGroupItemText>
  </RadioGroupItem>
  <RadioGroupIndicator bind:ref={refs.indicator} />
</RadioGroup>