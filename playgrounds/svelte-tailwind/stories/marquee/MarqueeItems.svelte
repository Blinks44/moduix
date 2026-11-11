<script lang="ts">
  import { MarqueeItem } from '@/components/marquee';
  import { cn } from '@/lib/moduix/cn';
  import { partners } from './partners';

  const itemClass =
    'inline-flex min-w-max items-center gap-2 rounded-md border border-border bg-muted px-3 py-2 text-sm leading-5 font-medium whitespace-nowrap text-foreground select-none';
  const markClass =
    'inline-grid size-7 place-items-center rounded-sm bg-primary text-xs leading-4 text-primary-foreground';

  let { custom = false }: { custom?: boolean } = $props();
</script>

{#each partners as item (item.name)}
  <MarqueeItem class={cn(itemClass, custom && 'border-primary/30 bg-primary/10')}>
    <span class={markClass}>{item.mark}</span>
    <span>{item.name}</span>
  </MarqueeItem>
{/each}