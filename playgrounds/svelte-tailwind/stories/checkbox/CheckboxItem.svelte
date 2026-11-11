<script lang="ts">
  const customControlClass =
    'border-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary';
  const customIndicatorIconClass = '-rotate-[8deg]';
  const customLabelClass = 'font-semibold';

  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxIndicator,
    CheckboxLabel,
    type CheckboxRootProps,
  } from '@/components/checkbox';
  import CustomPlusIcon from './CustomPlusIcon.svelte';

  let {
    children,
    customStyled,
    indicator,
    ...props
  }: CheckboxRootProps & { customStyled?: boolean; indicator?: 'default' | 'custom' } = $props();
</script>

<Checkbox {...props}>
  {#if indicator === 'custom'}
    <CheckboxControl class={customStyled ? customControlClass : undefined}>
      <CheckboxIndicator>
        <CustomPlusIcon class={customIndicatorIconClass} />
      </CheckboxIndicator>
    </CheckboxControl>
  {:else}
    <CheckboxControl class={customStyled ? customControlClass : undefined} />
  {/if}
  <CheckboxLabel class={customStyled ? customLabelClass : undefined}>
    {@render children?.()}
  </CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>