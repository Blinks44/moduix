<script lang="ts">
  import {
    DialogContent as ModuixDialogContent,
    type DialogContentProps,
  } from '@moduix/svelte/dialog';
  import styles from '@/components/examples/composition-patterns/product-dialog.module.css';

  interface Props extends DialogContentProps {
    tone?: 'default' | 'danger';
  }
  let { tone = 'default', class: className, ...props }: Props = $props();
</script>

<ModuixDialogContent {...props} data-dialog-tone={tone} class={[styles.content, className]} />