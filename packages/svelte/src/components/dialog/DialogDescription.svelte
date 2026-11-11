<script lang="ts">
  import { DialogDescription, type DialogDescriptionProps } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import styles from './Dialog.module.css';

  let { class: className, ref = $bindable(null), ...props }: DialogDescriptionProps = $props();
</script>

<DialogDescription
  {...props}
  bind:ref
  class={clsx(styles.description, className)}
  data-slot="dialog-description"
/>