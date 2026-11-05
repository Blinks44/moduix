<script lang="ts">
  import {
    RadioGroup,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
  } from '@/components/radio-group';

  let itemRef: Element | null = $state(null);

  export const getItemRef = () => itemRef;
</script>

<RadioGroup defaultValue="React">
  <RadioGroupItem bind:ref={itemRef} class="grid w-56" value="React">
    {#snippet asChild(props)}
      <label {...props()} data-testid="custom-item">
        <RadioGroupItemControl />
        <RadioGroupItemHiddenInput />
        <RadioGroupItemText>React</RadioGroupItemText>
      </label>
    {/snippet}
  </RadioGroupItem>
</RadioGroup>