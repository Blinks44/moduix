<script module lang="ts">
  import type {
    CheckboxHiddenInputProps,
    CheckboxRootProps as ArkCheckboxRootProps,
  } from '@ark-ui/svelte/checkbox';
  import type { Snippet } from 'svelte';

  export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface CheckboxRootProps extends ArkCheckboxRootProps {
    hiddenInput?: boolean;
    hiddenInputProps?: CheckboxHiddenInputProps;
    label?: string | Snippet;
    size?: CheckboxSize;
  }
</script>

<script lang="ts">
  import { CheckboxHiddenInput, CheckboxRoot } from '@ark-ui/svelte/checkbox';
  import { clsx } from 'clsx';
  import styles from './Checkbox.module.css';
  import CheckboxControl from './CheckboxControl.svelte';
  import CheckboxLabel from './CheckboxLabel.svelte';

  let {
    asChild,
    children,
    class: className,
    checked = $bindable(),
    hiddenInput,
    hiddenInputProps,
    label,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: CheckboxRootProps = $props();
</script>

{#if asChild}
  <CheckboxRoot
    {...props}
    {asChild}
    {children}
    bind:ref
    bind:checked
    class={clsx(styles.root, className)}
    data-size={size}
    data-slot="checkbox-root"
  />
{:else}
  <CheckboxRoot
    {...props}
    bind:ref
    bind:checked
    class={clsx(styles.root, className)}
    data-size={size}
    data-slot="checkbox-root"
  >
    {#if children}
      {@render children()}
      {#if hiddenInput}
        <CheckboxHiddenInput {...hiddenInputProps} />
      {/if}
    {:else}
      <CheckboxControl />
      {#if label != null}
        <CheckboxLabel>
          {#if typeof label === 'function'}
            {@render label()}
          {:else}
            {label}
          {/if}
        </CheckboxLabel>
      {/if}
      {#if hiddenInput !== false}
        <CheckboxHiddenInput {...hiddenInputProps} />
      {/if}
    {/if}
  </CheckboxRoot>
{/if}