<script module lang="ts">
  import type {
    ComboboxClearTriggerProps,
    ComboboxControlProps,
    ComboboxInputProps,
    ComboboxTriggerProps,
  } from '@ark-ui/svelte/combobox';

  export interface ComboboxFieldProps extends Omit<ComboboxControlProps, 'asChild' | 'children'> {
    clearable?: boolean;
    clearLabel?: string;
    clearTriggerProps?: ComboboxClearTriggerProps;
    inputProps?: ComboboxInputProps;
    placeholder?: ComboboxInputProps['placeholder'];
    triggerLabel?: string;
    triggerProps?: ComboboxTriggerProps;
  }
</script>

<script lang="ts">
  import ComboboxClearTrigger from './ComboboxClearTrigger.svelte';
  import ComboboxControl from './ComboboxControl.svelte';
  import ComboboxInput from './ComboboxInput.svelte';
  import ComboboxTrigger from './ComboboxTrigger.svelte';

  let {
    clearable,
    clearLabel,
    clearTriggerProps,
    inputProps,
    placeholder,
    ref = $bindable(null),
    triggerLabel,
    triggerProps,
    ...props
  }: ComboboxFieldProps = $props();

  const showClearTrigger = $derived(clearable ?? (clearLabel != null || clearTriggerProps != null));
  const resolvedInputProps = $derived({
    ...(placeholder === undefined ? {} : { placeholder }),
    ...inputProps,
  });
  const resolvedClearTriggerProps = $derived({
    ...(clearLabel === undefined ? {} : { 'aria-label': clearLabel }),
    ...clearTriggerProps,
  });
  const resolvedTriggerProps = $derived({
    ...(triggerLabel === undefined ? {} : { 'aria-label': triggerLabel }),
    ...triggerProps,
  });
</script>

<ComboboxControl {...props} bind:ref>
  <ComboboxInput {...resolvedInputProps} />
  {#if showClearTrigger}<ComboboxClearTrigger {...resolvedClearTriggerProps} />{/if}
  <ComboboxTrigger {...resolvedTriggerProps} />
</ComboboxControl>