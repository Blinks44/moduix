<script lang="ts">
  import {
    RadioGroupItemControl,
    type RadioGroupItemControlProps,
  } from '@ark-ui/svelte/radio-group';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupItemControlProps = $props();
</script>

<RadioGroupItemControl
  {...props}
  bind:ref
  class={cn(
    `inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-input bg-background text-primary-foreground transition-[background-color,border-color] duration-normal ease-in-out select-none group-data-[size=lg]/radio-group:size-control-xs group-data-[size=sm]/radio-group:size-4 group-data-[size=xl]/radio-group:size-7 group-data-[size=xs]/radio-group:size-3.5 before:size-2 before:scale-[0.6] before:rounded-full before:bg-current before:opacity-0 before:transition-[opacity,transform] before:duration-normal before:ease-in-out before:content-[''] group-data-[size=lg]/radio-group:before:size-2.5 group-data-[size=sm]/radio-group:before:size-1.5 group-data-[size=xl]/radio-group:before:size-3 group-data-[size=xs]/radio-group:before:size-1 data-focus-visible:outline-focus-inset data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-invalid:data-focus-visible:outline-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:before:scale-100 data-[state=checked]:before:opacity-100 data-invalid:data-[state=checked]:border-destructive [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent`,
    className,
  )}
  data-slot="radio-group-item-control"
/>