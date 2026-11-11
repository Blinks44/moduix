<script lang="ts">
  import { FieldsetHelperText, type FieldsetHelperTextProps } from '@ark-ui/svelte/fieldset';
  import { clsx } from 'clsx';
  import styles from './Fieldset.module.css';

  let { class: className, ref = $bindable(null), ...props }: FieldsetHelperTextProps = $props();
</script>

<FieldsetHelperText
  {...props}
  bind:ref
  class={clsx(styles.helperText, className)}
  data-slot="fieldset-helper-text"
/>