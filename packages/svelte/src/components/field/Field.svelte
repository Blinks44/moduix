<script lang="ts">
  import { FieldRoot, type FieldRootProps } from '@ark-ui/svelte/field';
  import { clsx } from 'clsx';
  import styles from './Field.module.css';

  let { class: className, ref = $bindable(null), ...props }: FieldRootProps = $props();
</script>

<FieldRoot {...props} bind:ref class={clsx(styles.root, className)} data-slot="field-root" />