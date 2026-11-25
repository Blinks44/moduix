<script module lang="ts">
  import type {
    SelectClearTriggerProps,
    SelectControlProps,
    SelectTriggerProps,
    SelectValueTextProps,
  } from '@ark-ui/svelte/select';
  import type { Snippet } from 'svelte';

  export interface SelectFieldProps extends Omit<SelectControlProps, 'asChild' | 'children'> {
    clearable?: boolean;
    clearLabel?: string;
    clearTriggerProps?: SelectClearTriggerProps;
    indicator?: Snippet;
    placeholder?: SelectValueTextProps['placeholder'];
    triggerProps?: SelectTriggerProps;
    valueTextProps?: SelectValueTextProps;
  }
</script>

<script lang="ts">
  import SelectClearTrigger from './SelectClearTrigger.svelte';
  import SelectControl from './SelectControl.svelte';
  import SelectIndicator from './SelectIndicator.svelte';
  import SelectTrigger from './SelectTrigger.svelte';
  import SelectValueText from './SelectValueText.svelte';

  let {
    clearable,
    clearLabel,
    clearTriggerProps,
    indicator,
    placeholder,
    ref = $bindable(null),
    triggerProps,
    valueTextProps,
    ...props
  }: SelectFieldProps = $props();

  const showClearTrigger = $derived(clearable ?? (clearLabel != null || clearTriggerProps != null));
  const resolvedValueTextProps = $derived({
    ...(placeholder === undefined ? {} : { placeholder }),
    ...valueTextProps,
  });
  const resolvedClearTriggerProps = $derived({
    ...(clearLabel === undefined ? {} : { 'aria-label': clearLabel }),
    ...clearTriggerProps,
  });
</script>

<SelectControl {...props} bind:ref>
  <SelectTrigger {...triggerProps}>
    <SelectValueText {...resolvedValueTextProps} />
  </SelectTrigger>
  {#if showClearTrigger}<SelectClearTrigger {...resolvedClearTriggerProps} />{/if}
  <SelectIndicator children={indicator} />
</SelectControl>