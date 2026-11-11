<script lang="ts">
  import {
    RadioGroupContext,
    RadioGroupItem,
    RadioGroupItemContext,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
    RadioGroupRootProvider,
    useRadioGroup,
  } from '@/components/radio-group';

  const radioGroup = useRadioGroup({ defaultValue: 'React' });
</script>

<RadioGroupRootProvider value={radioGroup}>
  <RadioGroupContext>
    {#snippet render(context)}
      <output>Selected: {context().value}</output>
    {/snippet}
  </RadioGroupContext>
  <RadioGroupItem value="React">
    <RadioGroupItemControl />
    <RadioGroupItemHiddenInput />
    <RadioGroupItemText>React</RadioGroupItemText>
    <RadioGroupItemContext>
      {#snippet render(context)}
        <span>{context().checked ? 'Checked' : 'Unchecked'}</span>
      {/snippet}
    </RadioGroupItemContext>
  </RadioGroupItem>
  <RadioGroupItem value="Solid">
    <RadioGroupItemControl />
    <RadioGroupItemHiddenInput />
    <RadioGroupItemText>Solid</RadioGroupItemText>
  </RadioGroupItem>
</RadioGroupRootProvider>
<button type="button" onclick={() => radioGroup().setValue('Solid')}>Set Solid</button>