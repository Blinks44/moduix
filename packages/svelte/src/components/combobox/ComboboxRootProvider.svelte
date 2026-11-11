<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ComboboxRootProviderProps as ArkComboboxRootProviderProps } from '@ark-ui/svelte/combobox';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface ComboboxRootProviderProps<T extends CollectionItem = CollectionItem>
    extends ArkComboboxRootProviderProps<T>, OverlayPortalProps {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ComboboxRootProvider } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';
  import styles from './Combobox.module.css';

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
  class={clsx(styles.root, className)}
  data-slot="combobox-root-provider"
/>