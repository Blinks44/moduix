<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ComboboxRootProviderProps as ArkComboboxRootProviderProps } from '@ark-ui/svelte/combobox';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface ComboboxRootProviderProps<T extends CollectionItem = CollectionItem>
    extends ArkComboboxRootProviderProps<T>, OverlayPortalProps {}

  const rootClass = 'flex w-64 max-w-full min-w-0 flex-col gap-1.5 text-foreground';
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ComboboxRootProvider } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';

  let {
    class: className,
    lazyMount = true,
    portalled = true,
    portalRef,
    ref = $bindable(null),
    unmountOnExit = true,
    ...props
  }: ComboboxRootProviderProps<T> = $props();

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

<ComboboxRootProvider
  {...props}
  bind:ref
  {lazyMount}
  {unmountOnExit}
  class={cn(rootClass, className)}
  data-slot="combobox-root-provider"
/>