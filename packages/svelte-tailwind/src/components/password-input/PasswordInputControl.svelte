<script lang="ts">
  import {
    PasswordInputControl,
    type PasswordInputControlProps,
  } from '@ark-ui/svelte/password-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PasswordInputControlProps = $props();
</script>

<PasswordInputControl
  {...props}
  bind:ref
  class={cn(
    'flex min-h-control-md items-center rounded-md border border-input bg-background pe-2 outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-[size=lg]/password-input:min-h-control-lg group-data-[size=lg]/password-input:pe-3 group-data-[size=sm]/password-input:min-h-control-sm group-data-[size=sm]/password-input:pe-1.5 group-data-[size=xl]/password-input:min-h-control-xl group-data-[size=xl]/password-input:pe-2.5 group-data-[size=xs]/password-input:min-h-control-xs focus-within:border-ring focus-within:outline-ring/50 data-invalid:border-destructive data-invalid:focus-within:outline-destructive/20',
    className,
  )}
  data-slot="password-input-control"
/>