<script module lang="ts">
  import type { DatePickerRootProviderProps as ArkDatePickerRootProviderProps } from '@ark-ui/svelte/date-picker';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface DatePickerRootProviderProps
    extends ArkDatePickerRootProviderProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { DatePickerRootProvider } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';
  import styles from './DatePicker.module.css';

  let {
    class: className,
    lazyMount = true,
    portalled = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: DatePickerRootProviderProps = $props();

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

<DatePickerRootProvider
  {...props}
  {lazyMount}
  {unmountOnExit}
  class={clsx(styles.root, className)}
  data-slot="date-picker-root-provider"
/>