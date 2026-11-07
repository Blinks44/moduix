<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ListboxRootProviderProps as ArkListboxRootProviderProps } from '@ark-ui/svelte/listbox';

  export type ListboxRootProviderProps<T extends CollectionItem = CollectionItem> =
    ArkListboxRootProviderProps<T>;
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ListboxRootProvider } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';
  import { listboxRootVariants } from './Listbox.variants';

  let { class: className, ...props }: ListboxRootProviderProps<T> = $props();
</script>

<ListboxRootProvider
  {...props}
  class={cn(listboxRootVariants(), className)}
  data-slot="listbox-root-provider"
/>