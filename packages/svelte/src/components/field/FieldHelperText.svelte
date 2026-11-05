<script lang="ts">
  import { FieldHelperText, type FieldHelperTextProps } from '@ark-ui/svelte/field';
  import { clsx } from 'clsx';
  import styles from './Field.module.css';

  let { class: className, ref = $bindable(null), ...props }: FieldHelperTextProps = $props();
</script>

<FieldHelperText
  {...props}
  bind:ref
  class={clsx(styles.helperText, className)}
  data-slot="field-helper-text"
/>