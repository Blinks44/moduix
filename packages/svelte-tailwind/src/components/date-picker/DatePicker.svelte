<script module lang="ts">
  import type { DatePickerRootProps as ArkDatePickerRootProps } from '@ark-ui/svelte/date-picker';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface DatePickerRootProps extends ArkDatePickerRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { DatePickerRoot } from '@ark-ui/svelte/date-picker';
  import { useFieldContext } from '@ark-ui/svelte/field';
  import { useFieldsetContext } from '@ark-ui/svelte/fieldset';
  import { cn } from '@/lib/moduix/cn';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';
  import { rootClass } from './DatePicker.variants';

  let {
    class: className,
    disabled,
    focusedValue = $bindable(),
    invalid,
    lazyMount = true,
    open = $bindable(),
    portalled = true,
    portalRef,
    readOnly,
    ref = $bindable(null),
    required,
    unmountOnExit = true,
    value = $bindable(),
    view = $bindable(),
    ...props
  }: DatePickerRootProps = $props();

  const field = useFieldContext();
  const fieldset = useFieldsetContext();

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

<DatePickerRoot
  {...props}
  bind:ref
  bind:value
  bind:focusedValue
  bind:open
  bind:view
  disabled={disabled ?? field?.()?.disabled ?? fieldset?.()?.disabled}
  invalid={invalid ?? field?.()?.invalid ?? fieldset?.()?.invalid}
  {lazyMount}
  readOnly={readOnly ?? field?.()?.readOnly}
  required={required ?? field?.()?.required}
  {unmountOnExit}
  class={cn(rootClass, className)}
  data-slot="date-picker-root"
/>