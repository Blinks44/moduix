<script module lang="ts">
  import type { PasswordInputRootProviderProps as ArkPasswordInputRootProviderProps } from '@ark-ui/svelte/password-input';
  import type { PasswordInputSize } from './PasswordInput.svelte';

  export interface PasswordInputRootProviderProps extends ArkPasswordInputRootProviderProps {
    size?: PasswordInputSize;
  }
</script>

<script lang="ts">
  import { PasswordInputRootProvider } from '@ark-ui/svelte/password-input';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: PasswordInputRootProviderProps = $props();
</script>

<PasswordInputRootProvider
  {...props}
  bind:ref
  class={cn(
    'group/password-input flex w-full flex-col gap-1 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
    className,
  )}
  data-size={size}
  data-slot="password-input-root-provider"
/>