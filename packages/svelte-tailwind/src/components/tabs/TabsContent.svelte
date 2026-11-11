<script lang="ts">
  import { TabContent, type TabContentProps } from '@ark-ui/svelte/tabs';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TabContentProps = $props();

  const contentClass =
    'min-w-0 flex-1 rounded-lg border border-border bg-background p-4 text-sm leading-5 outline-0 focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring';
</script>

<TabContent {...props} bind:ref class={cn(contentClass, className)} data-slot="tabs-content" />