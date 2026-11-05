<script lang="ts">
  import { CheckboxControl, type CheckboxControlProps } from '@ark-ui/svelte/checkbox';
  import { cn } from '@/lib/moduix/cn';
  import CheckboxIndicator from './CheckboxIndicator.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: CheckboxControlProps = $props();
</script>

<CheckboxControl
  {...props}
  bind:ref
  class={cn(
    `inline-flex size-5 shrink-0 items-center justify-center rounded-xs border border-input bg-background text-primary-foreground transition-[background-color,border-color,color] duration-normal select-none group-data-[size=lg]/checkbox:size-control-xs group-data-[size=sm]/checkbox:size-4 group-data-[size=xl]/checkbox:size-7 group-data-[size=xs]/checkbox:size-3.5 data-focus-visible:outline-focus-inset data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-invalid:text-destructive-foreground data-invalid:data-focus-visible:outline-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-invalid:data-[state=checked]:border-destructive data-invalid:data-[state=checked]:bg-destructive data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-invalid:data-[state=indeterminate]:border-destructive data-invalid:data-[state=indeterminate]:bg-destructive [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent`,
    className,
  )}
  data-slot="checkbox-control"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckboxIndicator />
    <CheckboxIndicator indeterminate />
  {/if}
</CheckboxControl>