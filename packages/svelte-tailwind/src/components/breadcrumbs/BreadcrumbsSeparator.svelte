<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

  type Props = HTMLProps<'li'> & PolymorphicProps<'li'> & RefAttribute;

  let { asChild, children, class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="li"
  {...props}
  bind:ref
  {asChild}
  class={cn('inline-flex items-center text-[length:0.875em] leading-none select-none', className)}
  aria-hidden="true"
  data-slot="breadcrumbs-separator"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronRightIcon class="size-[1em] flex-none [&:dir(rtl)]:rotate-180" />
  {/if}
</Ark>