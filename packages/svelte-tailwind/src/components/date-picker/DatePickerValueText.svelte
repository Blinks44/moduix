<script module lang="ts">
  import type {
    DatePickerValueTextProps as ArkDatePickerValueTextProps,
    DatePickerValueTextRenderProps,
  } from '@ark-ui/svelte/date-picker';
  import type { Snippet } from 'svelte';

  // Ark types children as an intersection of the plain and render-prop snippets, which no real
  // snippet satisfies, so the wrapper exposes the render-prop snippet alone.
  export interface DatePickerValueTextProps extends Omit<ArkDatePickerValueTextProps, 'children'> {
    children?: Snippet<[DatePickerValueTextRenderProps]>;
  }
</script>

<script lang="ts">
  import { DatePickerValueText } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerValueTextProps = $props();
</script>

<DatePickerValueText
  {...props}
  bind:ref
  children={children as ArkDatePickerValueTextProps['children']}
  class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
  data-slot="date-picker-value-text"
/>