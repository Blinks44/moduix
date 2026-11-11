<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import { CloseButton, type CloseButtonProps } from '@/components/close-button';

  let {
    childClick,
    label,
    ref = $bindable(null),
    ...props
  }: CloseButtonProps & {
    childClick?: MouseEventHandler<HTMLButtonElement>;
    label: string;
  } = $props();

  export const getRef = () => ref;
</script>

<CloseButton {...props} bind:ref aria-label={label}>
  {#snippet asChild(hostProps)}
    <button {...hostProps({ type: 'button', onclick: childClick })} data-owner="consumer">
      {label}
    </button>
  {/snippet}
</CloseButton>