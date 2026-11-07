<script lang="ts">
  import { ClipboardIndicator, type ClipboardIndicatorProps } from '@ark-ui/svelte/clipboard';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    copied,
    ref = $bindable(null),
    ...props
  }: ClipboardIndicatorProps = $props();
</script>

{#snippet copiedIcon()}
  <CheckIcon />
{/snippet}

{#snippet copyIcon()}
  <CopyIcon />
{/snippet}

<ClipboardIndicator
  {...props}
  bind:ref
  children={children ?? copyIcon}
  copied={copied ?? copiedIcon}
  class={cn('inline-flex shrink-0 items-center justify-center', className)}
  data-slot="clipboard-indicator"
/>