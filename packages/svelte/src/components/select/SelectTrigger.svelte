<script lang="ts">
  import { SelectTrigger, type SelectTriggerProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { asChild, class: className, ref = $bindable(null), ...props }: SelectTriggerProps = $props();
</script>

<!-- An asChild host keeps its own styling. -->
<SelectTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="select-trigger"
/>