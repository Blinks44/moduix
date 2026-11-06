<script lang="ts">
  import { PopoverContent, type PopoverContentProps } from '@ark-ui/svelte/popover';
  import { clsx } from 'clsx';
  import styles from './Popover.module.css';

  let { class: className, ref = $bindable(null), ...props }: PopoverContentProps = $props();
</script>

<PopoverContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="popover-content"
/>