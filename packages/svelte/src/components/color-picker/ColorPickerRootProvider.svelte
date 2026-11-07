<script module lang="ts">
  import type { ColorPickerRootProviderProps as ArkColorPickerRootProviderProps } from '@ark-ui/svelte/color-picker';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface ColorPickerRootProviderProps
    extends ArkColorPickerRootProviderProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { ColorPickerRootProvider } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';
  import styles from './ColorPicker.module.css';

  let {
    class: className,
    lazyMount = true,
    portalled = true,
    portalRef,
    ref = $bindable(null),
    unmountOnExit = true,
    ...props
  }: ColorPickerRootProviderProps = $props();

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

<ColorPickerRootProvider
  {...props}
  bind:ref
  {lazyMount}
  {unmountOnExit}
  class={clsx(styles.root, className)}
  data-slot="color-picker-root-provider"
/>