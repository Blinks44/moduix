<script lang="ts">
  import { FieldLabel, type FieldLabelProps } from '@ark-ui/svelte/field';
  import { clsx } from 'clsx';
  import styles from './Field.module.css';

  let { class: className, ref = $bindable(null), ...props }: FieldLabelProps = $props();
</script>

<FieldLabel {...props} bind:ref class={clsx(styles.label, className)} data-slot="field-label" />