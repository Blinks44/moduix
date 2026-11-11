<script lang="ts">
  import { PasswordInputLabel, type PasswordInputLabelProps } from '@ark-ui/svelte/password-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PasswordInputLabelProps = $props();
</script>

<PasswordInputLabel
  {...props}
  bind:ref
  class={cn('inline-flex items-center gap-1 text-sm font-medium', className)}
  data-slot="password-input-label"
/>