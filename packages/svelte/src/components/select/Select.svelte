<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { SelectRootProps as ArkSelectRootProps } from '@ark-ui/svelte/select';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface SelectRootProps<T extends CollectionItem = CollectionItem>
    extends ArkSelectRootProps<T>, OverlayPortalProps {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { SelectRoot } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';
  import styles from './Select.module.css';

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
  class={clsx(styles.root, className)}
  data-slot="select-root"
/>