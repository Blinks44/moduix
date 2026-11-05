<script lang="ts">
  import { FieldErrorText, type FieldErrorTextProps } from '@ark-ui/svelte/field';
  import { clsx } from 'clsx';
  import styles from './Field.module.css';

  let { class: className, ref = $bindable(null), ...props }: FieldErrorTextProps = $props();
</script>

<FieldErrorText
  {...props}
  bind:ref
  class={clsx(styles.errorText, className)}
  data-slot="field-error-text"
/>