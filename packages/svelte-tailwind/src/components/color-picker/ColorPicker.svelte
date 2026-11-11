<script module lang="ts">
  import type { ColorPickerRootProps as ArkColorPickerRootProps } from '@ark-ui/svelte/color-picker';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface ColorPickerRootProps extends ArkColorPickerRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { ColorPickerRoot } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';
  import { colorPickerRootClass } from './ColorPicker.variants';

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
  class={cn(colorPickerRootClass, className)}
  data-slot="color-picker-root"
/>