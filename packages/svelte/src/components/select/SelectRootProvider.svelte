<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { SelectRootProviderProps as ArkSelectRootProviderProps } from '@ark-ui/svelte/select';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface SelectRootProviderProps<T extends CollectionItem = CollectionItem>
    extends ArkSelectRootProviderProps<T>, OverlayPortalProps {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { SelectRootProvider } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';
  import styles from './Select.module.css';

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
  class={clsx(styles.root, className)}
  data-slot="select-root-provider"
/>