<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ComboboxRootProps as ArkComboboxRootProps } from '@ark-ui/svelte/combobox';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface ComboboxRootProps<T extends CollectionItem = CollectionItem>
    extends ArkComboboxRootProps<T>, OverlayPortalProps {}

  const rootClass = 'flex w-64 max-w-full min-w-0 flex-col gap-1.5 text-foreground';
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ComboboxRoot } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';

  let {
    class: className,
    highlightedValue = $bindable(),
    inputValue = $bindable(),
    lazyMount = true,
    open = $bindable(),
    portalled = true,
    portalRef,
    ref = $bindable(null),
    unmountOnExit = true,
    value = $bindable(),
    ...props
  }: ComboboxRootProps<T> = $props();

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

<ComboboxRoot
  {...props}
  bind:ref
  bind:value
  bind:inputValue
  bind:open
  bind:highlightedValue
  {lazyMount}
  {unmountOnExit}
  class={cn(rootClass, className)}
  data-slot="combobox-root"
/>