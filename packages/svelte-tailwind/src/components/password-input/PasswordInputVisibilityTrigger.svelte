<script lang="ts">
  import {
    PasswordInputVisibilityTrigger,
    type PasswordInputVisibilityTriggerProps,
  } from '@ark-ui/svelte/password-input';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: PasswordInputVisibilityTriggerProps = $props();
</script>

<PasswordInputVisibilityTrigger
  {...props}
  bind:ref
  class={cn(
    'group/password-input-trigger inline-flex size-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent text-muted-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[color,outline-color] duration-normal ease-in-out group-data-[size=sm]/password-input:size-6 group-data-[size=xl]/password-input:size-10 group-data-[size=xs]/password-input:size-5 not-data-disabled:not-data-readonly:hover:text-foreground focus-visible:outline-ring data-disabled:cursor-default data-readonly:cursor-default',
    className,
  )}
  data-slot="password-input-visibility-trigger"
/>