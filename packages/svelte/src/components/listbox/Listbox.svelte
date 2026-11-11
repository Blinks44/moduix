<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ListboxRootProps as ArkListboxRootProps } from '@ark-ui/svelte/listbox';

  export type ListboxRootProps<T extends CollectionItem = CollectionItem> = ArkListboxRootProps<T>;
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ListboxRoot } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let {
    class: className,
    highlightedValue = $bindable(),
    value = $bindable(),
    ...props
  }: ListboxRootProps<T> = $props();
</script>

<ListboxRoot
  {...props}
  bind:value
  bind:highlightedValue
  class={clsx(styles.root, className)}
  data-slot="listbox-root"
/>