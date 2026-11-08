<script module lang="ts">
  import type { InputRootProps } from '../input/Input.svelte';

  export interface SidebarInputProps extends InputRootProps {}
</script>

<script lang="ts">
  import { cn } from '@/lib/moduix/cn';
  import Input from '../input/Input.svelte';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: SidebarInputProps = $props();
</script>

<Input
  {...props}
  bind:ref
  bind:value
  class={cn('w-full group-data-[state=collapsed]/sidebar-panel:hidden', className)}
/>