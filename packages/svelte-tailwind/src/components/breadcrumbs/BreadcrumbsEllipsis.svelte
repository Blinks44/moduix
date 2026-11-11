<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  import { EllipsisIcon } from '@/lib/moduix/icons/ui';

  type Props = HTMLProps<'span'> & PolymorphicProps<'span'> & RefAttribute;

  let { asChild, children, class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  {asChild}
  class={cn(
    'inline-flex min-h-4 min-w-4 items-center justify-center rounded-sm px-1 transition-[color] duration-normal ease-in-out [:where(button:has(>&))]:inline-flex [:where(button:has(>&))]:cursor-pointer [:where(button:has(>&))]:items-center [:where(button:has(>&))]:outline-none [button:focus-visible>&]:ring-(length:--moduix-focus-ring-inset-width) [button:focus-visible>&]:ring-ring [@media(hover:hover)]:[button:hover>&]:text-foreground',
    className,
  )}
  aria-hidden="true"
  data-slot="breadcrumbs-ellipsis"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <EllipsisIcon class="size-[1em] flex-none" />
  {/if}
</Ark>