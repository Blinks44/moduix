<script lang="ts">
  import type { PropsFn } from '@ark-ui/svelte';
  import { SignaturePad, SignaturePadClearTrigger } from '@/components/signature-pad';

  let {
    asChild = false,
    changes,
    click,
    disabled,
    readOnly = false,
    rootDisabled = true,
  }: {
    asChild?: boolean;
    changes?: () => void;
    click?: () => void;
    disabled?: boolean;
    readOnly?: boolean;
    rootDisabled?: boolean;
  } = $props();

  let paths = $state(['M1,1 L2,2']);
  let triggerRef = $state<HTMLElement | null>(null);

  export const getState = () => ({ paths, triggerRef });
</script>

{#snippet reset(props: PropsFn<'button'>)}
  <button {...props()} type="button">Reset</button>
{/snippet}

<SignaturePad bind:paths disabled={rootDisabled} {readOnly} onDrawEnd={changes}>
  <SignaturePadClearTrigger
    bind:ref={triggerRef}
    asChild={asChild ? reset : undefined}
    {disabled}
    aria-label="Reset signature"
    class="consumer-clear"
    style="color: red"
    title="Reset drawing"
    data-testid="clear"
    onclick={click}
  />
</SignaturePad>