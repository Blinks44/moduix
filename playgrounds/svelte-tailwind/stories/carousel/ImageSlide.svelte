<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import { cn } from '@/lib/moduix/cn';

  const imageClass =
    'block h-84 w-full overflow-hidden rounded-xl border border-[color-mix(in_oklab,var(--color-border)_88%,black_12%)] bg-card shadow-sm';

  let {
    alt,
    class: className,
    src,
    style,
  }: { alt: string; class?: ClassValue; src: string; style?: string } = $props();
</script>

<figure class={cn(imageClass, className)} {style}>
  <img {src} {alt} class="block size-full object-cover" />
</figure>