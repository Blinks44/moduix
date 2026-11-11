<script lang="ts">
  import {
    PasswordInputIndicator,
    type PasswordInputIndicatorProps,
  } from '@ark-ui/svelte/password-input';
  import { cn } from '@/lib/moduix/cn';
  import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui';

  const indicatorClass =
    "inline-flex items-center justify-center rounded-sm p-1 transition-[background-color] duration-normal ease-in-out group-hover/password-input-trigger:bg-muted group-focus-visible/password-input-trigger:bg-muted group-data-[disabled]/password-input-trigger:bg-transparent group-data-[readonly]/password-input-trigger:bg-transparent [&>svg:not([class*='size-'])]:size-4 group-data-[size=xs]/password-input:[&>svg:not([class*='size-'])]:size-3 group-data-[size=sm]/password-input:[&>svg:not([class*='size-'])]:size-3.5 group-data-[size=xl]/password-input:[&>svg:not([class*='size-'])]:size-5";

  let {
    children,
    class: className,
    fallback,
    ref = $bindable(null),
    ...props
  }: PasswordInputIndicatorProps = $props();
</script>

{#snippet visible()}
  <EyeIcon />
{/snippet}

{#snippet hidden()}
  <EyeClosedIcon />
{/snippet}

<PasswordInputIndicator
  {...props}
  bind:ref
  children={children ?? visible}
  fallback={fallback ?? hidden}
  class={cn(indicatorClass, className)}
  data-slot="password-input-indicator"
/>