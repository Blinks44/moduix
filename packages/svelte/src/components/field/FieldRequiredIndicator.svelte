<script lang="ts">
  import { FieldRequiredIndicator, type FieldRequiredIndicatorProps } from '@ark-ui/svelte/field';
  import { clsx } from 'clsx';
  import styles from './Field.module.css';

  let { class: className, ref = $bindable(null), ...props }: FieldRequiredIndicatorProps = $props();
</script>

<FieldRequiredIndicator
  {...props}
  bind:ref
  class={clsx(styles.requiredIndicator, className)}
  data-slot="field-required-indicator"
/>