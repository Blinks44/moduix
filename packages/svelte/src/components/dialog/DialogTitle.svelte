<script lang="ts">
  import { Title as DialogTitle, type DialogTitleProps } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import styles from './Dialog.module.css';

  let { class: className, ref = $bindable(null), ...props }: DialogTitleProps = $props();
</script>

<DialogTitle {...props} bind:ref class={clsx(styles.title, className)} data-slot="dialog-title" />