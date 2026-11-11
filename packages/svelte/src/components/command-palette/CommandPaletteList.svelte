<script lang="ts">
  import { ComboboxContent, type ComboboxContentProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import ScrollArea from '../scroll-area/ScrollArea.svelte';
  import ScrollAreaContent from '../scroll-area/ScrollAreaContent.svelte';
  import ScrollAreaViewport from '../scroll-area/ScrollAreaViewport.svelte';
  import styles from './CommandPalette.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ComboboxContentProps = $props();
</script>

<ComboboxContent
  {...props}
  bind:ref
  class={clsx(styles.list, className)}
  data-slot="command-palette-list"
>
  <ScrollArea class={styles.scrollArea}>
    <ScrollAreaViewport class={styles.scrollViewport}>
      <ScrollAreaContent class={styles.scrollContent}>
        {@render children?.()}
      </ScrollAreaContent>
    </ScrollAreaViewport>
  </ScrollArea>
</ComboboxContent>