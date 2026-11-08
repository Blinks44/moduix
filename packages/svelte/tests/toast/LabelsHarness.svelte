<script lang="ts">
  import type { PropsFn } from '@ark-ui/svelte';
  import {
    Toast,
    ToastCloseTrigger,
    ToastTitle,
    ToastToaster,
    type CreateToasterReturn,
  } from '@/components/toast';

  let { handleClick, toaster }: { handleClick: () => void; toaster: CreateToasterReturn } =
    $props();
  let label = $state<string | undefined>('Dismiss first');
  let labelledby = $state<string | undefined>();

  export const set = (next: { label?: string; labelledby?: string }) => {
    label = next.label;
    labelledby = next.labelledby;
  };
</script>

<span id="close-label">Dismiss by reference</span>
<ToastToaster {toaster} portalled={false}>
  {#snippet children()}
    <Toast>
      <ToastTitle />
      <ToastCloseTrigger aria-label={label} aria-labelledby={labelledby} onclick={handleClick} />
      <ToastCloseTrigger asChild={customClose} aria-label={label} aria-labelledby={labelledby} />
    </Toast>
  {/snippet}
</ToastToaster>

{#snippet customClose(props: PropsFn<'button'>)}
  <button {...props()} type="button">Custom close content</button>
{/snippet}