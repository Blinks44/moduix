<script lang="ts">
  import { ListboxContent, type ListboxContentProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ListboxContentProps = $props();
</script>

<ListboxContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="listbox-content"
/>