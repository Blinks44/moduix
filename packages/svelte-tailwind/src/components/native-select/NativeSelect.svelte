<script module lang="ts">
  import type { FieldSelectProps } from '@ark-ui/svelte/field';
  import type { HTMLAttributes } from 'svelte/elements';

  export interface NativeSelectProps extends FieldSelectProps {
    controlProps?: HTMLAttributes<HTMLSpanElement>;
  }
</script>

<script lang="ts">
  import { FieldSelect } from '@ark-ui/svelte/field';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

  const selectClass =
    'peer/native-select h-control-md w-56 max-w-full min-w-0 cursor-pointer appearance-none rounded-md border border-input bg-background ps-3.5 pe-[2.875rem] text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out [font:inherit] focus-visible:border-ring focus-visible:outline-ring/50 disabled:pointer-events-none disabled:opacity-disabled aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-disabled data-invalid:border-destructive data-invalid:focus-visible:outline-destructive/20 forced-colors:appearance-auto forced-colors:pe-3.5';
  const indicatorClass =
    'pointer-events-none absolute end-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out peer-hover/native-select:bg-muted peer-hover/native-select:text-foreground peer-disabled/native-select:opacity-disabled peer-data-disabled/native-select:opacity-disabled forced-colors:hidden [&>svg]:size-4';

  let {
    class: className,
    controlProps,
    multiple,
    ref = $bindable(null),
    size,
    value = $bindable(),
    ...props
  }: NativeSelectProps = $props();
  const { class: controlClassName, ...controlRest } = $derived(controlProps ?? {});
  const isList = $derived(multiple || Number(size) > 1);
</script>

<span
  {...controlRest}
  class={cn('relative inline-grid w-fit max-w-full min-w-0', controlClassName)}
  data-scope="native-select"
  data-part="control"
  data-slot="native-select-control"
>
  <FieldSelect
    {...props}
    bind:ref
    bind:value
    {multiple}
    {size}
    class={cn(selectClass, isList && 'h-auto appearance-auto px-3.5 py-2', className)}
    data-scope="field"
    data-part="select"
    data-slot="native-select-root"
  />
  <span
    aria-hidden="true"
    data-scope="native-select"
    data-part="indicator"
    data-slot="native-select-indicator"
    class={cn(indicatorClass, isList && 'hidden')}
  >
    <ChevronDownIcon />
  </span>
</span>