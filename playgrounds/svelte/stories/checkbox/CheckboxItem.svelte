<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxIndicator,
    CheckboxLabel,
    type CheckboxRootProps,
  } from '@/components/checkbox';
  import styles from './Checkbox.stories.module.css';
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
    <CheckboxControl class={customStyled ? styles.customControl : undefined}>
      <CheckboxIndicator>
        <CustomPlusIcon class={styles.customIndicatorIcon} />
      </CheckboxIndicator>
    </CheckboxControl>
  {:else}
    <CheckboxControl class={customStyled ? styles.customControl : undefined} />
  {/if}
  <CheckboxLabel class={customStyled ? styles.customLabel : undefined}>
    {@render children?.()}
  </CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>