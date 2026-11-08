<script lang="ts">
  import { TabList, type TabListProps } from '@ark-ui/svelte/tabs';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TabListProps = $props();
</script>

<TabList
  {...props}
  bind:ref
  class={cn(
    'relative isolate inline-flex w-fit max-w-full gap-1 rounded-lg border border-border bg-muted p-1 group-data-[variant=line]/tabs:rounded-none group-data-[variant=line]/tabs:border-0 group-data-[variant=line]/tabs:bg-transparent data-[orientation=horizontal]:overflow-x-auto group-data-fitted/tabs:data-[orientation=horizontal]:w-full group-data-[variant=line]/tabs:data-[orientation=horizontal]:w-full group-data-[variant=line]/tabs:data-[orientation=horizontal]:border-b group-data-[variant=line]/tabs:data-[orientation=horizontal]:px-0 data-[orientation=vertical]:w-[min(12rem,40%)] data-[orientation=vertical]:flex-col group-data-[variant=line]/tabs:data-[orientation=vertical]:border-e group-data-[variant=line]/tabs:data-[orientation=vertical]:py-0',
    className,
  )}
  data-slot="tabs-list"
/>