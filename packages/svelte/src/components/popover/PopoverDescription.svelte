<script lang="ts">
  import { PopoverDescription, type PopoverDescriptionProps } from '@ark-ui/svelte/popover';
  import { clsx } from 'clsx';
  import styles from './Popover.module.css';

  let { class: className, ref = $bindable(null), ...props }: PopoverDescriptionProps = $props();
</script>

<PopoverDescription
  {...props}
  bind:ref
  class={clsx(styles.description, className)}
  data-slot="popover-description"
/>