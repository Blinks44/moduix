<script lang="ts">
  import { FieldsetLegend, type FieldsetLegendProps } from '@ark-ui/svelte/fieldset';
  import { clsx } from 'clsx';
  import styles from './Fieldset.module.css';

  let { class: className, ref = $bindable(null), ...props }: FieldsetLegendProps = $props();
</script>

<FieldsetLegend
  {...props}
  bind:ref
  class={clsx(styles.legend, className)}
  data-slot="fieldset-legend"
/>