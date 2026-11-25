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
  import { cn } from '@/lib/moduix/cn';
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

  const rootClass = $derived(
    cn(
      'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
      className,
    ),
  );
</script>

{#if asChild}
  <SwitchRoot
    {...props}
    {asChild}
    {children}
    bind:ref
    bind:checked
    class={rootClass}
    data-size={size}
    data-slot="switch-root"
  />
{:else}
  <SwitchRoot
    {...props}
    bind:ref
    bind:checked
    class={rootClass}
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