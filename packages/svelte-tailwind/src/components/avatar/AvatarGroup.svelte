<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface AvatarGroupProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: AvatarGroupProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(
    'flex items-center *:not-first:-ms-2 *:data-[scope=avatar]:ring-2 *:data-[scope=avatar]:ring-background',
    className,
  )}
  data-slot="avatar-group"
/>