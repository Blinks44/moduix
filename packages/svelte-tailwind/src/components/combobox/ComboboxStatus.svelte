<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface ComboboxStatusProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ComboboxStatusProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn('px-4 py-1 text-sm text-muted-foreground', className)}
  data-slot="combobox-status"
/>