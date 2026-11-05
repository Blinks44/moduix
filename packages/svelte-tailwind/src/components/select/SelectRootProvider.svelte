<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { SelectRootProviderProps as ArkSelectRootProviderProps } from '@ark-ui/svelte/select';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface SelectRootProviderProps<T extends CollectionItem = CollectionItem>
    extends ArkSelectRootProviderProps<T>, OverlayPortalProps {}

  const rootClass = 'flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground';
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { SelectRootProvider } from '@ark-ui/svelte/select';
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
  }: SelectRootProviderProps<T> = $props();

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

<SelectRootProvider
  {...props}
  bind:ref
  {lazyMount}
  {unmountOnExit}
  class={cn(rootClass, className)}
  data-slot="select-root-provider"
/>