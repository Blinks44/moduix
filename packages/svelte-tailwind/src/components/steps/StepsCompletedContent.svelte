<script lang="ts">
  import { StepsCompletedContent, type StepsCompletedContentProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: StepsCompletedContentProps = $props();

  const completedContentClass =
    'grid min-h-40 min-w-0 place-items-center rounded-md bg-muted p-4 text-center text-sm leading-5 font-medium text-foreground outline-none focus-visible:outline-focus-inset focus-visible:-outline-offset-focus focus-visible:outline-ring data-[orientation=vertical]:flex-auto [&[hidden]]:hidden';
</script>

<StepsCompletedContent
  {...props}
  bind:ref
  class={cn(completedContentClass, className)}
  data-slot="steps-completed-content"
/>