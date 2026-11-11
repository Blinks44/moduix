<script lang="ts">
  import { SelectContent, type SelectContentProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectContentProps = $props();
</script>

<SelectContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="select-content"
/>