<script lang="ts">
  import { TocRootProvider, type TocRootProviderProps } from '@ark-ui/svelte/toc';
  import { cn } from '@/lib/moduix/cn';
  import { tocRootVariants } from './Toc.variants';

  let { class: className, ref = $bindable(null), ...props }: TocRootProviderProps = $props();
</script>

<TocRootProvider
  {...props}
  bind:ref
  class={cn(tocRootVariants(), className)}
  data-slot="toc-root-provider"
/>