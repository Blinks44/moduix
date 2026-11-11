<script lang="ts">
  import { PopoverTitle, type PopoverTitleProps } from '@ark-ui/svelte/popover';
  import { clsx } from 'clsx';
  import styles from './Popover.module.css';

  let { class: className, ref = $bindable(null), ...props }: PopoverTitleProps = $props();
</script>

<PopoverTitle {...props} bind:ref class={clsx(styles.title, className)} data-slot="popover-title" />