<script lang="ts">
  import {
    NumberInput,
    NumberInputControl,
    NumberInputDecrementTrigger,
    NumberInputIncrementTrigger,
    NumberInputInput,
    NumberInputLabel,
  } from '@/components/number-input';

  let rootRef: Element | null = $state(null);

  export const getRootRef = () => rootRef;
</script>

<NumberInput bind:ref={rootRef} defaultValue="4" data-probe="root">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Capacity">
      <NumberInputLabel>Capacity</NumberInputLabel>
      <NumberInputControl>
        <NumberInputDecrementTrigger>
          {#snippet asChild(triggerProps)}
            <button {...triggerProps()} type="button" aria-label="Decrease custom value">−</button>
          {/snippet}
        </NumberInputDecrementTrigger>
        <NumberInputInput />
        <NumberInputIncrementTrigger />
      </NumberInputControl>
    </section>
  {/snippet}
</NumberInput>