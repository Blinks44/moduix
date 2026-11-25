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
  import { cn } from '@/lib/moduix/cn';
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

  const rootClass = $derived(
    cn(
      'group/checkbox inline-flex cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
      className,
    ),
  );
</script>

{#if asChild}
  <CheckboxRoot
    {...props}
    {asChild}
    {children}
    bind:ref
    bind:checked
    class={rootClass}
    data-size={size}
    data-slot="checkbox-root"
  />
{:else}
  <CheckboxRoot
    {...props}
    bind:ref
    bind:checked
    class={rootClass}
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