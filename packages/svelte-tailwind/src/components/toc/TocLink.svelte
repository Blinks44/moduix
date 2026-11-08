<script lang="ts">
  import { TocLink, type TocLinkProps } from '@ark-ui/svelte/toc';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TocLinkProps = $props();
</script>

<TocLink
  {...props}
  bind:ref
  class={cn(
    'group/toc-link relative block overflow-x-clip rounded-sm py-1 ps-[calc(var(--moduix-spacing-1)+var(--moduix-spacing-0-5)+var(--moduix-spacing-2)+max(0px,(var(--depth)-2)*var(--moduix-spacing-2)))] pe-1 text-sm leading-5 text-ellipsis whitespace-nowrap text-muted-foreground no-underline outline-0 transition-colors duration-normal focus-visible:ring-(length:--moduix-focus-ring-inset-width) focus-visible:ring-ring data-active:font-medium data-active:text-foreground [@media(hover:hover)]:hover:text-foreground',
    className,
  )}
  data-slot="toc-link"
/>