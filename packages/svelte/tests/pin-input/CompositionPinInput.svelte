<script lang="ts">
  import {
    PinInput,
    PinInputContext,
    PinInputControl,
    PinInputHiddenInput,
    PinInputInput,
    PinInputInputs,
    PinInputLabel,
    PinInputRootProvider,
    usePinInput,
  } from '@/components/pin-input';

  let rootRef: Element | null = $state(null);
  let inputRef: Element | null = $state(null);
  const pinInput = usePinInput({ count: 4, defaultValue: ['1'] });

  export const getRefs = () => ({ rootRef, inputRef });
</script>

<PinInputRootProvider value={pinInput} data-probe="provider">
  <PinInputLabel>Provider code</PinInputLabel>
  <PinInputControl>
    <PinInputInput bind:ref={inputRef} index={0} />
    <PinInputInputs class="provider-inputs" />
  </PinInputControl>
  <PinInputHiddenInput />
  <PinInputContext>
    {#snippet render(context)}
      <output>Provider value: {context().valueAsString}</output>
    {/snippet}
  </PinInputContext>
</PinInputRootProvider>
<button type="button" onclick={() => pinInput().clearValue()}>Clear code</button>
<PinInput bind:ref={rootRef} count={4} data-probe="root">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Custom code">
      <PinInputLabel>Custom code</PinInputLabel>
      <PinInputControl><PinInputInputs /></PinInputControl>
      <PinInputHiddenInput />
    </section>
  {/snippet}
</PinInput>