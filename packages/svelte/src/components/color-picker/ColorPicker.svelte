<script module lang="ts">
  import type { ColorPickerRootProps as ArkColorPickerRootProps } from '@ark-ui/svelte/color-picker';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface ColorPickerRootProps extends ArkColorPickerRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { ColorPickerRoot } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';
  import styles from './ColorPicker.module.css';

  let {
    class: className,
    format = $bindable(),
    lazyMount = true,
    open = $bindable(),
    portalled = true,
    portalRef,
    ref = $bindable(null),
    unmountOnExit = true,
    value = $bindable(),
    ...props
  }: ColorPickerRootProps = $props();

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

<ColorPickerRoot
  {...props}
  bind:ref
  bind:value
  bind:open
  bind:format
  {lazyMount}
  {unmountOnExit}
  class={clsx(styles.root, className)}
  data-slot="color-picker-root"
/>