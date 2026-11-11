<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ListboxRootProviderProps as ArkListboxRootProviderProps } from '@ark-ui/svelte/listbox';

  export type ListboxRootProviderProps<T extends CollectionItem = CollectionItem> =
    ArkListboxRootProviderProps<T>;
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ListboxRootProvider } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ...props }: ListboxRootProviderProps<T> = $props();
</script>

<ListboxRootProvider
  {...props}
  class={clsx(styles.root, className)}
  data-slot="listbox-root-provider"
/>