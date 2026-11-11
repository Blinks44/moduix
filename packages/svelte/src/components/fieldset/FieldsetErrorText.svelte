<script lang="ts">
  import { FieldsetErrorText, type FieldsetErrorTextProps } from '@ark-ui/svelte/fieldset';
  import { clsx } from 'clsx';
  import styles from './Fieldset.module.css';

  let { class: className, ref = $bindable(null), ...props }: FieldsetErrorTextProps = $props();
</script>

<FieldsetErrorText
  {...props}
  bind:ref
  class={clsx(styles.errorText, className)}
  data-slot="fieldset-error-text"
/>