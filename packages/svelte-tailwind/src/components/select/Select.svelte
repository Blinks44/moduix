<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { SelectRootProps as ArkSelectRootProps } from '@ark-ui/svelte/select';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface SelectRootProps<T extends CollectionItem = CollectionItem>
    extends ArkSelectRootProps<T>, OverlayPortalProps {}

  const rootClass = 'flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground';
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { SelectRoot } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';

  let {
    class: className,
    highlightedValue = $bindable(),
    lazyMount = true,
    open = $bindable(),
    portalled = true,
    portalRef,
    ref = $bindable(null),
    unmountOnExit = true,
    value = $bindable(),
    ...props
  }: SelectRootProps<T> = $props();

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

<SelectRoot
  {...props}
  bind:ref
  bind:value
  bind:open
  bind:highlightedValue
  {lazyMount}
  {unmountOnExit}
  class={cn(rootClass, className)}
  data-slot="select-root"
/>