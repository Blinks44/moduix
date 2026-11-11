<script lang="ts">
  import { StepsContent, type StepsContentProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: StepsContentProps = $props();

  const contentClass =
    'grid min-h-40 min-w-0 place-items-center rounded-md bg-muted p-4 text-sm leading-5 text-foreground outline-none focus-visible:outline-focus-inset focus-visible:-outline-offset-focus focus-visible:outline-ring data-[orientation=vertical]:flex-auto [&[hidden]]:hidden';
</script>

<StepsContent {...props} bind:ref class={cn(contentClass, className)} data-slot="steps-content" />