<script lang="ts">
  import { clsx } from 'clsx';
  import { useA11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton, { type CloseButtonProps } from '../close-button/CloseButton.svelte';
  import styles from './Tag.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  }: CloseButtonProps = $props();

  const labels = useA11yLabels();
</script>

<CloseButton
  {...props}
  bind:ref
  aria-label={ariaLabel ?? (ariaLabelledBy == null ? labels().closeTag : undefined)}
  aria-labelledby={ariaLabelledBy}
  data-scope="tag"
  data-part="close-trigger"
  data-slot="tag-close-trigger"
  class={clsx(styles.closeTrigger, className)}
  {children}
/>