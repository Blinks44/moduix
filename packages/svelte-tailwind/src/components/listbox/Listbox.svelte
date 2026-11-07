<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ListboxRootProps as ArkListboxRootProps } from '@ark-ui/svelte/listbox';

  export type ListboxRootProps<T extends CollectionItem = CollectionItem> = ArkListboxRootProps<T>;
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ListboxRoot } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';
  import { listboxRootVariants } from './Listbox.variants';

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
  class={cn(listboxRootVariants(), className)}
  data-slot="listbox-root"
/>