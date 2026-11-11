<script lang="ts">
  import { ComboboxContent, type ComboboxContentProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './Combobox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ComboboxContentProps = $props();
</script>

<ComboboxContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="combobox-content"
/>