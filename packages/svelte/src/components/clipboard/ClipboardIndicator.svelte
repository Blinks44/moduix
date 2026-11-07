<script lang="ts">
  import { ClipboardIndicator, type ClipboardIndicatorProps } from '@ark-ui/svelte/clipboard';
  import { clsx } from 'clsx';
  import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui';
  import styles from './Clipboard.module.css';

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
  class={clsx(styles.indicator, className)}
  data-slot="clipboard-indicator"
/>