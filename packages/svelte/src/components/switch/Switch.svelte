<script module lang="ts">
  import type {
    SwitchHiddenInputProps,
    SwitchRootProps as ArkSwitchRootProps,
  } from '@ark-ui/svelte/switch';
  import type { Snippet } from 'svelte';

  export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface SwitchRootProps extends Omit<ArkSwitchRootProps, 'label'> {
    hiddenInput?: boolean;
    hiddenInputProps?: SwitchHiddenInputProps;
    label?: string | Snippet;
    size?: SwitchSize;
  }
</script>

<script lang="ts">
  import { SwitchHiddenInput, SwitchRoot } from '@ark-ui/svelte/switch';
  import { clsx } from 'clsx';
  import styles from './Switch.module.css';
  import SwitchControl from './SwitchControl.svelte';
  import SwitchLabel from './SwitchLabel.svelte';

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
  }: SwitchRootProps = $props();
</script>

{#if asChild}
  <SwitchRoot
    {...props}
    {asChild}
    {children}
    bind:ref
    bind:checked
    class={clsx(styles.root, className)}
    data-size={size}
    data-slot="switch-root"
  />
{:else}
  <SwitchRoot
    {...props}
    bind:ref
    bind:checked
    class={clsx(styles.root, className)}
    data-size={size}
    data-slot="switch-root"
  >
    {#if children}
      {@render children()}
      {#if hiddenInput}
        <SwitchHiddenInput {...hiddenInputProps} />
      {/if}
    {:else}
      <SwitchControl />
      {#if label != null}
        <SwitchLabel>
          {#if typeof label === 'function'}
            {@render label()}
          {:else}
            {label}
          {/if}
        </SwitchLabel>
      {/if}
      {#if hiddenInput !== false}
        <SwitchHiddenInput {...hiddenInputProps} />
      {/if}
    {/if}
  </SwitchRoot>
{/if}