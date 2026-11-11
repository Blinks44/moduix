<script lang="ts">
  import { PasswordInputInput, type PasswordInputInputProps } from '@ark-ui/svelte/password-input';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    ...props
  }: PasswordInputInputProps = $props();
</script>

<PasswordInputInput
  {...props}
  bind:ref
  bind:value
  class={cn(
    'min-w-0 flex-auto bg-transparent px-3 py-1 text-md text-foreground outline-0 group-data-[size=lg]/password-input:px-4 group-data-[size=lg]/password-input:text-lg group-data-[size=sm]/password-input:px-2 group-data-[size=sm]/password-input:text-sm group-data-[size=xl]/password-input:px-4 group-data-[size=xl]/password-input:py-2 group-data-[size=xl]/password-input:text-lg group-data-[size=xs]/password-input:px-2 group-data-[size=xs]/password-input:py-0.5 group-data-[size=xs]/password-input:text-xs placeholder:text-muted-foreground',
    className,
  )}
  data-slot="password-input-input"
/>